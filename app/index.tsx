import React from 'react';

import { Redirect } from 'expo-router';

import { useSelector } from 'react-redux';

import { RootState } from '../store/store';

export default function Index() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (isAuthenticated) {
    return <Redirect href="/products" />;
  }

  return <Redirect href="/login" />;
}