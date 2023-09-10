import { Button, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera } from 'expo-camera';
import { TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CameraView = () => {
    let cameraRef = useRef();
    const navigation = useNavigation()
    const [hasCameraPermission, setHasCameraPermission] = useState();

    useEffect(() => {
        (async () => {
          const cameraPermission = await Camera.requestCameraPermissionsAsync();
          setHasCameraPermission(cameraPermission.status === "granted");
        })();
      }, []);

      if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
      } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
      }

  return (
    <Camera style={styles.container} ref={cameraRef}>
       <TouchableOpacity style={{position:'absolute', top:'10%', left:'10%'}} onPress={()=>navigation.goBack()}>
            <EvilIcons name="close" size={30} color="white"/>
        </TouchableOpacity> 
    <View style={styles.buttonContainer}>
      <Button title="Take Pic"/>
    </View>
    <StatusBar style="auto" />
  </Camera>
  )
}

export default CameraView

const styles = StyleSheet.create({
    container: {
        zIndex:999999,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      backgroundColor: '#fff',
      position:'absolute',
      bottom:'20%'

    },
    preview: {
      alignSelf: 'stretch',
      flex: 1
    }
  });