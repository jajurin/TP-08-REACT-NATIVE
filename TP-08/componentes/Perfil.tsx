import { View, Text, Image, Pressable, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import NavegadorSuperior from './NavegadorSuperior';
import type { Perfiles } from './interfaces/Perfiles';
import type { Publicaciones } from './interfaces/Publicaciones';

interface PerfilUsuarioProps {
  perfil: Perfiles;
  onSelectPublicacion?: (id: number) => void;
}

export default function PerfilUsuario({ perfil, onSelectPublicacion }: PerfilUsuarioProps) {
  return (
    <View style={{ flex: 1 }}>
      <NavegadorSuperior />
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={perfil.publicaciones}
        keyExtractor={(item) => String(item.id)}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
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
              <StatBox valor={0} label="Seguidos" />
            </View>

            <Pressable style={({ pressed }) => [styles.editarBtn, pressed && styles.editarBtnPresionado]}>
              <Text style={styles.editarTexto}>Editar perfil</Text>
            </Pressable>

            <View style={styles.separador} />

            {perfil.publicaciones.length > 0 && (
              <View style={styles.gridHeader}>
                <Text style={styles.gridHeaderTexto}>PUBLICACIONES</Text>
              </View>
            )}
          </View>
        }
        renderItem={({ item }: { item: Publicaciones }) => (
          <Pressable
            style={({ pressed }) => [styles.gridItem, pressed && styles.gridItemPresionado]}
            onPress={() => onSelectPublicacion?.(item.id)}
          >
            <Image source={{ uri: item.imagen }} style={styles.gridImagen} resizeMode="cover" />
            <View style={styles.gridOverlay}>
              <Text style={styles.gridLikes}>♥ {item.cantLike}</Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Text style={styles.emptyIcon}>📷</Text>
            </View>
            <Text style={styles.sinPublicacionesTitulo}>Todavía no hay publicaciones</Text>
            <Text style={styles.sinPublicacionesSub}>Cuando subas fotos, van a aparecer acá</Text>
          </View>
        }
      />
    </View>
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

const GRID_GAP = 3;
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
  gridHeader: {
    width: '100%',
    paddingTop: 14,
    paddingBottom: 10,
    paddingHorizontal: GRID_GAP,
  },
  gridHeaderTexto: {
    color: '#8385b8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  columnWrapper: {
    gap: GRID_GAP,
    paddingHorizontal: GRID_GAP,
  },
  gridItem: {
    width: GRID_ITEM_SIZE,
    aspectRatio: 1,
    marginBottom: GRID_GAP,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#12133a',
  },
  gridItemPresionado: {
    opacity: 0.75,
  },
  gridImagen: {
    width: '100%',
    height: '100%',
  },
  gridOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: 'rgba(4, 4, 39, 0.55)',
  },
  gridLikes: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: '#3a3c7a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  emptyIcon: {
    fontSize: 26,
  },
  sinPublicacionesTitulo: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  sinPublicacionesSub: {
    color: '#8385b8',
    fontSize: 13,
    textAlign: 'center',
  },
});