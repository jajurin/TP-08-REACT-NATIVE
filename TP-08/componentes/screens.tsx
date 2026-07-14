import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Feed from './Home';
import PerfilUsuario from './Perfil';
import Publicacion from './Publicacion';
import type { Perfiles } from './interfaces/Perfiles';
import type { Publicaciones } from './interfaces/Publicaciones';

export type RootStackParamList = {
  Home: undefined;
  Explore: undefined;
  Reels: undefined;
  Igtv: undefined;
  Notification: undefined;
  Perfil: undefined;
  DetallePost: { post: any } | { postId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  perfil: Perfiles | undefined;
  publicaciones: Publicaciones[];
  onSelect: (id: Publicaciones['id']) => void;
  toggleLike: (id: Publicaciones['id']) => void;
}

export default function AppNavigator({ perfil, publicaciones, onSelect, toggleLike }: AppNavigatorProps) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Perfil"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home">
          {() => (
            <Feed
              publicaciones={publicaciones}
              onSelect={onSelect}
              toggleLike={toggleLike}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Explore" component={Publicacion} />
        <Stack.Screen name="Perfil">
          {() => perfil ? <PerfilUsuario perfil={perfil} /> : null}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}