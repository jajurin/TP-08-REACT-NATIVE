import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const RUTAS = [
  { nombre: 'Home', ruta: 'Home' },
  { nombre: 'Perfil', ruta: 'Perfil' },
] as const;

export default function NavegadorSuperior() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.container}>
        {RUTAS.map((item) => {
          const activo = route.name === item.ruta;
          return (
            <Pressable
              key={item.ruta}
              style={styles.item}
              onPress={() => navigation.navigate(item.ruta)}
            >
              <Icono nombre={item.nombre} color={activo ? '#ff3ea5' : '#b7b7d6'} />
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

function Icono({ nombre, color }: { nombre: string; color: string }) {
  const size = 24;
  switch (nombre) {
    case 'Home':
      return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill={color}>
          <Path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" />
        </Svg>
      );
    case 'Perfil':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
          <Path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM4 22a8 8 0 0 1 16 0" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: '#040427',
  },
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#040427',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#23255a',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});