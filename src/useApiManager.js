import VHttpClient from "./VHttpClient.js"
import randomString from "./randomString.js"

export default function useApiManager(httpClientConfig){
	// Attach random string to axios instance used for debugging
	var _vueam_created_uniqid = randomString(12)

	// Create an instance of the VHttpClient
	const httpClient = new VHttpClient(
        httpClientConfig.axiosConfig, 
        httpClientConfig.getAuthenticationHeader, 
        httpClientConfig.beforeRequest, 
        httpClientConfig.afterRequest
    )

	/**
     *  Function that is used to extract the result from the response. This
     *  is created because there is a change a system returns a custom result
     *  object. With this function we want to give the possibility to extract
     *  the real result value from the response before we send it to the user.
     *  @param {Object} response The received response
     *  @returns {Object} The extracted result
     */
    function _extractResult(response) {
        return response
    }

    /**
     *  Function that is used to extract the error from the response.
     *  @param {Object} response The received response
     *  @returns {Object} The extracted error
     */
    function _extractError(response){
        return response
    }

    /**
     *  Formats and returns an asynchronous function that makes HTTP requests based on the provided parameters.
     *  @param {String} name Name of the function.
     *  @param {Object} functionObject An asynchronous function that performs the formatted HTTP request.
     *  @returns {Function} The formatted function.
	 *  @throws {Error} If the function configuration options are invalid or incomplete.
     */
    function _formatFunction(name, { url, requestType, urlParameters, bodyParameters, formParameters, useAuth, headers }) {
		return async function (...inputs) {
			return new Promise((resolve, reject) => {
				// Initialize body and form parameters of they where not given
				bodyParameters = bodyParameters ?? []
				formParameters = formParameters ?? []

				// Check if body parameters contains valid value(s)
				if(!Array.isArray(bodyParameters) && !(typeof bodyParameters === "string")){
					throw new Error(
						`Invalid body parameter ${name}. Expect string or array of string`
					)
				}

				// Check if form parameters contains valid value(s)
				if(!Array.isArray(formParameters)){
					throw new Error(
						`Invalid form parameter ${name}. Expect array of string`
					)
				}

				// Get body length, this can be .length or 1
				var bodyLength = Array.isArray(bodyParameters) ? bodyParameters.length : 1
				// check if inputs contains all required parameters
				if (inputs.length !== urlParameters.length + bodyLength + formParameters.length) {
					throw new Error(
						`Invalid number of parameters in function ${name}. Expected ${
							urlParameters.length + bodyParameters.length + formParameters.length
						}, but got ${inputs.length}`
					)
				}

				// Assign inputs to url parameters
				var requestUrl = url
				for (let i = 0; i < urlParameters.length; i++) {
					requestUrl = requestUrl.replace(`{${urlParameters[i]}}`, inputs[i])
				}

				var body = {}
				if (Array.isArray(bodyParameters)) {
					// Assign inputs to body parameters as object
					for (var i = 0; i < bodyParameters.length; i++) {
						var key = bodyParameters[i]
						body[key] = inputs[i + urlParameters.length]
					}
				} else {
					// Assign input to body parameters as string
					body = inputs[0 + urlParameters.length]
				}

				var form = new FormData()
				// Assign inputs to form parameters as object
				for (var i = 0; i < formParameters.length; i++) {
					var key = formParameters[i]
					form.append(key, inputs[i + urlParameters.length + bodyParameters.length])
				}

				if (requestType === "post" && form.entries().next().value) {
					httpClient.postFormDataAsync(requestUrl, form, headers, useAuth)
						.then((response) => {
							// Do we really need this null check? What if we 
							// have status code 200 with a response of undefined?
							// if (!response) reject()

							resolve(_extractResult(response))
						})
						.catch((error) => {
							reject(_extractError(error))
						})
				} else if (requestType === "post" && !form.entries().next().value) {
					httpClient.postBodyDataAsync(requestUrl, body, headers, useAuth)
						.then((response) => {
							resolve(_extractResult(response))
						})
						.catch((error) => {
							reject(_extractError(error))
						})
				} else if (requestType === "get") {
					httpClient.getAsync(requestUrl, headers, useAuth)
						.then((response) => {
							resolve(_extractResult(response))
						})
						.catch((error) => {
							reject(_extractError(error))
						})
				} else if (requestType === "put") {
					httpClient.putAsync(requestUrl, body, headers, useAuth)
						.then((response) => {
							resolve(_extractResult(response))
						})
						.catch((error) => {
							reject(_extractError(error))
						})
				} else if (requestType === "delete") {
					httpClient.deleteAsync(requestUrl, headers, useAuth)
						.then((response) => {
							resolve(_extractResult(response))
						})
						.catch((error) => {
							reject(_extractError(error))
						})
				} else if (requestType === "image"){
					httpClient.imageAsync(requestUrl)
						.then((response) => {
							resolve(response)
						})
						.catch((error) => {
							reject(_extractError(error))
						})
				}else {
					throw new Error(
						`Invalid request type in function ${name}. Must be 'get', 'put', 'post', 'delete' or 'image'.`
					)
				}
			})
		}
	}

	/**
	 * Creates and returns a formatted function based on the provided function definition.
	 * @param {string} name The name of the function.
	 * @param {Object} func The function definition object.
	 * @returns {Function} A formatted function.
	 * @throws {Error} If the function definition is missing required properties.
	 */
	function createFunction(name, func){
		let { url, requestType, urlParameters, bodyParameters, formParameters, useAuth, headers } = func

		if (!url || !requestType || !urlParameters || useAuth === undefined || !headers) {
			throw new Error(
				`Invalid function object for ${name}. Missing one or more of the following properties: url, requestType, urlParameters, useAuth, headers`
			)
		}

		return _formatFunction(name, func)
	}

	/**
	 * Creates and returns a formatted object containing a set of functions.
	 * @param {Object} functions An object containing function definitions.
	 * @returns {Object} An object with formatted functions.
	 * @throws {Error} If any function definition is missing required properties.
	 */
	function createFunctions(functions){
		// Create object for storing created functions
		const formattedFunctions = {}

		// Loop all functions and create them using the function createFunction
		for (const name in functions) {
			formattedFunctions[name] = createFunction(name, functions[name])
		}

		// Return formatted functions
		return formattedFunctions
	}

	/**
	 * Get the shared instance of the VHttpClient.
	 * @returns {VHttpClient} The shared instance of the VHttpClient.
	 */
	function getVHttpClient(){
		return httpClient
	}

	/**
	 * Get the shared Axios HTTP client instance.
	 * @returns {AxiosInstance} The shared Axios HTTP client instance.
	 */
	function getAxiosInstance(){
		return httpClient.axiosInstance
	}

	return {
		createFunction, 
		createFunctions, 
		getVHttpClient, 
		getAxiosInstance, 
		_vueam_created_uniqid
	}
}
