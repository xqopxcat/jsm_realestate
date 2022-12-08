import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bayutCoreApi = createApi({
    reducerPath: 'bayutCoreApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://bayut.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', 'b5d80e39b6msh3641ea751d75c84p1d3ad0jsn6efd83513465');
            headers.set('X-RapidAPI-Host', 'bayut.p.rapidapi.com');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getProperties: builder.query({ query: ({ queryPayload }) => {
            return ({
                url: '/properties/list',
                params: queryPayload
            })}
        }),
        getPropertyDetails: builder.query({ query: (id) => `properties/detail?externalID=${id}`})
    })
});

export const { 
    useGetPropertiesQuery,
    useGetPropertyDetailsQuery,
    util: { getRunningQueriesThunk }
} = bayutCoreApi;

export const {
    getProperties,
    getPropertyDetails
} = bayutCoreApi.endpoints;