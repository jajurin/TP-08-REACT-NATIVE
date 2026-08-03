import { View, Text, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Publicacion from './Publicacion';
import type { Publicaciones } from './interfaces/Publicaciones';
import NavegadorSuperior from './NavegadorSuperior';

interface FeedProps {
  publicaciones: Publicaciones[];
  toggleLike: (id: Publicaciones['id']) => void;
}

export default function Feed({ publicaciones, toggleLike }: FeedProps) {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const numColumns = width > 700 ? 3 : width > 420 ? 2 : 1;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <NavegadorSuperior />
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
                onSelect={() => navigation.navigate('DetallePost', { postId: item.id })}
                toggleLike={toggleLike}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#040427' },
  container: { flex: 1, padding: 16, backgroundColor: '#040427' },
  title: { color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  listContent: { paddingBottom: 20 },
  row: { justifyContent: 'space-between', marginBottom: 16 },
  itemWrapper: { flex: 1, marginHorizontal: 4 },
});