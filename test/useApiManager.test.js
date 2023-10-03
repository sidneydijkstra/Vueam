// useApiManager.test.js
import {  expect, it } from 'vitest'

import useMockServer from './helpers/useMockServer.js';
import { users } from './helpers/api_functions.json'

import useApiManager from "../src/useApiManager.js"


const httpClientConfig = {
    axiosConfig: {
        baseUrl: '',
        headers: {},
        timeout: 10000,
        validateStatus: (status) => {
            return status == 200 || status == 400
        },
        afterInvalidRequestStatus: []
    },
    getAuthenticationHeader: (useAuth) => {},
    beforeRequest: [],
    afterRequest: []
}

const {
    createFunction, 
    createFunctions, 
    getVHttpClient, 
    getAxiosInstance
} = useApiManager(httpClientConfig)

useMockServer(getAxiosInstance())

it('Should get defined axiosInstance', async () => {
    expect(getAxiosInstance()).toBeTruthy()
})

it('Should get defined VHttpClient instance', async () => {
    expect(getVHttpClient()).toBeTruthy()
})

it('Should create GET api function and run it with valid result', async () => {
    const functions = {
        getUser: {
            url: "/users",
            requestType: "get",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            bodyParameters: [],
            useAuth: false,
        },
    }
    
    const {
        getUser
    } = createFunctions(functions)
    await expect(getUser()).resolves.toBeDefined()
})

it('Should create PUT api function and run it with valid result', async () => {
    const functions = {
        putUser: {
            url: "/users",
            requestType: "put",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            bodyParameters: ['name'],
            useAuth: false,
        },
    }
    
    const {
        putUser
    } = createFunctions(functions)

    await expect(putUser('username')).resolves.toBeDefined()
})

it('Should create POST api function and run it with valid result', async () => {
    const functions = {
        postUser: {
            url: "/users",
            requestType: "post",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            bodyParameters: ['name'],
            useAuth: false,
        },
    }
    
    const {
        postUser
    } = createFunctions(functions)

    await expect(postUser('username')).resolves.toBeDefined()
})

it('Should create DELETE api function and run it with valid result', async () => {
    const functions = {
        deleteUser: {
            url: "/users",
            requestType: "delete",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            bodyParameters: [],
            useAuth: false,
        },
    }
    
    const {
        deleteUser
    } = createFunctions(functions)

    await expect(deleteUser()).resolves.toBeDefined()
})

it('Should create IMAGE api function and run it with valid result', async () => {
    const functions = {
        getImage: {
            url: "/images/valid",
            requestType: "image",
            headers: {},
            urlParameters: [],
            bodyParameters: [],
            useAuth: false,
        },
    }
    
    const {
        getImage
    } = createFunctions(functions)

    await expect(getImage()).resolves.toBeDefined()
})

it('Should create IMAGE api function and run it with invalid result', async () => {
    const functions = {
        getImage: {
            url: "/images/invalid",
            requestType: "image",
            headers: {},
            urlParameters: [],
            bodyParameters: [],
            useAuth: false,
        },
    }
    
    const {
        getImage
    } = createFunctions(functions)

    await expect(getImage()).rejects.toBeFalsy()
})

it('Should create GET api function with url parameter and run it with valid result', async () => {
    const functions = {
        getUser: {
            url: "/{parameter}",
            requestType: "get",
            headers: { "Content-Type": "application/json" },
            urlParameters: ['parameter'],
            bodyParameters: [],
            useAuth: false,
        },
    }
    
    const {
        getUser
    } = createFunctions(functions)

    await expect(getUser('users')).resolves.toBeDefined()
})

it('Should create GET api function with string as body and run it with valid result', async () => {
    const functions = {
        getUser: {
            url: "/users",
            requestType: "get",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            bodyParameters: "content",
            useAuth: false,
        },
    }
    
    const {
        getUser
    } = createFunctions(functions)

    await expect(getUser('string as body')).resolves.toBeDefined()
})

it('Should create POST api function with form as body and run it with valid result', async () => {
    const functions = {
        postUser: {
            url: "/users",
            requestType: "post",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            formParameters: ['name'],
            useAuth: false,
        },
    }
    
    const {
        postUser
    } = createFunctions(functions)

    await expect(postUser('username')).resolves.toBeDefined()
})

it('Should create api function from json file', async () => {
    expect(() => useApiFunctions(httpClientConfig, users)).toBeDefined()
})

it('Should create GET api function and run it with invalid result', async () => {
    const functions = {
        getError400: {
            url: "/error_400",
            requestType: "get",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            bodyParameters: [],
            useAuth: false,
        },
    }
    
    const {
        getError400
    } = createFunctions(functions)

    await expect(getError400()).rejects.toBeFalsy()
})

it('Should create PUT api function and run it with invalid result', async () => {
    const functions = {
        putError400: {
            url: "/error_400",
            requestType: "put",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            bodyParameters: ['name'],
            useAuth: false,
        },
    }
    
    const {
        putError400
    } = createFunctions(functions)

    await expect(putError400('username')).rejects.toBeFalsy()
})

it('Should create POST api function and run it with invalid result', async () => {
    const functions = {
        postError400: {
            url: "/error_400",
            requestType: "post",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            bodyParameters: ['name'],
            useAuth: false,
        },
    }
    
    const {
        postError400
    } = createFunctions(functions)

    await expect(postError400('username')).rejects.toBeFalsy()
})

it('Should create DELETE api function and run it with invalid result', async () => {
    const functions = {
        deleteError400: {
            url: "/error_400",
            requestType: "delete",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            bodyParameters: [],
            useAuth: false,
        },
    }
    
    const {
        deleteError400
    } = createFunctions(functions)

    await expect(deleteError400()).rejects.toBeFalsy()
})

