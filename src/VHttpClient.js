import { Buffer } from 'buffer'
import createAxiosInstance from "./createAxiosInstance.js"
import isDebugging from "./isDebugging.js"
import randomString from "./randomString.js"

export default class VHttpClient {
    /**
     *  Constructor for the VHttpClient class.
     *  @param {Object} axiosConfig Object containing configuration values for axios.
     *  @param {Function} getAuthenticationHeader Function for getting authentication header
     *  @param {Function|Array} beforeRequest Function or array of functions containing before request callbacks.
     *  @param {Function|Array} afterRequest Function or array of functions containing after request callbacks.
     *  @returns {Object} Object containing composable variables and functions.
     */
    constructor(axiosConfig, getAuthenticationHeader = null, beforeRequest = null, afterRequest = null){
        // Create Axios instance
        this.axiosInstance = createAxiosInstance(
            axiosConfig.baseUrl, 
            axiosConfig.headers, 
            axiosConfig.timeout, 
            axiosConfig.validateStatus, 
            axiosConfig.afterInvalidRequestStatus
        )
        
        // Set parameters received from constructor
        this.getAuthenticationHeader = getAuthenticationHeader
        this.beforeRequest = beforeRequest
        this.afterRequest = afterRequest

        // Attach random string to VHttpClient instance used for debugging
        this.axiosInstance._vueam_created_uniqid = randomString(12)
    }

    /**
     *  Send a request using http get.
     *  @param {String} url Url used for request.
     *  @param {Object} headers Headers used for request.
     *  @param {Boolean} useAuth Value indicating if authentication should be used.
     *  @returns {Promise} Promise that ether resolves or rejects based on request result.
     */
    async getAsync(url, headers = {}, useAuth = false) {
        // Get request headers
        headers = this._getHeader(headers, useAuth)
        
        return new Promise((resolve, reject) => {
            // Run before request function
            this._beforeRequest("GET", url, {}, headers)
    
            // Run api request
            this.axiosInstance
                .get(url, { headers: headers })
                .then((response) => {
                    // Run after request function
                    this._afterRequest("GET", url, headers, {}, response)
    
                    // Check if response exists and status is 200
                    if (response && response.status == 200) return resolve(response.data)
    
                    return reject(response.data)
                })
                .catch((error) => {
                    // Run after request function
                    this._afterRequest("GET", url, headers, {}, error)
    
                    return reject(error.data)
                })
        })
    }

    /**
     *  Send a request using http put.
     *  @param {String} url Url used for request.
     *  @param {Object} body Body used for request.
     *  @param {Object} headers Headers used for request.
     *  @param {Boolean} useAuth Value indicating if authentication should be used.
     *  @returns {Promise} Promise that ether resolves or rejects based on request result.
     */
    async putAsync(url, body = {}, headers = {}, useAuth = false) {
        // Get request headers
        headers = this._getHeader(headers, useAuth)
    
        return new Promise((resolve, reject) => {
            // Run before request function
            this._beforeRequest("PUT", url, body, headers)
    
            // Run api request
            this.axiosInstance
                .put(url, body, { headers: headers })
                .then((response) => {
                    // Run after request function
                    this._afterRequest("PUT", url, headers, body, response)
    
                    // Check if response exists and status is 200
                    if (response && response.status == 200) return resolve(response.data)
    
                    return reject(response.data)
                })
                .catch((error) => {
                    // Run after request function
                    this._afterRequest("PUT", url, headers, {}, error)
    
                    return reject(error.data)
                })
        })
    }

    
    /**
     *  Send a request using http post with body.
     *  @param {String} url Url used for request.
     *  @param {Object} body Body used for request.
     *  @param {Object} headers Headers used for request.
     *  @param {Boolean} useAuth Value indicating if authentication should be used.
     *  @returns {Promise} Promise that ether resolves or rejects based on request result.
     */
    async postBodyDataAsync(url, body = {}, headers = {}, useAuth = false) {
        // Get request headers
        headers = this._getHeader(headers, useAuth)

        return new Promise((resolve, reject) => {
            // Run before request function
            this._beforeRequest("POST", url, body, headers)

            // Run api request
            this.axiosInstance
                .post(url, body, { headers: headers }, (useAuth = false))
                .then((response) => {
                    // Run after request function
                    this._afterRequest("POST", url, headers, body, response)

                    // Check if response exists and status is 200
                    if (response && response.status == 200) return resolve(response.data)

                    return reject(response.data)
                })
                .catch((error) => {
                    // Run after request function
                    this._afterRequest("POST", url, headers, body, error)

                    return reject(error.data)
                })
        })
    }

    /**
     *  Send a request using http post with form.
     *  @param {String} url Url used for request.
     *  @param {FormData} form Form used for request.
     *  @param {Object} headers Headers used for request.
     *  @param {Boolean} useAuth Value indicating if authentication should be used.
     *  @returns {Promise} Promise that ether resolves or rejects based on request result.
     */
    async postFormDataAsync(url, form = {}, headers = {}, useAuth = false) {
        // Get request headers
        headers = this._getHeader(headers, useAuth)

        return new Promise((resolve, reject) => {
            // Run before request function
            this._beforeRequest("POST", url, form, headers)

            // Run api request
            this.axiosInstance
                .post(url, form, { headers: headers }, (useAuth = false))
                .then((response) => {
                    // Run after request function
                    this._afterRequest("POST", url, headers, form, response)

                    // Check if response exists and status is 200
                    if (response && response.status == 200) return resolve(response.data)

                    return reject(response.data)
                })
                .catch((error) => {
                    // Run after request function
                    this._afterRequest("POST", url, headers, form, error)

                    return reject(error.data)
                })
        })
    }

