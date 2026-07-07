import { View, Text, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import Publicacion from './Publicacion';
import type { Publicaciones } from './interfaces/Publicaciones';
// ⬆️ Ajustá esta ruta según dónde esté Home.tsx respecto a la carpeta interfaces.
//    Por el screenshot, Home.tsx vive en TP-08/componentes, así que si
//    interfaces/ está dentro de componentes/, la ruta relativa es './interfaces/Publicaciones'

// ❌ BORRAMOS esto, ya no hace falta:
// interface PublicacionData { id: number | string; }

interface FeedProps {
  publicaciones: Publicaciones[];
  onSelect: (id: Publicaciones['id']) => void;
  toggleLike: (id: Publicaciones['id']) => void;
}

export default function Feed({ publicaciones, onSelect, toggleLike }: FeedProps) {
  const { width } = useWindowDimensions();
  const numColumns = width > 700 ? 3 : width > 420 ? 2 : 1;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TRENDING</Text>

      <FlatList
        data={publicaciones}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        key={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.itemWrapper}>
            <Publicacion
              publicacion={item}
              onSelect={() => onSelect(item.id)}
              toggleLike={toggleLike}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#121212' },
  title: { color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  listContent: { paddingBottom: 20 },
  row: { justifyContent: 'space-between', marginBottom: 16 },
  itemWrapper: { flex: 1, marginHorizontal: 4 },
});