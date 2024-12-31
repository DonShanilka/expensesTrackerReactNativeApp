import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Category {
  icon: string;
  category: string;
  amount: number;
  bgColor: string;
  image?: string; // Optional image URL for the category
}

const CategoryCard = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      icon: 'utensils',
      category: 'Foods',
      amount: 0,
      bgColor: '#0088FE',
      image: 'https://example.com/food.jpg',
    },
    {
      icon: 'graduation-cap',
      category: 'Education',
      amount: 0,
      bgColor: '#AF19FF',
      image: 'https://example.com/education.jpg',
    },
    {
      icon: 'bus',
      category: 'Transport',
      amount: 0,
      bgColor: '#FF8042',
      image: 'https://example.com/transport.jpg',
    },
    {
      icon: 'shopping-cart',
      category: 'Shopping',
      amount: 0,
      bgColor: '#FFBB28',
      image: 'https://example.com/shopping.jpg',
    },
    {
      icon: 'ellipsis-h',
      category: 'Other',
      amount: 0,
      bgColor: '#00C49F',
      image: 'https://example.com/other.jpg',
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = 'shanilka@gmail.com'; // Replace with actual user email logic
        const response = await axios.get(
          `http://192.168.249.98:3000/api/getCatogoryTotal/${userEmail}`,
        );
        const data: {category: string; total_price: number}[] = response.data;

        const updatedCategories = categories.map(category => {
          const match = data.find(
            item =>
              item.category.toLowerCase() === category.category.toLowerCase(),
          );
          return match ? {...category, amount: match.total_price} : category;
        });

        setCategories(updatedCategories);
      } catch (error) {
        console.error('Error fetching category totals:', error);
      }
    };

    fetchData();
  }, []);

  const renderCategoryCard = (cat: Category) => (
    <View
      key={cat.category}
      style={[styles.card, {backgroundColor: cat.bgColor}]}>
      <View style={styles.iconContainer}>
        {/* Show the image if provided, otherwise show the icon */}
        {cat.image ? (
          <Image source={{uri: cat.image}} style={styles.categoryImage} />
        ) : (
          <Icon name={cat.icon} size={24} color="#000" />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.categoryText}>{cat.category}</Text>
        <Text style={styles.amountText}>{cat.amount}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardContainer}>
        {categories.map(renderCategoryCard)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  card: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: 145,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 8,
  },
  iconContainer: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: 30,
    height: 30,
    borderRadius: 8,
  },
  textContainer: {
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500',
  },
  amountText: {
    fontSize: 18,
    color: '#111827',
    fontWeight: '700',
  },
});

export default CategoryCard;
