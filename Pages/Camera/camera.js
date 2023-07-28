import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from './camera.style';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import Button from "../../Components/Button";

function TakePhoto() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });
  const [isCameraReady, setIsCameraReady] = useState(false); // Yeni durum

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');

      const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus === 'granted');
    })();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
  };

  if (userLocation.error) {
    return (
      <View>
        <Text>{userLocation.error}</Text>
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back));
  }

  const takePicture = async () => {
    if (!isCameraReady) return; // Kamera hazır değilse fotoğraf çekmeye çalışma
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
    }
  };

  const FotoveKon = async () => {
   await takePicture();
    getLocation();
  };

  const handleButtonPress = async () => {
    toggleCameraType();
    if (cameraRef.current && !isCameraReady) {
      await cameraRef.current
        .waitForCameraReadyAsync() // Kameranın hazır olmasını bekleyin
        .then(() => {
          setIsCameraReady(true); // Kamera hazır olduğunda bu durumu ayarlayın
          takePicture(); // Fotoğraf çekme işlemini gerçekleştirin
          getLocation();
          setIsCameraReady(false); // Kamera artık hazır değil
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        {hasCameraPermission === null ? (
          <Text>Kamera izni isteniyor...</Text>
        ) : hasCameraPermission === false ? (
          <Text>Kamera izni reddedildi.</Text>
        ) : (
          <View style={styles.cameraContainer}>
            <Camera style={styles.camera} type={type} ref={cameraRef} onCameraReady={() => setIsCameraReady(true)}>
              <View style={styles.cameraButtonsContainer}>
              <TouchableOpacity style={styles.cameraButton} onPress={handleButtonPress}>
                <Text style={styles.cameraButtonText}> Yön değiştir</Text>
              </TouchableOpacity>
              </View>
            </Camera>
            <Button text="Fotograf Çek ve Konumu Gör" onPress={FotoveKon} />
          </View>
        )}
        {capturedImage && <Image source={{ uri: capturedImage }} style={{ width: 200, height: 200 }} />}
      </View>
      {hasGalleryPermission && userLocation.latitude !== null && userLocation.longitude !== null && (
        <MapView
          style={styles.map}
          region={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Konumunuz"
            description="Burasi"
          />
        </MapView>
      )}
    </View>
  );
}

export default TakePhoto;