    /**
     *  Send a request using http delete.
     *  @param {String} url Url used for request.
     *  @param {Object} headers Headers used for request.
     *  @param {Boolean} useAuth Value indicating if authentication should be used.
     *  @returns {Promise} Promise that ether resolves or rejects based on request result.
     */
    async deleteAsync(url, headers = {}, useAuth = false) {
        // Get request headers
        headers = this._getHeader(headers, useAuth)

        return new Promise((resolve, reject) => {
            // Run before request function
            this._beforeRequest("DELETE", url, {}, headers)

            // Run api request
            this.axiosInstance
                .delete(url, { headers: headers })
                .then((response) => {
                    // Run after request function
                    this._afterRequest("DELETE", url, headers, {}, response)

                    // Check if response exists and status is 200
                    if (response && response.status == 200) return resolve(response.data)

                    return reject(response.data)
                })
                .catch((error) => {
                    // Run after request function
                    this._afterRequest("DELETE", url, headers, {}, error)

                    return reject(error.data)
                })
        })
    }

    /**
     *  Send a request using http. This is a specialized function for receiving images.
     *  @param {String} url Url used for request.
     *  @param {Object} headers Headers used for request.
     *  @param {Boolean} useAuth Value indicating if authentication should be used
     *  @returns {Promise} Promise that ether resolves or rejects based on request result.
     */
    async imageAsync(url, headers = {}, useAuth = false){
        // Get request headers
        headers = this._getHeader(headers, useAuth)

        return new Promise((resolve, reject) => {
            // Run before request function
            this._beforeRequest("IMAGE", url, {}, headers)

            // Run api request with responseType set to arraybuffer
            // this is done because we want to load the image as a 
            // byte array. We can also use responseType 'blob' if we
            // want to create a temporary ObjectUrl.
            this.axiosInstance
                .get(url, { responseType: "arraybuffer", headers: headers })
                .then(response => {
                    // Run after request function
                    this._afterRequest("IMAGE", url, headers, {}, response)

                    // Check if response exists and status is 200
                    if (response && response.status == 200){
                        // Create object url (needs responseType to be 'blob')
                        //return resolve(URL.createObjectURL(response.data))

                        // Create base64 string from Buffer
                        let base64Image = Buffer.from(response.data, 'binary').toString("base64")
                        // Return as base64 image for html src tag
                        return resolve(`data:${response.headers['content-type'].toLowerCase()};base64,${base64Image}`)
                    }
                        
                    return reject(response.data)
                })
                .catch((error) => {
                    // Run after request function
                    this._afterRequest("IMAGE", url, headers, {}, error)

                    return reject(error)
                })
        })
    }

    /**
     *  Get the header used for all http calls. This function checks if a valid 
     *  getAuthenticationHeader function is available and usage it accordingly. 
     *  @param {Object} header Header to use.
     *  @param {Object} useAuth Value indicating if authentication should be used.
     *  @returns {Object} First and second headers combined.
     */
    _getHeader(header, useAuth){
        if(this.getAuthenticationHeader instanceof Function)
            return this._combineHeaders(header, this.getAuthenticationHeader(useAuth))

        return header
    }
    
    /**
     *  Combine two headers into one.
     *  @param {Object} headerA First header.
     *  @param {Object} headerB Second header.
     *  @returns {Object} First and second headers combined.
     */
    _combineHeaders(headerA, headerB){
        return {...headerA, ...headerB}
    }

    /**
     *  Call all beforeRequest callbacks.
     *  @param {String} type Type of http request.
     *  @param {String} url Url used for request.
     *  @param {Object} headers Headers used for request.
     *  @param {Object} data Data used for request.
     */
    _beforeRequest(type, url, headers, data){
        // Call beforeRequest callbacks
        if(Array.isArray(this.beforeRequest)){
            for (let i = 0; i < this.beforeRequest.length; i++) {
                if(!(this.beforeRequest[i] instanceof Function))
                    continue

                this.beforeRequest[i](type, url, headers, data)
            }
        }else if(this.beforeRequest instanceof Function){
            this.beforeRequest(type, url, headers, data)
        }
    }

    /**
     *  Call all afterRequest callbacks.
     *  @param {String} type Type of http request.
     *  @param {String} url Url used for request.
     *  @param {Object} headers Headers used for request.
     *  @param {Object} data Data used for request.
     *  @param {Object} response Response of request.
     */
    _afterRequest(type, url, headers, data, response){
        // Call afterRequest callbacks
        if(Array.isArray(this.afterRequest)){
            for (let i = 0; i < this.afterRequest.length; i++) {
                if(!(this.afterRequest[i] instanceof Function))
                    continue

                    this.afterRequest[i](type, url, headers, data, response)
            }
        }else if(this.afterRequest instanceof Function){
            this.afterRequest(type, url, headers, data, response)
        }
    }

}