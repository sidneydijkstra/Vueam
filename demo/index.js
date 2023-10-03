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