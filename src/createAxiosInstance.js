import axios from "axios"
import isDebugging from "./isDebugging.js"
import randomString from "./randomString.js"


export default function createAxiosInstance(baseUrl, headers = null, timeout = null, validateStatus = null, afterInvalidRequestStatus = null){
	// TODO: Find out why we have to create this agent to access an API
	let agent = null
	if(typeof process !== 'undefined' && process.versions && process.versions.node){
		const https =  require('https')
		agent = https && https.Agent ? new https.Agent({
			rejectUnauthorized: false
		}) : null
	}

	// Create axios client
    const axiosInstance = axios.create({
		httpsAgent: agent,
		withCredentials: false,
		baseURL: baseUrl,
		headers: headers ?? {},
		timeout: timeout,
		validateStatus: function (status) {
			if(validateStatus instanceof Function){
				return validateStatus(status)
			}

			return true
		},
	})

	// Setup afterInvalidRequestStatus callbacks
	if(Array.isArray(afterInvalidRequestStatus)){
		axiosInstance.interceptors.response.use(null, (error) => {
			for (let i = 0; i < afterInvalidRequestStatus.length; i++) {
				if(!(afterInvalidRequestStatus[i] instanceof Function))
					continue

				afterInvalidRequestStatus[i](error)
			}
		})
	}else if(validateStatus instanceof Function){
		axiosInstance.interceptors.response.use(null, (error) => afterInvalidRequestStatus(error))
	}

	// Attach random string to axios instance used for debugging
	axiosInstance._vueam_created_uniqid = randomString(12)

	// Return the axios instance
	return axiosInstance
}
