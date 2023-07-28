import React from "react";
import { View, Text } from "react-native";

import Button from '..//../Components/Button';
import Styles from './home.style';

function Home({navigation}){

    function gotoPhoto(){
        navigation.navigate('PhotoPage');
    }
    function gotoCamera(){
        navigation.navigate('CameraPage');
    }
    return(
     <View style={Styles.container}>
        <View style={Styles.header_container}>
        <Button text="Fotograf Seçme Ekranina git" onPress={gotoPhoto}/>
        <Button text="Fotograf Çekme Ekranina git" onPress={gotoCamera}/>
        </View>
    </View>

    )
}

export default Home;