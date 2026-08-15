import React from 'react';

import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
}

interface ProductCardProps {
  product: Product;
  onPress: (id: number) => void;
}

export default function ProductCard({
  product,
  onPress,
}: ProductCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(product.id)}
      activeOpacity={0.8}
    >
      <Image
        source={{
          uri: product.thumbnail,
        }}
        style={styles.image}
      />

      <View style={styles.content}>

        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {product.title}
        </Text>

        <Text
          style={styles.description}
          numberOfLines={2}
        >
          {product.description}
        </Text>

        <View style={styles.priceRow}>

          <Text style={styles.price}>
            R$ {product.price.toFixed(2)}
          </Text>

          <Text style={styles.discount}>
            -{product.discountPercentage.toFixed(0)}%
          </Text>

        </View>

        <Text style={styles.details}>
          Ver detalhes →
        </Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',

    elevation: 3,

    shadowOpacity: 0.1,
    shadowRadius: 5,

    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    backgroundColor: '#F2F2F2',
  },

  content: {
    padding: 15,
  },

  title: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  description: {
    color: '#666',
    lineHeight: 19,
    marginBottom: 12,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  discount: {
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
  },

  details: {
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 15,
  },

});