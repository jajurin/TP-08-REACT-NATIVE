import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//import { NavigationContainer } from '@react-navigation/native'
//import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './componentes/Home';
import Detalle from './componentes/Detalle';
import Perfil from './componentes/Perfil';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detalle} />
        <Stack.Screen name="Profile" component={Perfil} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}