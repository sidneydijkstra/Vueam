// createAxiosInstance.test.js
import {  expect, it, jest } from 'vitest'

import useMockServer from './helpers/useMockServer.js';
import createAxiosInstance from '../src/createAxiosInstance.js';

it('Should create axios client where only the needed variables are set', async () => {
    const axiosConfig = {
        baseUrl: ''
    }

    const axiosInstance = createAxiosInstance(
        axiosConfig.baseUrl,
        axiosConfig.headers,
        axiosConfig.timeout,
    )

    useMockServer(axiosInstance)

    await expect(axiosInstance.get('/users')).resolves.toBeTruthy()
})

it('Should create axios client with after invalid request status callback', async () => {
    const afterInvalidRequestStatus = vi.fn()

    const axiosConfig = {
        baseUrl: '',
        headers: {},
        timeout: 10000,
        validateStatus: (status) => false,
        afterInvalidRequestStatus: afterInvalidRequestStatus
    }

    const axiosInstance = createAxiosInstance(
        axiosConfig.baseUrl,
        axiosConfig.headers,
        axiosConfig.timeout,
        axiosConfig.validateStatus,
        axiosConfig.afterInvalidRequestStatus
    )

    useMockServer(axiosInstance)

    await expect(axiosInstance.get('/users')).resolves.toBeUndefined()
    expect(afterInvalidRequestStatus).toHaveBeenCalledOnce()
})

it('Should create axios client with after invalid request status callbacks', async () => {
    const afterInvalidRequestStatusA = vi.fn()
    const afterInvalidRequestStatusB = vi.fn()

    const axiosConfig = {
        baseUrl: '',
        headers: {},
        timeout: 10000,
        validateStatus: (status) => false,
        afterInvalidRequestStatus: [afterInvalidRequestStatusA, afterInvalidRequestStatusB]
    }

    const axiosInstance = createAxiosInstance(
        axiosConfig.baseUrl,
        axiosConfig.headers,
        axiosConfig.timeout,
        axiosConfig.validateStatus,
        axiosConfig.afterInvalidRequestStatus
    )

    useMockServer(axiosInstance)

    await expect(axiosInstance.get('/users')).resolves.toBeUndefined()
    expect(afterInvalidRequestStatusA).toHaveBeenCalledOnce()
    expect(afterInvalidRequestStatusB).toHaveBeenCalledOnce()
})

it('Should create axios client with after invalid request status callback  and invalid values', async () => {
    const afterInvalidRequestStatus = vi.fn()

    const axiosConfig = {
        baseUrl: '',
        headers: {},
        timeout: 10000,
        validateStatus: (status) => false,
        afterInvalidRequestStatus: [afterInvalidRequestStatus, 'string', true, 123, null]
    }

    const axiosInstance = createAxiosInstance(
        axiosConfig.baseUrl,
        axiosConfig.headers,
        axiosConfig.timeout,
        axiosConfig.validateStatus,
        axiosConfig.afterInvalidRequestStatus
    )

    useMockServer(axiosInstance)

    await expect(axiosInstance.get('/users')).resolves.toBeUndefined()
    expect(afterInvalidRequestStatus).toHaveBeenCalledOnce()
})