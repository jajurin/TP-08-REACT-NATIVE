import { View, Text, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import Publicacion from './Publicacion';
// Definimos la forma de una publicación.
// Ajustá los campos según lo que realmente use tu componente <Publicacion />.
interface PublicacionData {
  id: number | string;
  // ...otros campos: titulo, imagenUrl, likes, etc.
}

// Tipamos las props del componente Feed.
// Esto hace que si te olvidás de pasar una prop, o pasás el tipo equivocado,
// TypeScript te avise ANTES de ejecutar la app.
interface FeedProps {
  publicaciones: PublicacionData[];
  onSelect: (id: PublicacionData['id']) => void;
  toggleLike: (id: PublicacionData['id']) => void;
}

export default function Feed({ publicaciones, onSelect, toggleLike }: FeedProps) {
  // useWindowDimensions es un hook de RN que devuelve el ancho/alto
  // actual de la pantalla y se actualiza solo si el usuario rota el celular
  // o (en tablet/web) redimensiona la ventana.
  const { width } = useWindowDimensions();

  // Calculamos cuántas columnas mostrar según el ancho disponible.
  // Es nuestra forma "manual" de imitar el auto-fit de tu CSS Grid.
  const numColumns = width > 700 ? 3 : width > 420 ? 2 : 1;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TRENDING</Text>

      <FlatList
        data={publicaciones}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        // key fuerza a React a recrear la lista si numColumns cambia
        // (por ejemplo al rotar la pantalla), evitando el error de RN
        // "changing numColumns on the fly is not supported".
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212', // fondo oscuro, ya que tu h1 original era blanco
  },
  title: {
    color: 'white',
    fontSize: 28, // 42px en una pantalla de celular es enorme, lo bajamos
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between', // simula el "gap" horizontal del grid
    marginBottom: 16, // simula el "gap" vertical
  },
  itemWrapper: {
    flex: 1,
    marginHorizontal: 4, // pequeño respiro entre columnas
  },
});
