import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#443735',
        padding:15,
        alignItems:'center',
    },
    header_container:{
        flex:2,
        margin:1,
    },
    map:{
        flex:1,
        width: '50%',
        height: '50%',
    },
    cameraContainer:{
        flex:1,
        padding:10,
    },
    camera:{
        aspectRatio: 1, // Genişlik ve yükseklik oranını 1:1 yapar (kare şeklinde)
        justifyContent: "flex-end", // Kameranın alt kısmında butonların olması için
        alignItems: "center", // Kameranın yatayda ortalanması için
    },
    cameraButtonText:{
color:'white',
    }
    
    
})
 