// Expected structure for HttpClient config
/* istanbul ignore next */
const expectedHttpClientStructure = {
    axiosConfig: {},
    getAuthenticationHeader: (useAuth) => {},
    beforeRequest: [],
    afterRequest: []
}

// Expected structure for Axios config
/* istanbul ignore next */
const expectedAxiosStructure = {
    baseUrl: '',
    headers: {},
    timeout: 10000,
    validateStatus: (status) => true,
    afterInvalidRequestStatus: []
}

/**
 *  Function used to validate a HttpClient config.
 *  @param {Object} config The config to validate.
 *  @returns {boolean} State of validation
 */
function validateHttpClientConfig(config){
    if(!validateConfig(config, expectedHttpClientStructure))
        return false

    return validateAxiosConfig(config.axiosConfig)
}

/**
 *  Function used to validate a Axios config.
 *  @param {Object} config The config to validate.
 *  @returns {boolean} State of validation
 */
function validateAxiosConfig(config){
    return validateConfig(config, expectedAxiosStructure)
}

/**
 *  Function used to validate a dynamic config
 *  @param {Object} config The config to validate.
 *  @param {Object} validConfig The config to compare to.
 *  @returns {boolean} State of validation
 */
function validateConfig(config, validConfig){
    // Extract object keys for both configs
    const configKeys = Object.keys(config)
    const expectedKeys = Object.keys(validConfig)

    // Check if length of object keys is the same
    if (configKeys.length !== expectedKeys.length)
        return false
    
    // Check if each property in obj matches the expected structure
    for (const key of expectedKeys) {
        const objValue = config[key]
        const expectedValue = validConfig[key]
        
        if (typeof objValue !== typeof expectedValue) {
            return false
        }
    }

    return true
}

export {
    validateHttpClientConfig,
    validateAxiosConfig
}