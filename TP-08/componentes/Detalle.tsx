import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { StatusBar } from 'expo-status-bar';
import type { Publicaciones } from './interfaces/Publicaciones';
import type { RootStackParamList } from './screens';

type DetalleRouteProp = RouteProp<RootStackParamList, 'DetallePost'>;

interface DetalleProps {
  publicaciones: Publicaciones[];
  toggleLike: (id: Publicaciones['id']) => void;
}

export default function Detalle({ publicaciones, toggleLike }: DetalleProps) {
  const navigation = useNavigation<any>();
  const route = useRoute<DetalleRouteProp>();

  const post = publicaciones.find((p) => p.id === route.params.postId);

  if (!post) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.errorTexto}>No se encontró la publicación.</Text>
      </SafeAreaView>
    );
  }

  const handleLike = () => {
    toggleLike(post.id);
  };

  const fechaFormateada = new Date(post.fecha).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
            <IconoAtras />
          </Pressable>
          <Image source={{ uri: post.imagenUsuario }} style={styles.avatarHeader} />
          <View style={{ flex: 1 }}>
            <Text style={styles.nombreUsuario}>{post.nombreUsuario}</Text>
          </View>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 16 }}>
          <Image
            source={{ uri: post.imagen }}
            style={styles.imagenPrincipal}
            resizeMode="cover"
          />
          <View style={styles.botones}>
            <Pressable onPress={handleLike} hitSlop={10}>
              <IconoLike activo={post.liked} />
            </Pressable>
            <Pressable hitSlop={10}>
              <IconoComentario />
            </Pressable>
            <Pressable hitSlop={10}>
              <IconoCompartir />
            </Pressable>
          </View>

          <Text style={styles.likes}>{post.cantLike} Me gusta</Text>


          <Text style={styles.caption}>
            <Text style={styles.captionUsuario}>{post.nombreUsuario} </Text>
            {post.descripcion}
          </Text>

          <Text style={styles.fecha}>{fechaFormateada}</Text>

          <View style={styles.separador} />

          {post.comentarios.length === 0 ? (
            <Text style={styles.sinComentarios}>Todavía no hay comentarios.</Text>
          ) : (
            post.comentarios.map((comentario) => (
              <View key={comentario.id} style={styles.comentarioItem}>
                <Image
                  source={{ uri: comentario.usuario.imagen }}
                  style={styles.avatarComentario}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.comentarioTexto}>
                    <Text style={styles.comentarioUsuario}>
                      {comentario.usuario.nombreUser}{' '}
                    </Text>
                    {comentario.texto}
                  </Text>
                  <Text style={styles.comentarioLikes}>{comentario.likes} Me gusta</Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>


        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Añade un comentario..."
            placeholderTextColor="#52547a"
          />
          <Pressable>
            <Text style={styles.btnPublicar}>Publicar</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
function IconoAtras() {
  return (
    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 19l-7-7 7-7"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
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
  safe: { flex: 1, backgroundColor: '#040427' },
  errorTexto: { color: 'white', textAlign: 'center', marginTop: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#23255a',
  },
  avatarHeader: { width: 32, height: 32, borderRadius: 16 },
  nombreUsuario: { color: 'white', fontSize: 14, fontWeight: '700' },
  scroll: { flex: 1 },
  imagenPrincipal: { width: '100%', aspectRatio: 1, backgroundColor: '#1b1c4d' },
  botones: { flexDirection: 'row', gap: 16, paddingHorizontal: 12, paddingTop: 12 },
  likes: { color: 'white', fontSize: 14, fontWeight: '600', paddingHorizontal: 12, marginTop: 8 },
  caption: { color: '#e2e2f0', fontSize: 14, lineHeight: 18, paddingHorizontal: 12, marginTop: 6 },
  captionUsuario: { fontWeight: '700', color: 'white' },
  fecha: {
    color: '#6d6e9c',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  separador: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#23255a',
    marginVertical: 14,
    marginHorizontal: 12,
  },
  sinComentarios: {
    color: '#8385b8',
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  comentarioItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  avatarComentario: { width: 28, height: 28, borderRadius: 14 },
  comentarioTexto: { color: '#d9d9f3', fontSize: 13, lineHeight: 18 },
  comentarioUsuario: { fontWeight: '700', color: 'white' },
  comentarioLikes: { color: '#6d6e9c', fontSize: 11, marginTop: 3 },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#23255a',
    backgroundColor: '#040427',
  },
  input: { flex: 1, color: 'white', fontSize: 14 },
  btnPublicar: { color: '#ff3ea5', fontWeight: '700', fontSize: 14 },
});