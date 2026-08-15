import React from 'react';

import { Provider } from 'react-redux';

import { Stack } from 'expo-router';

import { store } from '../store/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="products"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="product/[id]"
          options={{
            title: 'Detalhes do Produto',
          }}
        />
      </Stack>
    </Provider>
  );
}