import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

const ImageSlider = ({ images }) => {
  return (
    <View style={styles.sliderContainer}>
      <Carousel
        width={screenWidth}
        height={250}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth,
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ImageSlider;
