import { Alert, Button, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Modal from "react-native-modal";
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { EvilIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

const CamModal = ({showCameModal, setShowCamModal, setCapturedImage}) => {
    let cameraRef = useRef();
    const navigation = useNavigation()
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const { width} = useWindowDimensions()
    const [photo, setPhoto] = useState();


    let takePic = async () => {
      let options = {
        quality: 1,
        base64: true,
        exif: false
      };
  
      let newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
      
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        Alert.alert('Image Saved')
        setCapturedImage(photo)
        setPhoto(undefined);
      });
    };

    useEffect(() => {
        (async () => {
          const cameraPermission = await Camera.requestCameraPermissionsAsync();
          const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
          setHasCameraPermission(cameraPermission.status === "granted");
          setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
      }, []);

      if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
      } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
      }
  return (
  
    <Modal
    isVisible={showCameModal} 
    avoidKeyboard={true}
    animationIn='fadeInUp'
    animationOut='fadeOutDown'  
  >
    {photo && (
      <SafeAreaView style={styles.container}>
      <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />

      <View style={{flexDirection:'row', justifyContent:'space-around', width:'100%', position:'absolute', bottom:'10%'}}>
        <TouchableOpacity onPress={()=>setPhoto(null)}>
          <Text style={{color:'white', fontSize:20, textTransform:'uppercase'}}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>savePhoto()} >
          <Text style={{color:'white', fontSize:20, textTransform:'uppercase'}}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

    )}
    {!photo && (
      <Camera style={styles.container} ref={cameraRef}>
        <TouchableOpacity style={{position:'absolute', top:'10%', left:'10%'}} onPress={()=>setShowCamModal(false)}>
              <EvilIcons name="close" size={30} color="white"/>
          </TouchableOpacity> 
      <TouchableOpacity style={styles.buttonContainer}  onPress={()=>takePic()}/>
      
      <StatusBar style="auto" />
    </Camera>
    )}
    </Modal>
    
  )
}

export default CamModal

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      backgroundColor: '#fff',
      position:'absolute',
      bottom:'10%',
      width:'20%', 
      height:'8%', 
      borderRadius:'50%'

    },
    preview: {
      alignSelf: 'stretch',
      flex: 1
    }
  });