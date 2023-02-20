import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

export default function TakePhotoScreen() {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const camPermission = await Camera.requestCameraPermission();
      setHasPermission(camPermission === 'authorized');
      // await Camera.requestMicrophonePermission();
    }
    fetchData();
  }, []);

  // emulator有bug，不能使用virtualscene，要使用emulated，否则显示不了path
  const takePhoto = async () => {
    try {
      if (!camera.current) throw new Error('camera ref is null');
      console.log('taking photo...');
      const photo = await camera.current.takePhoto({flash: 'on'});
      Alert.alert(photo.path);
    } catch (error) {
      console.log(error);
    }
  };

  if (!device) return <Text>Loading...</Text>;

  return (
    <View style={{flex: 1}}>
      {device !== null && hasPermission && (
        <>
          <Camera
            ref={camera}
            photo={true}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
          />
          <Button title="take photo" onPress={takePhoto} />
        </>
      )}
    </View>
  );
}
