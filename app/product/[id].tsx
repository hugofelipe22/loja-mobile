import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';

import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    router,
    useLocalSearchParams,
} from 'expo-router';

import api from '../../services/api';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
}

export default function ProductDetails() {

  const { id } =
    useLocalSearchParams();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  /*
   * BUSCAR PRODUTO
   *
   * useCallback mantém a mesma referência
   * da função enquanto o ID não mudar.
   */
  const loadProduct = useCallback(
    async () => {

      if (!id) {
        return;
      }

      try {

        setLoading(true);

        setError('');

        const response =
          await api.get(
            `/products/${id}`
          );

        setProduct(
          response.data
        );

      } catch (error) {

        console.error(error);

        setProduct(null);

        setError(
          'Não foi possível carregar o produto.'
        );

      } finally {

        setLoading(false);

      }

    },
    [id]
  );

  /*
   * CARREGAR PRODUTO
   */
  useEffect(() => {

    loadProduct();

  }, [loadProduct]);

  /*
   * CARREGANDO
   */
  if (loading) {

    return (

      <View style={styles.center}>

        <ActivityIndicator
          size="large"
        />

        <Text style={styles.loadingText}>
          Carregando produto...
        </Text>

      </View>

    );

  }

  /*
   * ERRO
   */
  if (error !== '') {

    return (

      <View style={styles.center}>

        <Text style={styles.error}>
          {error}
        </Text>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={loadProduct}
        >

          <Text style={styles.retryText}>
            Tentar novamente
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            router.back()
          }
        >

          <Text style={styles.backText}>
            Voltar
          </Text>

        </TouchableOpacity>

      </View>

    );

  }

  /*
   * PRODUTO NÃO ENCONTRADO
   */
  if (!product) {

    return (

      <View style={styles.center}>

        <Text style={styles.error}>
          Produto não encontrado.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            router.back()
          }
        >

          <Text style={styles.backText}>
            Voltar
          </Text>

        </TouchableOpacity>

      </View>

    );

  }

  /*
   * TELA DE DETALHES
   */
  return (

    <View style={styles.container}>

      {/* CABEÇALHO */}

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() =>
            router.back()
          }
          style={
            styles.backHeaderButton
          }
        >

          <Text
            style={
              styles.backHeaderText
            }
          >
            ← Voltar
          </Text>

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Detalhes
        </Text>

        <View
          style={styles.headerSpace}
        />

      </View>

      {/* CONTEÚDO */}

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >

        {/* IMAGEM */}

        <Image
          source={{
            uri: product.thumbnail,
          }}
          style={styles.image}
        />

        {/* INFORMAÇÕES */}

        <View style={styles.info}>

          <Text style={styles.title}>
            {product.title}
          </Text>

          <Text
            style={styles.description}
          >
            {product.description}
          </Text>

          {/* PREÇO */}

          <View
            style={
              styles.priceContainer
            }
          >

            <Text
              style={
                styles.priceLabel
              }
            >
              Preço
            </Text>

            <Text style={styles.price}>
              R$ {product.price.toFixed(2)}
            </Text>

          </View>

          {/* DESCONTO */}

          <View
            style={
              styles.discountContainer
            }
          >

            <Text
              style={
                styles.discountLabel
              }
            >
              Desconto
            </Text>

            <Text
              style={styles.discount}
            >
              {product.discountPercentage.toFixed(
                0
              )}%
            </Text>

          </View>

          {/* ID */}

          <View
            style={styles.idContainer}
          >

            <Text
              style={styles.idLabel}
            >
              Código do produto
            </Text>

            <Text style={styles.id}>
              #{product.id}
            </Text>

          </View>

        </View>

      </ScrollView>

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
      paddingTop: 50,

      paddingHorizontal: 15,

      paddingBottom: 15,

      backgroundColor:
        '#FFFFFF',

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'space-between',

      borderBottomWidth: 1,

      borderBottomColor:
        '#EEEEEE',
    },

    backHeaderButton: {
      width: 80,
    },

    backHeaderText: {
      fontSize: 16,

      fontWeight: 'bold',
    },

    headerTitle: {
      fontSize: 20,

      fontWeight: 'bold',
    },

    headerSpace: {
      width: 80,
    },

    content: {
      paddingBottom: 30,
    },

    image: {
      width: '100%',

      height: 330,

      resizeMode: 'cover',

      backgroundColor:
        '#EEEEEE',
    },

    info: {
      backgroundColor:
        '#FFFFFF',

      margin: 15,

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

    title: {
      fontSize: 25,

      fontWeight: 'bold',

      marginBottom: 15,
    },

    description: {
      fontSize: 16,

      color: '#666',

      lineHeight: 24,

      marginBottom: 25,
    },

    priceContainer: {
      paddingVertical: 15,

      borderTopWidth: 1,

      borderTopColor:
        '#EEEEEE',
    },

    priceLabel: {
      color: '#777',

      fontSize: 14,

      marginBottom: 5,
    },

    price: {
      fontSize: 28,

      fontWeight: 'bold',
    },

    discountContainer: {
      flexDirection: 'row',

      justifyContent:
        'space-between',

      alignItems: 'center',

      paddingVertical: 15,

      borderTopWidth: 1,

      borderTopColor:
        '#EEEEEE',
    },

    discountLabel: {
      fontSize: 16,

      color: '#555',
    },

    discount: {
      fontSize: 18,

      fontWeight: 'bold',

      backgroundColor:
        '#EEEEEE',

      paddingHorizontal: 10,

      paddingVertical: 6,

      borderRadius: 8,
    },

    idContainer: {
      flexDirection: 'row',

      justifyContent:
        'space-between',

      paddingTop: 15,

      borderTopWidth: 1,

      borderTopColor:
        '#EEEEEE',
    },

    idLabel: {
      color: '#777',
    },

    id: {
      fontWeight: 'bold',
    },

    center: {
      flex: 1,

      justifyContent:
        'center',

      alignItems: 'center',

      padding: 20,
    },

    loadingText: {
      marginTop: 10,

      color: '#666',
    },

    error: {
      fontSize: 16,

      textAlign: 'center',

      marginBottom: 15,
    },

    retryButton: {
      backgroundColor:
        '#222',

      paddingHorizontal: 20,

      paddingVertical: 12,

      borderRadius: 8,

      marginBottom: 10,
    },

    retryText: {
      color: '#FFFFFF',

      fontWeight: 'bold',
    },

    backButton: {
      paddingHorizontal: 20,

      paddingVertical: 12,
    },

    backText: {
      fontWeight: 'bold',
    },

  });