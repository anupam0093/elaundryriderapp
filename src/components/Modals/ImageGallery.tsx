import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { storage } from '../../../firebaseConfig'; 
import { ref, listAll, getDownloadURL, ListResult } from 'firebase/storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../networkAPI/types'; 
interface ImageItem {
  uri: string;
}

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const listRef = ref(storage, 'folder-path/'); 
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
            <TouchableOpacity onPress={() => navigation.navigate('ImageViewer', { uri: item.uri })}>
              <Image
                source={{ uri: item.uri }}
                style={styles.image}
              />
            </TouchableOpacity>
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
