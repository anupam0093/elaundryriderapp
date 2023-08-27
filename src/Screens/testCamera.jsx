import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Camera } from 'expo-camera';

const testCamera = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraVisible, setCameraVisible] = useState(false);
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const openCamera = () => {
      setCameraVisible(true);
    };
  
    const closeCamera = () => {
      setCameraVisible(false);
    };
  
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={openCamera}>
          <Text>Open Camera</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={cameraVisible}
          onRequestClose={closeCamera}
        >
          <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} />
          <TouchableOpacity onPress={closeCamera}>
            <Text>Close Camera</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    );
}

export default testCamera