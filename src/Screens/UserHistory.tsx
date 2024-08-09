import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { storage } from "../../firebaseConfig";
import { ref, listAll, getDownloadURL, ListResult } from "firebase/storage";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../networkAPI/types";
import useStore from "../GlobalStore/store";
import PagerView from "react-native-pager-view";

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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [hasImages, setHasImages] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const riderDetails = useStore((state) => state.riderDetails);
  const [storeId, setStoreId] = useState<string | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStoreId = () => {
      const fetchedStoreId = riderDetails.storeId;
      setStoreId(fetchedStoreId);
      if (fetchedStoreId) {
        setCurrentPath(`${fetchedStoreId}/`);
      }
    };
    fetchStoreId();
  }, [riderDetails.storeId]);

  const fetchItems = async (path: string) => {
    try {
      const listRef = ref(storage, path);
      const res: ListResult = await listAll(listRef);
      const folders: FolderItem[] = res.prefixes.map((prefix) => ({
        name: prefix.name,
      }));
      const urls: ImageItem[] = await Promise.all(
        res.items.map((itemRef) =>
          getDownloadURL(itemRef).then((url) => ({ uri: url }))
        )
      );
      setItems([...folders, ...urls]);
      setFilteredFolders(folders);
      setHasImages(urls.length > 0);
    } catch (error) {
      console.error("Error fetching items:", error);
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
            "name" in item &&
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) as FolderItem[]
      );
    } else {
      setFilteredFolders(
        items.filter(
          (item): item is FolderItem => "name" in item
        ) as FolderItem[]
      );
    }
  }, [searchQuery, items]);

  const handleFolderPress = (folderName: string) => {
    setCurrentPath((prevPath) => `${prevPath}${folderName}/`);
    setLoading(true);
  };

  const handleBackPress = () => {
    const newPath = currentPath.substring(
      0,
      currentPath.lastIndexOf("/", currentPath.length - 2) + 1
    );
    setCurrentPath(newPath);
    setLoading(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setImageLoading(true);
  };

  const handleImagePress = (index: number) => {
    setSelectedIndex(index);
    setIsModalVisible(true);
  };

  if (loading) {
    return <View style={styles.loader}><ActivityIndicator size="large" color="#0000ff" /></View>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      { currentPath !== `${storeId}/` && (
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text>Back</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={filteredFolders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.containerCol}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleFolderPress(item.name)}
            >
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
        numColumns={1}
      />

      <FlatList
        data={items.filter((item): item is ImageItem => "uri" in item)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleImagePress(index)}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </TouchableOpacity>
        )}
        numColumns={3}
      />

      {items.length === 0 && !hasImages && <Text>No Record Found</Text>}

      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <PagerView
            style={styles.pagerView}
            initialPage={selectedIndex}
            onPageSelected={(e) => setSelectedIndex(e.nativeEvent.position)}
          >
            {items
              .filter((item): item is ImageItem => "uri" in item)
              .map((item, index) => (
                <View key={index} style={styles.fullScreenImageWrapper}>
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.fullScreenImage}
                    onLoadEnd={() => setImageLoading(false)}
                  />
                  {imageLoading && <View style={styles.loader2}><ActivityIndicator size="large" color="#0000ff" /></View>}
                </View>
              ))}
          </PagerView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  containerCol: {
    width: 360,
    flexDirection: "column",
    alignItems: "center",
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
    width: 340,
    marginVertical: 20,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  text: {
    color: "#000",
    fontSize: 20,
  },
  closeButton: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    zIndex: 999,
  },
  closeButtonText: {
    color: "#000",
    fontSize: 16,
  },
  searchInput: {
    width: "92%",
    padding: 10,
    marginVertical: 20,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    borderWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pagerView: {
    width: "100%",
    height: "100%",
  },
  fullScreenImageWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
  },
  loader:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  loader2: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  
});

export default ImageGallery;
