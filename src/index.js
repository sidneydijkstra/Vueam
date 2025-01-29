import useApiManager from "./useApiManager.js";
import { validateHttpClientConfig, validateAxiosConfig } from '../src/validateConfigs.js'

// Export useApiManager as default.
export default useApiManager

// Export useApiManager and config validation functions
export { 
    useApiManager, 
    validateHttpClientConfig, 
    validateAxiosConfig
}