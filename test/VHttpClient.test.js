// VHttpClient.test.js
import {  expect, it, jest } from 'vitest'

import useMockServer from './helpers/useMockServer.js';
import VHttpClient from '../src/VHttpClient.js';

it('Should create http client where only the needed variables are set', async () => {
    const httpClientConfig = {
        axiosConfig: {
            baseUrl: '',
            headers: {},
            timeout: 10000,
            validateStatus: (status) => true,
            afterInvalidRequestStatus: []
        }
    }

    const httpClient = new VHttpClient(
        httpClientConfig.axiosConfig
    )

    useMockServer(httpClient.axiosInstance)

    await expect(httpClient.getAsync('/users')).resolves.toBeTruthy()
})

it('Should create http client with before and after request callback', async () => {
    const beforeRequest = vi.fn()
    const afterRequest = vi.fn()

    const httpClientConfig = {
        axiosConfig: {
            baseUrl: '',
            headers: {},
            timeout: 10000,
            validateStatus: (status) => true,
            afterInvalidRequestStatus: []
        },
        getAuthenticationHeader: (useAuth) => {},
        beforeRequest: beforeRequest,
        afterRequest: afterRequest
    }

    const httpClient = new VHttpClient(
        httpClientConfig.axiosConfig, 
        httpClientConfig.getAuthenticationHeader, 
        httpClientConfig.beforeRequest, 
        httpClientConfig.afterRequest
    )

    useMockServer(httpClient.axiosInstance)

    await expect(httpClient.getAsync('/users')).resolves.toBeTruthy()
    expect(beforeRequest).toHaveBeenCalledOnce()
    expect(afterRequest).toHaveBeenCalledOnce()
})

it('Should create http client with before and after request callbacks', async () => {
    const beforeRequestA = vi.fn()
    const beforeRequestB = vi.fn()
    const afterRequestA = vi.fn()
    const afterRequestB = vi.fn()

    const httpClientConfig = {
        axiosConfig: {
            baseUrl: '',
            headers: {},
            timeout: 10000,
            validateStatus: (status) => true,
            afterInvalidRequestStatus: []
        },
        getAuthenticationHeader: (useAuth) => {},
        beforeRequest: [beforeRequestA, beforeRequestB],
        afterRequest: [afterRequestA, afterRequestB]
    }

    const httpClient = new VHttpClient(
        httpClientConfig.axiosConfig, 
        httpClientConfig.getAuthenticationHeader, 
        httpClientConfig.beforeRequest, 
        httpClientConfig.afterRequest
    )

    useMockServer(httpClient.axiosInstance)

    await expect(httpClient.getAsync('/users')).resolves.toBeTruthy()
    expect(beforeRequestA).toHaveBeenCalledOnce()
    expect(beforeRequestB).toHaveBeenCalledOnce()
    expect(afterRequestA).toHaveBeenCalledOnce()
    expect(afterRequestB).toHaveBeenCalledOnce()
})

it('Should create http client with before and after request callback and invalid values', async () => {
    const beforeRequest = vi.fn()
    const afterRequest = vi.fn()

    const httpClientConfig = {
        axiosConfig: {
            baseUrl: '',
            headers: {},
            timeout: 10000,
            validateStatus: (status) => true,
            afterInvalidRequestStatus: []
        },
        getAuthenticationHeader: (useAuth) => {},
        beforeRequest: [beforeRequest, "string", 123],
        afterRequest: [afterRequest, true, null]
    }

    const httpClient = new VHttpClient(
        httpClientConfig.axiosConfig, 
        httpClientConfig.getAuthenticationHeader, 
        httpClientConfig.beforeRequest, 
        httpClientConfig.afterRequest
    )

    useMockServer(httpClient.axiosInstance)

    await expect(httpClient.getAsync('/users')).resolves.toBeTruthy()
    expect(beforeRequest).toHaveBeenCalledOnce()
    expect(afterRequest).toHaveBeenCalledOnce()
})

it('Should create http client and run GET', async () => {
    const httpClientConfig = {
        axiosConfig: {
            baseUrl: '',
            headers: {},
            timeout: 10000,
            validateStatus: (status) => true,
            afterInvalidRequestStatus: []
        }
    }

    const httpClient = new VHttpClient(
        httpClientConfig.axiosConfig
    )

    useMockServer(httpClient.axiosInstance)

    await expect(httpClient.getAsync('/users')).resolves.toBeTruthy()
})

it('Should create http client and run PUT', async () => {
    const httpClientConfig = {
        axiosConfig: {
            baseUrl: '',
            headers: {},
            timeout: 10000,
            validateStatus: (status) => true,
            afterInvalidRequestStatus: []
        }
    }

    const httpClient = new VHttpClient(
        httpClientConfig.axiosConfig
    )

    useMockServer(httpClient.axiosInstance)

    await expect(httpClient.putAsync('/users')).resolves.toBeTruthy()
})

it('Should create http client and run POST with body data', async () => {
    const httpClientConfig = {
        axiosConfig: {
            baseUrl: '',
            headers: {},
            timeout: 10000,
            validateStatus: (status) => true,
            afterInvalidRequestStatus: []
        }
    }

    const httpClient = new VHttpClient(
        httpClientConfig.axiosConfig
    )

    useMockServer(httpClient.axiosInstance)

    await expect(httpClient.postBodyDataAsync('/users')).resolves.toBeTruthy()
})

it('Should create http client and run POST with form data', async () => {
    const httpClientConfig = {
        axiosConfig: {
            baseUrl: '',
            headers: {},
            timeout: 10000,
            validateStatus: (status) => true,
            afterInvalidRequestStatus: []
        }
    }

    const httpClient = new VHttpClient(
        httpClientConfig.axiosConfig
    )

    useMockServer(httpClient.axiosInstance)

    await expect(httpClient.postFormDataAsync('/users')).resolves.toBeTruthy()
})

it('Should create http client and run DELETE', async () => {
    const httpClientConfig = {
        axiosConfig: {
            baseUrl: '',
            headers: {},
            timeout: 10000,
            validateStatus: (status) => true,
            afterInvalidRequestStatus: []
        }
    }

    const httpClient = new VHttpClient(
        httpClientConfig.axiosConfig
    )

    useMockServer(httpClient.axiosInstance)

    await expect(httpClient.deleteAsync('/users')).resolves.toBeTruthy()
})