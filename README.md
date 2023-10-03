*Please be aware that this package is currently under active development, and it may still contain errors or issues. To ensure smooth and trouble-free usage, we strongly recommend that you always utilize the latest version available. If you encounter any problems, have questions, or wish to contribute improvement ideas, please feel free to reach out to us at sidneydijkstra@hotmail.com. Your feedback and input are greatly appreciated and will help us enhance the package's quality and functionality.*

# Vueam

Vueam is a powerful plugin designed to streamline API management within the Vue framework. It simplifies the process of creating API functions, allowing you to configure your HttpClient effortlessly.

# Installation
You can easily install the Vueam package using npm or yarn. Open your terminal and run the following command:

Using npm:
```bash
npm i vueam
```

Using yarn:
```bash
yarn add vueam
```

# Usage
Vueam is tailored for Vue.js but can also be used as a standalone package.

### HttpClient Config
Regardless of whether you're using Vue.js or the standalone version, you'll need a valid HttpClient configuration. Here's an example configuration:

```js
const httpClientConfig = {
    axiosConfig: {
        baseUrl: '',                            // Base URL for the client
        headers: {},                            // Standard headers for the client
        timeout: null,                          // Timeout in milliseconds
        validateStatus: (status) => {           // Function used to validate the status of a call
            return status === 200            
        },
        afterInvalidRequestStatus: []           // Callback for when validateStatus returns false
    },
    getAuthenticationHeader: (useAuth) => {},   // Function used to obtain authentication headers
    beforeRequest: [],                          // Function run before the request
    afterRequest: []                            // Functions run after the request
}
```

### Standalone
Begin by importing the necessary components from Vueam into your application:
```js
import useApiManager from "vueam"
```

Next, initialize the ApiManager by calling the ``useApiManager`` function and passing your httpClientConfig:
```js
const {
    createFunction, 
    createFunctions
} = useApiManager(httpClientConfig)
```

With ApiManager initialized, you can now create API functions using the createFunction and createFunctions methods. 

#### Using ``createFunction``

For creating individual API functions, employ the createFunction method. Here's an example:
```js
const getUser = createFunction('getUser', {
    url: "/users",
    requestType: "get",
    headers: {},
    urlParameters: [],
    bodyParameters: [],
    useAuth: false,
});
```

In this example, ``getUser`` is a function tailored for making a ``GET`` request to the ``/users`` endpoint. You can customize the URL, request type, headers, and other parameters as needed.

#### Using ``createFunctions``

For creating multiple API functions at once, utilize the ``createFunctions`` method. Define your API functions in an object and pass it as an argument:
```js
const functions = {
    getUser: {
        url: "/users",
        requestType: "get",
        headers: {},
        urlParameters: [],
        bodyParameters: [],
        useAuth: false,
    },
}

const {
    getUser
} = createFunctions(users)
```

With this approach, you can manage multiple API functions effortlessly. The ``getUser`` function, in this case, corresponds to the configuration specified in the ``functions`` object.


### Authentication
The ``HttpConfig`` includes a ``getAuthenticationHeader`` function that can be customized by the user. This function serves the purpose of providing a valid authentication header, allowing users to implement their own custom authentication method for the HttpClient. The following example shows how to create and utilize such a custom authentication method:

```js
// Create HttpClient config with getAuthenticationHeader function
const httpClientConfig = {
    axiosConfig: {
        baseUrl: '',
        headers: {},
        timeout: 10000,
        validateStatus: (status) => {
            return status == 200
        },
        afterInvalidRequestStatus: []
    },
    getAuthenticationHeader: (useAuth) => {
        // You can implement authentication logic here if needed
        // For example, you can add an authentication token to headers
        if (useAuth) {
            return {
                Authorization: 'Bearer YourAccessTokenHere'
            };
        }
        return {}; // No authentication needed
    },
    beforeRequest: [],
    afterRequest: []
}
```

### Callbacks
With the ``HttpConfig``, you have the flexibility to register various callbacks, which can be applied to the ``beforeRequest`` and ``afterRequest`` variables. These variables can either hold a single function or an array of functions. The forthcoming example will demonstrate how to incorporate these callbacks:

```js
// Before function
let beforeRequestCallback = (type, url, headers, data) => {}
// After functions
let afterRequestCallbackA = (type, url, headers, data, response) => {}
let afterRequestCallbackB = (type, url, headers, data, response) => {}

// Create HttpClient config with before and after request functions
const httpClientConfig = {
    axiosConfig: {
        baseUrl: '',
        headers: {},
        timeout: 10000,
        validateStatus: (status) => {
            return status == 200
        },
        afterInvalidRequestStatus: []
    },
    getAuthenticationHeader: (useAuth) => {},
    beforeRequest: beforeRequestCallback,
    afterRequest: [afterRequestCallbackA, afterRequestCallbackB]
}
```

### Request Validation
The ``HttpConfig`` includes an Axios section, which is responsible for handling HTTP requests via the Axios library. This section of the configuration includes two key elements: the ``validateStatus`` function and the ``afterInvalidRequestStatus`` callback. These elements can be effectively combined to define and handle invalid requests.

The ``validateStatus`` function receives an HTTP status code and is expected to return a boolean value. This boolean value determines the course of action for the subsequent ``afterInvalidRequestStatus`` callback(s). Utilize the ``afterInvalidRequestStatus`` callback to effectively manage invalid requests.

In the following example, we will show how to reauthenticate a user using this system:

```js
// Import axios used to retry request
import axios from "axios"

// After invalid request status callback
let afterInvalidRequestStatusCallback = (error) => {
    // Check if error exists
    if(!error)
        return

    // Get original request
    const originalRequest = error.config

    // Check if response is null, status is 401
    // and if request is already retried. This
    // is done because we only want to handle the
    // invalid authentication errors here.
    if(!error.response || error.response.status !== 401 || originalRequest._retry)
        return
    
    // Set _retry to true
    originalRequest._retry = true

    // Revalidate authentication header and retry request
    originalRequest.headers["Authorization"] = revalidateAuthentication()
    let result = await axios(originalRequest)
    return Promise.resolve(result)
}

// Create HttpClient config with before and after request functions
const httpClientConfig = {
    axiosConfig: {
        baseUrl: '',
        headers: {},
        timeout: 10000,
        validateStatus: (status) => {
            // Here we specific the status codes that should be passed 
            // through to the user. Here we leave out 401 to receive the 
            // invalid authentication errors inside the callback.
            return status == 200 || status == 404 || status == 400 || status == 403 || status == 500
        },
        afterInvalidRequestStatus: afterInvalidRequestStatusCallback
    },
    getAuthenticationHeader: (useAuth) => {},
    beforeRequest: beforeRequestCallback,
    afterRequest: [afterRequestCallbackA, afterRequestCallbackB]
}
```

# Examples
In this example, we've constructed a functional API endpoint using the Vueam plugin. To begin, we've initialized an ``HttpConfig`` object, leaving the callback functions and ``getAuthenticationHeaders`` function unimplemented for now. This showcases how to set up, configure, and use Vueam to streamline API management. You can adapt this pattern to create more API functions and integrate them seamlessly into your project.

```js
import useApiManager from "vueam"

// Create HttpClient config
const httpClientConfig = {
    axiosConfig: {
        baseUrl: 'https://api.publicapis.org',
        headers: {},
        timeout: 10000,
        validateStatus: (status) => {
            return status == 200
        },
        afterInvalidRequestStatus: []
    },
    getAuthenticationHeader: (useAuth) => {},
    beforeRequest: [],
    afterRequest: []
}

// Get ApiManager functions
const {
    createFunction, 
    createFunctions, 
    getVHttpClient, 
    getAxiosInstance
} = useApiManager(httpClientConfig)

// Define api function
const functions = {
    getCategories: {
        url: "/categories",
        requestType: "get",
        headers: {},
        urlParameters: [],
        bodyParameters: [],
        useAuth: false,
    },
}

// Create api function
const {
    getCategories
} = createFunctions(functions)

// Call created api function
await getCategories()
    .then(response => {
        // Handle the API response
        console.log("Categories:", response);
    })
    .catch(error => {
        // Handle API error
        console.error("Error:", error);
    });
```

This example showcases how to set up, configure, and use Vueam to streamline API management. You can adapt this pattern to create more API functions and integrate them seamlessly into your project.

## License

This project is licensed under the MIT License. For more details, please refer to the ``LICENSE.txt`` file.

## Contact

Sidney Dijkstra - sidneydijkstra@hotmail.com

Project Link: [https://github.com/sidneydijkstra/vueam](https://github.com/sidneydijkstra/vueam)