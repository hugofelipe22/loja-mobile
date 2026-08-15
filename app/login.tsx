import React, { useState } from 'react';

import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { router } from 'expo-router';

import { useDispatch } from 'react-redux';

import { login } from '../store/authSlice';

import { AppDispatch } from '../store/store';

export default function Login() {

  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  function isValidEmail(
    email: string
  ) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email);

  }

  function handleLogin() {

    const cleanEmail =
      email.trim();

    if (!cleanEmail || !password) {

      Alert.alert(
        'Atenção',
        'Preencha o e-mail e a senha.'
      );

      return;
    }

    if (!isValidEmail(cleanEmail)) {

      Alert.alert(
        'E-mail inválido',
        'Digite um endereço de e-mail válido.'
      );

      return;
    }

    if (
      cleanEmail !==
        'admin@email.com' ||
      password !== '123456'
    ) {

      Alert.alert(
        'Erro',
        'E-mail ou senha inválidos.'
      );

      return;
    }

    setLoading(true);

    dispatch(
      login({
        email: cleanEmail,
      })
    );

    setLoading(false);

    router.replace('/products');

  }

  return (

    <View style={styles.container}>

      <View style={styles.logoContainer}>

        <Text style={styles.logo}>
          🛍️
        </Text>

        <Text style={styles.title}>
          Loja Mobile
        </Text>

        <Text style={styles.subtitle}>
          Produtos para você
        </Text>

      </View>

      <View style={styles.form}>

        <Text style={styles.label}>
          E-mail
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>
          Senha
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >

          <Text style={styles.buttonText}>
            {loading
              ? 'Entrando...'
              : 'Entrar'}
          </Text>

        </TouchableOpacity>

      </View>

      <View style={styles.demo}>

        <Text style={styles.demoTitle}>
          Acesso para demonstração
        </Text>

        <Text style={styles.demoText}>
          E-mail: admin@email.com
        </Text>

        <Text style={styles.demoText}>
          Senha: 123456
        </Text>

      </View>

      {/* IDENTIFICAÇÃO DO AUTOR */}

      <View style={styles.author}>

        <Text style={styles.authorProject}>
          Projeto acadêmico
        </Text>

        <Text style={styles.authorName}>
          Desenvolvido por Hugo Vieira
        </Text>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,

    justifyContent: 'center',

    padding: 24,

    backgroundColor: '#F5F5F5',
  },

  logoContainer: {
    alignItems: 'center',

    marginBottom: 35,
  },

  logo: {
    fontSize: 55,

    marginBottom: 10,
  },

  title: {
    fontSize: 32,

    fontWeight: 'bold',

    color: '#222',
  },

  subtitle: {
    fontSize: 16,

    color: '#777',

    marginTop: 5,
  },

  form: {
    backgroundColor: '#FFFFFF',

    padding: 20,

    borderRadius: 15,

    elevation: 3,

    shadowOpacity: 0.08,

    shadowRadius: 5,

    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  label: {
    fontSize: 14,

    fontWeight: 'bold',

    marginBottom: 7,

    color: '#333',
  },

  input: {
    backgroundColor: '#F7F7F7',

    borderWidth: 1,

    borderColor: '#DDD',

    borderRadius: 10,

    padding: 15,

    marginBottom: 18,

    fontSize: 16,
  },

  button: {
    backgroundColor: '#222',

    padding: 16,

    borderRadius: 10,

    alignItems: 'center',

    marginTop: 5,
  },

  buttonText: {
    color: '#FFFFFF',

    fontSize: 16,

    fontWeight: 'bold',
  },

  demo: {
    marginTop: 25,

    alignItems: 'center',
  },

  demoTitle: {
    fontWeight: 'bold',

    marginBottom: 7,
  },

  demoText: {
    color: '#666',

    marginTop: 2,
  },

  /*
   * IDENTIFICAÇÃO DO AUTOR
   */

  author: {
    alignItems: 'center',

    marginTop: 30,
  },

  authorProject: {
    fontSize: 12,

    color: '#999',
  },

  authorName: {
    fontSize: 13,

    color: '#777',

    fontWeight: '500',

    marginTop: 3,
  },

});