it('Should create POST api function with form as body and run it with invalid result', async () => {
    const functions = {
        postError400: {
            url: "/error_400",
            requestType: "post",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            formParameters: ['name'],
            useAuth: false,
        },
    }
    
    const {
        postError400
    } = createFunctions(functions)

    await expect(postError400('username')).rejects.toBeFalsy()
})

it('Should create GET api function and run it with invalid result network error', async () => {
    const functions = {
        getNetworkError: {
            url: "/error_network",
            requestType: "get",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            bodyParameters: [],
            useAuth: false,
        },
    }
    
    const {
        getNetworkError
    } = createFunctions(functions)

    await expect(getNetworkError()).rejects.toBeFalsy()
})

it('Should create PUT api function and run it with invalid result network error', async () => {
    const functions = {
        putNetworkError: {
            url: "/error_network",
            requestType: "put",
            headers: { "Content-Type": "application/json" },
            urlParameters: ['name'],
            bodyParameters: [],
            useAuth: false,
        },
    }
    
    const {
        putNetworkError
    } = createFunctions(functions)

    await expect(putNetworkError('username')).rejects.toBeFalsy()
})

it('Should create POST api function and run it with invalid result network error', async () => {
    const functions = {
        postNetworkError: {
            url: "/error_network",
            requestType: "post",
            headers: { "Content-Type": "application/json" },
            urlParameters: ['name'],
            bodyParameters: [],
            useAuth: false,
        },
    }
    
    const {
        postNetworkError
    } = createFunctions(functions)

    await expect(postNetworkError('username')).rejects.toBeFalsy()
})

it('Should create DELETE api function and run it with invalid result network error', async () => {
    const functions = {
        deleteNetworkError: {
            url: "/error_network",
            requestType: "delete",
            headers: { "Content-Type": "application/json" },
            urlParameters: ['name'],
            bodyParameters: [],
            useAuth: false,
        },
    }
    
    const {
        deleteNetworkError
    } = createFunctions(functions)

    await expect(deleteNetworkError('username')).rejects.toBeFalsy()
})


it('Should create POST api function with form as body and run it with invalid result network error', async () => {
    const functions = {
        postNetworkError: {
            url: "/error_network",
            requestType: "post",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            formParameters: ['name'],
            useAuth: false,
        },
    }
    
    const {
        postNetworkError
    } = createFunctions(functions)

    await expect(postNetworkError('username')).rejects.toBeFalsy()
})

it('Should create IMAGE api function and run it with invalid result network error', async () => {
    const functions = {
        getImageNetworkError: {
            url: "/error_network",
            requestType: "image",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            bodyParameters: [],
            useAuth: false,
        },
    }
    
    const {
        getImageNetworkError
    } = createFunctions(functions)

    await expect(getImageNetworkError()).rejects.toThrowError()
})

it('Should create GET api function and run it with invalid result timeout error', async () => {
    const functions = {
        getTimeoutError: {
            url: "/error_timeout",
            requestType: "get",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            bodyParameters: [],
            useAuth: false,
        },
    }
    
    const {
        getTimeoutError
    } = createFunctions(functions)

    await expect(getTimeoutError()).rejects.toBeFalsy()
})

it('Should create GET api function and run it with invalid parameters', async () => {
    const functions = {
        getUser: {
            url: "/users",
            requestType: "get",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            bodyParameters: ['name'],
            useAuth: false,
        },
    }
    
    const {
        getUser
    } = createFunctions(functions)

    await expect(() => getUser()).rejects.toThrowError()
})

it('Should create api with invalid request type', async () => {
    const functions = {
        getUser: {
            url: "/users",
            requestType: "invalid",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            bodyParameters: [],
            useAuth: false,
        },
    }
    
    const {
        getUser
    } = createFunctions(functions)

    await expect(getUser()).rejects.toThrowError()
})

it('Should create invalid api function and throw error (1/5)', async () => {
    const functions = {
        getUser: {
        },
    }
    
    expect(() => createFunctions(functions)).toThrowError()
})

it('Should create invalid api function and throw error (2/5)', async () => {
    const functions = {
        getUser: {
            url: "/users",
            requestType: "get",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            bodyParameters: []
        },
    }
    
    expect(() => createFunctions(functions)).toThrowError()
})

it('Should create invalid api function and throw error (3/5)', async () => {
    const functions = {
        getUser: {
            url: "/users",
            requestType: "get",
            headers: { "Content-Type": "application/json" },
            bodyParameters: [],
            useAuth: false
        },
    }
    
    expect(() => createFunctions(functions)).toThrowError()
})

it('Should create invalid api function and throw error (4/5)', async () => {
    const functions = {
        getUser: {
            requestType: "get",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            bodyParameters: [],
            useAuth: false
        },
    }
    
    expect(() => createFunctions(functions)).toThrowError()
})

it('Should create invalid api function and throw error (5/5)', async () => {
    const functions = {
        getUser: {
            url: '/users',
            requestType: "get",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            bodyParameters: 123,
            useAuth: false
        },
    }

    const {
        getUser
    } = createFunctions(functions)

    await expect(getUser('username')).rejects.toThrowError()
})

it('Should create invalid api function and throw error (5/5)', async () => {
    const functions = {
        getUser: {
            url: '/users',
            requestType: "get",
            headers: { "Content-Type": "application/json" },
            urlParameters: [],
            formParameters: 123,
            useAuth: false
        },
    }

    const {
        getUser
    } = createFunctions(functions)

    await expect(getUser('username')).rejects.toThrowError()
})
