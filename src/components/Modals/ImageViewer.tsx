import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ImageViewerProps {
  route: {
    params: {
      uri: string;
    };
  };
}

const ImageViewer: React.FC<ImageViewerProps> = ({ route }) => {
  const { uri } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: width,
    height: height,
    resizeMode: 'contain',
  },
});

export default ImageViewer;
