import React, { useEffect, useState } from 'react';

import {
    ActivityIndicator,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { router } from 'expo-router';

import { useDispatch, useSelector } from 'react-redux';

import api from '../services/api';

import ProductCard from '../components/ProductCard';

import { logout } from '../store/authSlice';

import {
    AppDispatch,
    RootState,
} from '../store/store';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
}

/*
 * CATEGORIAS MASCULINAS
 */
const masculineCategories = [
  {
    key: 'mens-shirts',
    name: 'Camisas',
  },
  {
    key: 'mens-shoes',
    name: 'Sapatos',
  },
  {
    key: 'mens-watches',
    name: 'Relógios',
  },
];

/*
 * CATEGORIAS FEMININAS
 */
const feminineCategories = [
  {
    key: 'womens-bags',
    name: 'Bolsas',
  },
  {
    key: 'womens-dresses',
    name: 'Vestidos',
  },
  {
    key: 'womens-jewellery',
    name: 'Joias',
  },
  {
    key: 'womens-shoes',
    name: 'Sapatos',
  },
  {
    key: 'womens-watches',
    name: 'Relógios',
  },
];

export default function Products() {

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(
    (state: RootState) =>
      state.auth.user
  );

  const isAuthenticated =
    useSelector(
      (state: RootState) =>
        state.auth.isAuthenticated
    );

  /*
   * ABA PRINCIPAL
   *
   * Masculino ou Feminino
   */
  const [activeGender, setActiveGender] =
    useState<
      'masculino' | 'feminino'
    >('masculino');

  /*
   * CATEGORIA SELECIONADA
   */
  const [activeCategory, setActiveCategory] =
    useState('mens-shirts');

  /*
   * PRODUTOS
   */
  const [products, setProducts] =
    useState<Product[]>([]);

  /*
   * CARREGAMENTO
   */
  const [loading, setLoading] =
    useState(false);

  /*
   * ERRO
   */
  const [error, setError] =
    useState('');

  /*
   * PROTEÇÃO DA ROTA
   */
  useEffect(() => {

    if (!isAuthenticated) {

      router.replace('/login');

    }

  }, [isAuthenticated]);

  /*
   * BUSCAR PRODUTOS
   */
  async function loadProducts(
    category: string
  ) {

    try {

      setLoading(true);

      setError('');

      const response =
        await api.get(
          `/products/category/${category}`
        );

      setProducts(
        response.data.products
      );

    } catch (error) {

      console.error(error);

      setProducts([]);

      setError(
        'Não foi possível carregar os produtos.'
      );

    } finally {

      setLoading(false);

    }

  }

  /*
   * QUANDO A CATEGORIA MUDA,
   * BUSCA NOVAMENTE NA API
   */
  useEffect(() => {

    if (!isAuthenticated) {
      return;
    }

    loadProducts(
      activeCategory
    );

  }, [
    activeCategory,
    isAuthenticated,
  ]);

  /*
   * TROCAR ENTRE MASCULINO E FEMININO
   */
  function handleGenderChange(
    gender:
      | 'masculino'
      | 'feminino'
  ) {

    setActiveGender(gender);

    if (gender === 'masculino') {

      setActiveCategory(
        masculineCategories[0].key
      );

    } else {

      setActiveCategory(
        feminineCategories[0].key
      );

    }

  }

  /*
   * LOGOUT
   */
  function handleLogout() {

    dispatch(logout());

    router.replace('/login');

  }

  /*
   * ABRIR DETALHES
   */
  function handleProductPress(
    id: number
  ) {

    router.push(
      `/product/${id}`
    );

  }

  /*
   * TENTAR NOVAMENTE
   */
  function handleRetry() {

    loadProducts(
      activeCategory
    );

  }

  /*
   * CATEGORIAS DA ABA ATUAL
   */
  const currentCategories =
    activeGender === 'masculino'
      ? masculineCategories
      : feminineCategories;

  /*
   * NOME DA CATEGORIA ATUAL
   */
  const currentCategory =
    currentCategories.find(
      (category) =>
        category.key ===
        activeCategory
    );

  /*
   * ENQUANTO NÃO ESTIVER AUTENTICADO
   */
  if (!isAuthenticated) {

    return (

      <View style={styles.center}>

        <ActivityIndicator
          size="large"
        />

      </View>

    );

  }

  return (

    <View style={styles.container}>

      {/* ========================= */}
      {/* CABEÇALHO */}
      {/* ========================= */}

      <View style={styles.header}>

        <View>

          <Text style={styles.title}>
            Loja Mobile
          </Text>

          <Text style={styles.welcome}>
            Olá, {user?.email}
          </Text>

        </View>

        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logoutButton}
        >

          <Text style={styles.logout}>
            Sair
          </Text>

        </TouchableOpacity>

      </View>


      {/* ========================= */}
      {/* ABAS MASCULINO / FEMININO */}
      {/* ========================= */}

      <View style={styles.genderTabs}>

        <TouchableOpacity
          style={[
            styles.genderTab,

            activeGender ===
              'masculino' &&
              styles.activeGenderTab,
          ]}

          onPress={() =>
            handleGenderChange(
              'masculino'
            )
          }
        >

          <Text
            style={[
              styles.genderText,

              activeGender ===
                'masculino' &&
                styles.activeGenderText,
            ]}
          >
            Masculino
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={[
            styles.genderTab,

            activeGender ===
              'feminino' &&
              styles.activeGenderTab,
          ]}

          onPress={() =>
            handleGenderChange(
              'feminino'
            )
          }
        >

          <Text
            style={[
              styles.genderText,

              activeGender ===
                'feminino' &&
                styles.activeGenderText,
            ]}
          >
            Feminino
          </Text>

        </TouchableOpacity>

      </View>


      {/* ========================= */}
      {/* CATEGORIAS */}
      {/* ========================= */}

      <View style={styles.categoryContainer}>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.categoryScroll
          }
        >

          {currentCategories.map(
            (category) => (

              <TouchableOpacity
                key={category.key}

                style={[
                  styles.categoryButton,

                  activeCategory ===
                    category.key &&
                    styles.activeCategoryButton,
                ]}

                onPress={() =>
                  setActiveCategory(
                    category.key
                  )
                }
              >

                <Text
                  style={[
                    styles.categoryText,

                    activeCategory ===
                      category.key &&
                      styles.activeCategoryText,
                  ]}
                >
                  {category.name}
                </Text>

              </TouchableOpacity>

            )
          )}

        </ScrollView>

      </View>


      {/* ========================= */}
      {/* TÍTULO DA CATEGORIA */}
      {/* ========================= */}

      <View style={styles.categoryTitleContainer}>

        <Text style={styles.categoryTitle}>

          {currentCategory?.name}

        </Text>

        <Text style={styles.categorySubtitle}>

          Produtos disponíveis

        </Text>

      </View>


      {/* ========================= */}
      {/* CARREGANDO */}
      {/* ========================= */}

      {loading && (

        <View style={styles.center}>

          <ActivityIndicator
            size="large"
          />

          <Text style={styles.loadingText}>

            Carregando produtos...

          </Text>

        </View>

      )}


      {/* ========================= */}
      {/* ERRO */}
      {/* ========================= */}

      {!loading &&
        error !== '' && (

          <View style={styles.center}>

            <Text style={styles.error}>

              {error}

            </Text>

            <TouchableOpacity
              style={
                styles.retryButton
              }
              onPress={
                handleRetry
              }
            >

              <Text
                style={
                  styles.retryText
                }
              >

                Tentar novamente

              </Text>

            </TouchableOpacity>

          </View>

        )}


      {/* ========================= */}
      {/* LISTA DE PRODUTOS */}
      {/* ========================= */}

      {!loading &&
        error === '' && (

          <FlatList

            data={products}

            keyExtractor={(item) =>
              item.id.toString()
            }

            contentContainerStyle={
              styles.list
            }

            showsVerticalScrollIndicator={
              false
            }

            renderItem={({
              item,
            }) => (

              <ProductCard
                product={item}
                onPress={
                  handleProductPress
                }
              />

            )}

          />

        )}

    </View>

  );

}

