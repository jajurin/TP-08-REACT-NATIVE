import { View, Text, FlatList, StyleSheet } from 'react-native'
import Publicacion from '../Publicacion/Publicacion'

export default function Feed({ Publicaciones, onSelect, toggleLike }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>TRENDING</Text>

      <FlatList
        data={Publicaciones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Publicacion
            publicacion={item}
            onSelect={() => onSelect(item.id)}
            toggleLike={toggleLike}
          />
        )}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  }
})