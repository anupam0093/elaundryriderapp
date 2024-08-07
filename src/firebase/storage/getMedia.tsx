// ImageGallery.tsx
import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { storage } from '../../../firebaseConfig'; // Adjust the import path if needed
import { ref, listAll, getDownloadURL, ListResult } from 'firebase/storage';

interface ImageItem {
  uri: string;
}

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const listRef = ref(storage, 'your-folder-path/'); // Specify your folder path here
        const res: ListResult = await listAll(listRef);
        const urls: string[] = await Promise.all(res.items.map((itemRef) => getDownloadURL(itemRef)));
        setImages(urls.map((url: string) => ({ uri: url })));
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {images.length > 0 ? (
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.uri }}
              style={styles.image}
            />
          )}
        />
      ) : (
        <Text>No images found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default ImageGallery;
