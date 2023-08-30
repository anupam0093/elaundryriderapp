import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryButton = ({ item,_onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={_onPress} >
      <Text style={styles.buttonText}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'purple',
    padding: 10 ,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CategoryButton;
