import React, { useState } from "react";
import { View, Image } from "react-native";
import styles from './photo.style';
import * as ImagePicker from 'expo-image-picker';
import MapView, {Marker}from 'react-native-maps';
import * as Location from 'expo-location';

import Button from "../../Components/Button";

function Photo(){

    const [image, setImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [userLocation, setUserLocation] = useState({
        latitude: null,
        longitude: null,
        error: null,
    });

    const getLocation = async() =>{
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    }

    if(userLocation.error){
        return(
            <View>
                <Text>{userLocation.error}</Text>
            </View>
        )
    }
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.assets[0].uri);
      }
    };
    const handleButtonPress = () => {
        pickImage();
        getLocation();
      };


  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Button text="Fotograf Seç ve Konumu Gör" onPress={handleButtonPress}/>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
      {userLocation.latitude !== null && userLocation.longitude !== null && (
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

export default Photo;
