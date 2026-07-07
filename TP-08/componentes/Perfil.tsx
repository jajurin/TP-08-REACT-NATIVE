import { View, Text, Image, Pressable, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import type { Perfiles } from './interfaces/Perfiles';
import type { Publicaciones } from './interfaces/Publicaciones';

interface PerfilUsuarioProps {
  perfil: Perfiles;
  onSelectPublicacion?: (id: number) => void;
}

export default function PerfilUsuario({ perfil, onSelectPublicacion }: PerfilUsuarioProps) {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={perfil.publicaciones}
      keyExtractor={(item) => String(item.id)}
      numColumns={3}
      // El header con avatar/bio/métricas va como ListHeaderComponent:
      // así el scroll de toda la pantalla queda controlado por un único
      // FlatList (evita el warning de "VirtualizedList inside ScrollView").
      ListHeaderComponent={
        <View style={styles.header}>
          <LinearGradient
            colors={['#ff00c8', '#ff0055', '#ff8800']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorder}
          >
            <Image
              source={{ uri: perfil.imagen }}
              style={styles.perfilImg}
              resizeMode="cover"
            />
          </LinearGradient>

          <Text style={styles.nombre}>{perfil.nombreUser}</Text>
          <Text style={styles.alias}>{perfil.alias}</Text>

          {!!perfil.biografia && (
            <Text style={styles.bio}>{perfil.biografia}</Text>
          )}

          <View style={styles.stats}>
            <StatBox valor={perfil.cantPubl} label="Publicaciones" />
            <StatBox valor={perfil.seguidores} label="Seguidores" />
            {/* "seguidos" todavía no existe en la interface Perfiles.
                Sumalo ahí (ej: seguidos: number) y reemplazá este 0. */}
            <StatBox valor={0} label="Seguidos" />
          </View>

          <Pressable style={({ pressed }) => [styles.editarBtn, pressed && styles.editarBtnPresionado]}>
            <Text style={styles.editarTexto}>Editar perfil</Text>
          </Pressable>

          <View style={styles.separador} />
        </View>
      }
      renderItem={({ item }: { item: Publicaciones }) => (
        <Pressable
          style={styles.gridItem}
          onPress={() => onSelectPublicacion?.(item.id)}
        >
          <Image source={{ uri: item.imagen }} style={styles.gridImagen} resizeMode="cover" />
        </Pressable>
      )}
      ListEmptyComponent={
        <Text style={styles.sinPublicaciones}>Todavía no hay publicaciones</Text>
      }
    />
  );
}

function StatBox({ valor, label }: { valor: number; label: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValor}>{valor}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const GRID_GAP = 2;
const GRID_ITEM_SIZE = `${100 / 3}%` as const;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040427',
  },
  contentContainer: {
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  gradientBorder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    padding: 3,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  perfilImg: {
    width: '100%',
    height: '100%',
    borderRadius: 52,
  },
  nombre: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  alias: {
    color: '#b7b7d6',
    marginTop: 4,
    fontSize: 14,
  },
  bio: {
    color: '#e2e2f0',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  stats: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  statBox: {
    minWidth: 75,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#1b1c4d',
    borderRadius: 10,
    alignItems: 'center',
  },
  statValor: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  statLabel: {
    color: '#b7b7d6',
    fontSize: 11,
    marginTop: 2,
  },
  editarBtn: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3a3c7a',
    alignItems: 'center',
    marginBottom: 24,
  },
  editarBtnPresionado: {
    backgroundColor: '#1a1d46',
  },
  editarTexto: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  separador: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#23255a',
  },
  gridItem: {
    width: GRID_ITEM_SIZE,
    aspectRatio: 1,
    padding: GRID_GAP / 2,
  },
  gridImagen: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1b1c4d',
  },
  sinPublicaciones: {
    color: '#b7b7d6',
    textAlign: 'center',
    marginTop: 30,
  },
});