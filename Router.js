import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Pages/Home';
import Photo from './Pages/Photo';
import Camera from './Pages/Camera';

const Stack = createStackNavigator();

function Router() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={Home} options={{
        title: 'Home Page',
        headerStyle: {backgroundColor: '#5F3F39'},
        headerTitleStyle: {color: 'white'},
       }}/>
      <Stack.Screen name="PhotoPage" component={Photo} options={{
        title: 'Photo Page',
        headerStyle: {backgroundColor: '#5F3F39'},
        headerTitleStyle: {color: 'white'},
       }}/>
        <Stack.Screen name="CameraPage" component={Camera} options={{
        title: 'Camera Page',
        headerStyle: {backgroundColor: '#5F3F39'},
        headerTitleStyle: {color: 'white'},
       }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
