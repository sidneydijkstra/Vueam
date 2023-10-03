// validateConfigs.test.js
import {  expect, it } from 'vitest'
import { validateHttpClientConfig, validateAxiosConfig } from '../src/validateConfigs.js'

const httpClientConfig = {
    axiosConfig: {
        baseUrl: '',
        headers: {},
        timeout: 10000,
        validateStatus: (status) => true,
        afterInvalidRequestStatus: []
    },
    getAuthenticationHeader: (useAuth) => {},
    beforeRequest: [],
    afterRequest: []
}

const invalidVariablesHttpClientConfig = {
    axiosConfig: {
        baseUrl: '',
        timeout: 10000,
        validateStatus: (status) => true,
        afterInvalidRequestStatus: []
    },
    getAuthenticationHeader: (useAuth) => {},
    beforeRequest: []
}

const invalidTypesHttpClientConfig = {
    axiosConfig: {
        baseUrl: 123,
        headers: {},
        timeout: '',
        validateStatus: (status) => true,
        afterInvalidRequestStatus: []
    },
    getAuthenticationHeader: 123,
    beforeRequest: [],
    afterRequest: { a: 12 }
}

it('Should succeed validating HttpClient config', async () => {
    expect(validateHttpClientConfig(httpClientConfig)).toBeTruthy()
})

it('Should succeed validating Axios config', async () => {
    expect(validateAxiosConfig(httpClientConfig.axiosConfig)).toBeTruthy()
})

it('Should fail validating HttpClient config with missing variable', async () => {
    expect(validateHttpClientConfig(invalidVariablesHttpClientConfig)).toBeFalsy()
})

it('Should fail validating HttpClient config with missing variable', async () => {
    expect(validateAxiosConfig(invalidVariablesHttpClientConfig.axiosConfig)).toBeFalsy()
})

it('Should fail validating HttpClient config with invalid typing', async () => {
    expect(validateHttpClientConfig(invalidTypesHttpClientConfig)).toBeFalsy()
})

it('Should fail validating HttpClient config with invalid typing', async () => {
    expect(validateAxiosConfig(invalidTypesHttpClientConfig.axiosConfig)).toBeFalsy()
})