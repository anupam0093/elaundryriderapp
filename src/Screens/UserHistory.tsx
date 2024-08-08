import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, ActivityIndicator, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { storage } from '../../firebaseConfig';
import { ref, listAll, getDownloadURL, ListResult } from 'firebase/storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../networkAPI/types';
import useStore from '../GlobalStore/store';

interface ImageItem {
  uri: string;
}

interface FolderItem {
  name: string;
}

type Item = ImageItem | FolderItem;

const ImageGallery: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredFolders, setFilteredFolders] = useState<FolderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [hasImages, setHasImages] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const riderDetails = useStore((state) => state.riderDetails);
  const [storeId, setStoreId] = useState<string | undefined>(undefined);



  useEffect(() => {
    const fetchStoreId = async () => {
      const fetchedStoreId = riderDetails.storeId;
      setStoreId(fetchedStoreId);
      if (fetchedStoreId) {
        setCurrentPath(fetchedStoreId + '/');
      }
    };
    fetchStoreId();
  }, [riderDetails.storeId]);

  const fetchItems = async (path: string) => {
    try {
      const listRef = ref(storage, path);
      const res: ListResult = await listAll(listRef);
      const folders: FolderItem[] = res.prefixes.map((prefix) => ({ name: prefix.name }));
      const urls: ImageItem[] = await Promise.all(
        res.items.map((itemRef) =>
          getDownloadURL(itemRef).then((url) => ({ uri: url }))
        )
      );
      const allItems = [...folders, ...urls];
      setItems(allItems);
      setFilteredFolders(folders);
      setHasImages(urls.length > 0);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPath) {
      fetchItems(currentPath);
    }
  }, [currentPath]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredFolders(
        items.filter(
          (item): item is FolderItem =>
            'name' in item &&
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) as FolderItem[]
      );
    } else {
      setFilteredFolders(
        items.filter((item): item is FolderItem => 'name' in item) as FolderItem[]
      );
    }
  }, [searchQuery, items]);

  const handleFolderPress = (folderName: string) => {
    setCurrentPath((prevPath) => `${prevPath}${folderName}/`);
    setLoading(true);
  };

  const handleBackPress = () => {
    const newPath = currentPath.substring(0, currentPath.lastIndexOf('/', currentPath.length - 2) + 1);
    setCurrentPath(newPath);
    setLoading(true);
  };

  const handleImagePress = (uri: string) => {
    navigation.navigate('ImageViewer', { uri });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  console.log(currentPath, "currentPath")
  console.log(items,"items")
  console.log(filteredFolders,"filteredFolders")


  return (
    <View style={styles.container}>
      {!hasImages && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}
      {currentPath && currentPath !== `${storeId}/` && currentPath !== '' && (
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text>Back</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={items.filter((item): item is ImageItem => 'uri' in item)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImagePress(item.uri)}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </TouchableOpacity>
        )}
        numColumns={3}
      />

      <FlatList
        data={filteredFolders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.containerCol}>
            <TouchableOpacity style={styles.button} onPress={() => handleFolderPress(item.name)}>
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
        numColumns={1}
      />
      {
        items?.length === 0 || filteredFolders?.length === 0 && !hasImages && <Text>No Record Found</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  containerCol: {
    width: 380,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  button: {
    margin: 10,
    width: "95%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  backButton: {
    width: "95%",
    margin: "auto",
    marginVertical: 20,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  text: {
    color: '#000',
    fontSize: 20,
  },
  searchInput: {
    width: "92%",
    padding: 10,
    marginVertical: 20,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1
  },
});

export default ImageGallery;
