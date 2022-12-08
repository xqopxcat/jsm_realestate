import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { bayutCoreApi } from './services/bayutCore';

export const makeStore = () => configureStore({
    reducer: {
        [bayutCoreApi.reducerPath]: bayutCoreApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([bayutCoreApi.middleware]),
});

export const wrapper = createWrapper(makeStore);