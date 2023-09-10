import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryButton = ({ item,selectedCategory, setSelectedCategory, filterGarments}) => {
  return (
    <TouchableOpacity onPress={()=>filterGarments(item?.title)}  style={[styles.button, {backgroundColor: selectedCategory === item?.title ? '#002B6B' : null}]}>
      <Text style={[styles.buttonText, {color:selectedCategory === item?.title ? 'white' : '#002B6B'}]}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10 ,
    margin: 5,
    borderRadius: 5,
    borderWidth:0.5, 
  },
  buttonText: {
    color: '#002B6B',
    fontWeight: 'bold',
  },
});

export default CategoryButton;
