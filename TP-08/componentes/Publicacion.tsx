import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import type { Publicaciones } from './interfaces/Publicaciones';

interface PublicacionProps {
  publicacion: Publicaciones;
  onSelect: () => void;
  toggleLike: (id: number) => void;
}

export default function Publicacion({
  publicacion,
  onSelect,
  toggleLike,
}: PublicacionProps) {
  return (
    <Pressable onPress={onSelect} style={styles.container}>
      <Image
        source={{ uri: publicacion.imagen }}
        style={styles.imagenPublicacion}
        resizeMode="cover"
      />

      <View style={styles.footer}>
        <View style={styles.header}>
          <Image
            source={{ uri: publicacion.imagenUsuario }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.nombreUsuario}>{publicacion.nombreUsuario}</Text>
          </View>
        </View>

        <View style={styles.botones}>
          <Pressable
            onPress={() => toggleLike(publicacion.id)}
            hitSlop={10}
          >
            <IconoLike activo={publicacion.liked} />
          </Pressable>

          <Pressable hitSlop={10}>
            <IconoComentario />
          </Pressable>

          <Pressable hitSlop={10}>
            <IconoCompartir />
          </Pressable>
        </View>

        <Text style={styles.likes}>{publicacion.cantLike} Me gusta</Text>

        <Text style={styles.caption}>
          <Text style={styles.captionUsuario}>{publicacion.nombreUsuario} </Text>
          {publicacion.descripcion}
        </Text>
      </View>
    </Pressable>
  );
}

function IconoLike({ activo }: { activo: boolean }) {
  return (
    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={activo ? '#ff3040' : 'none'}
        stroke={activo ? '#ff3040' : '#ffffff'}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
function IconoComentario() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7"
        stroke="white"
        strokeWidth={1.5}
      />
    </Svg>
  );
}

function IconoCompartir() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: '#040427',
    borderRadius: 8,
    overflow: 'hidden',
  },
  imagenPublicacion: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#1b1c4d',
  },
  footer: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  nombreUsuario: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },

  botones: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  likes: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  caption: {
    color: '#e2e2f0',
    fontSize: 14,
    lineHeight: 18,
  },
  captionUsuario: {
    fontWeight: '700',
    color: 'white',
  },
});