const styles =
  StyleSheet.create({

    container: {
      flex: 1,

      backgroundColor:
        '#F5F5F5',
    },

    header: {
      paddingTop: 55,

      paddingHorizontal: 20,

      paddingBottom: 15,

      backgroundColor:
        '#FFFFFF',

      flexDirection: 'row',

      justifyContent:
        'space-between',

      alignItems:
        'center',
    },

    title: {
      fontSize: 25,

      fontWeight: 'bold',
    },

    welcome: {
      marginTop: 4,

      color: '#666',
    },

    logoutButton: {
      padding: 8,
    },

    logout: {
      fontSize: 16,

      fontWeight: 'bold',
    },

    /*
     * ABAS MASCULINO/FEMININO
     */

    genderTabs: {
      flexDirection: 'row',

      backgroundColor:
        '#FFFFFF',

      borderBottomWidth: 1,

      borderBottomColor:
        '#DDD',
    },

    genderTab: {
      flex: 1,

      paddingVertical: 15,

      alignItems:
        'center',
    },

    activeGenderTab: {
      borderBottomWidth: 3,

      borderBottomColor:
        '#222',
    },

    genderText: {
      fontSize: 16,

      color: '#777',
    },

    activeGenderText: {
      color: '#222',

      fontWeight: 'bold',
    },

    /*
     * CATEGORIAS
     */

    categoryContainer: {
      backgroundColor:
        '#FFFFFF',

      borderBottomWidth: 1,

      borderBottomColor:
        '#EEEEEE',
    },

    categoryScroll: {
      paddingHorizontal: 12,

      paddingVertical: 10,
    },

    categoryButton: {
      paddingHorizontal: 16,

      paddingVertical: 9,

      marginRight: 8,

      borderRadius: 20,

      backgroundColor:
        '#F1F1F1',
    },

    activeCategoryButton: {
      backgroundColor:
        '#222222',
    },

    categoryText: {
      fontSize: 14,

      color: '#555',

      fontWeight: '500',
    },

    activeCategoryText: {
      color: '#FFFFFF',

      fontWeight: 'bold',
    },

    /*
     * TÍTULO DA CATEGORIA
     */

    categoryTitleContainer: {
      paddingHorizontal: 15,

      paddingTop: 15,

      paddingBottom: 5,
    },

    categoryTitle: {
      fontSize: 21,

      fontWeight: 'bold',
    },

    categorySubtitle: {
      color: '#777',

      marginTop: 3,
    },

    /*
     * LISTA
     */

    list: {
      padding: 15,

      paddingTop: 10,
    },

    /*
     * LOADING
     */

    center: {
      flex: 1,

      justifyContent:
        'center',

      alignItems:
        'center',

      padding: 20,
    },

    loadingText: {
      marginTop: 10,
    },

    /*
     * ERRO
     */

    error: {
      textAlign: 'center',

      fontSize: 16,

      marginBottom: 15,
    },

    retryButton: {
      paddingHorizontal: 20,

      paddingVertical: 12,

      backgroundColor:
        '#222',

      borderRadius: 8,
    },

    retryText: {
      color: '#FFFFFF',

      fontWeight: 'bold',
    },

  });