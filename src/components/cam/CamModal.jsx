import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Modal from "react-native-modal";
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { EvilIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

const CamModal = ({ showCameModal, setShowCamModal, setCapturedImage }) => {
  let cameraRef = useRef();
  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const { width } = useWindowDimensions();
  const [photos, setPhotos] = useState([]);
  const [capturing, setCapturing] = useState(false);

  let takePic = async () => {
    if (!capturing) {
      setCapturing(true);

      let options = {
        quality: 1,
        base64: true,
        exif: false
      };

      let newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhotos(prevPhotos => [...prevPhotos, newPhoto]);

      setCapturing(false);
    }
  };

  let savePhotos = () => {
    // Save each photo to the library
    Promise.all(
      photos.map(async photo => {
        await MediaLibrary.saveToLibraryAsync(photo.uri);
      })
    )
      .then(() => {
        Alert.alert('Images Saved');
        setCapturedImage(photos);
        setPhotos([]);
        setShowCamModal(false);
      })
      .catch(error => {
        console.error('Error saving images:', error);
      });
  };

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>;
  }

  return (
    <Modal isVisible={showCameModal} avoidKeyboard={true} animationIn="fadeInUp" animationOut="fadeOutDown">
      {photos.length > 0 && (
        <SafeAreaView style={styles.container}>
          <View style={styles.photosContainer}>
            {photos.map((photo, index) => (
              <Image key={index} style={styles.preview} source={{ uri: 'data:image/jpg;base64,' + photo.base64 }} />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => setPhotos([])}>
              <Text style={styles.buttonText}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => savePhotos()}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
      {photos.length < 3 && (
        <Camera style={styles.container} ref={cameraRef}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowCamModal(false)}>
            <EvilIcons name="close" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={() => takePic()}>
            <Text style={styles.captureButtonText}>Take Pic</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </Camera>
      )}
    </Modal>
  );
};

export default CamModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '10%',
    left: '10%',
  },
  captureButton: {
    backgroundColor: 'green',
    position: 'absolute',
    bottom: '10%',
    width: '20%',
    height: '8%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
  photosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    top: '5%',
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: '5%',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textTransform: 'uppercase',
  },
});
