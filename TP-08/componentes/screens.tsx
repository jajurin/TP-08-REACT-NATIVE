import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Feed from './Home';
import PerfilUsuario from './Perfil';
import Detalle from './Detalle';
import type { Perfiles } from './interfaces/Perfiles';
import type { Publicaciones } from './interfaces/Publicaciones';

export type RootStackParamList = {
  Home: undefined;
  Explore: undefined;
  Reels: undefined;
  Igtv: undefined;
  Notification: undefined;
  Perfil: undefined;
  DetallePost: { postId: Publicaciones['id'] };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  perfil: Perfiles | undefined;
  publicaciones: Publicaciones[];
  toggleLike: (id: Publicaciones['id']) => void;
}

export default function AppNavigator({ perfil, publicaciones, toggleLike }: AppNavigatorProps) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id="Root"
        initialRouteName="Perfil"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home">
          {() => (
            <Feed
              publicaciones={publicaciones}
              toggleLike={toggleLike}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Perfil">
        {() => (perfil ? <PerfilUsuario perfil={perfil} publicaciones={publicaciones} /> : null)}
        </Stack.Screen>

        <Stack.Screen
          name="DetallePost"
          options={{ presentation: 'modal' }}
        >
          {() => (
            <Detalle
              publicaciones={publicaciones}
              toggleLike={toggleLike}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}