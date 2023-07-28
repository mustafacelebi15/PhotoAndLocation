import React from "react";
import { View, Text } from "react-native";

import Button from '..//../Components/Button';
import Styles from './home.style';

function Home({navigation}){

    function gotoPhoto(){
        navigation.navigate('PhotoPage');
    }
    function gotoMap(){
        navigation.navigate('MapPage');
    }
    return(
     <View style={Styles.container}>
        <View style={Styles.header_container}>
        <Button text="Fotograf Ekranina git" onPress={gotoPhoto}/>
        </View>
    </View>

    )
}

export default Home;