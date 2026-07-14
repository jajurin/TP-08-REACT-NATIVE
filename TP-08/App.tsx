import { useEffect, useState } from 'react';
import { api, apiComentarios } from './api';
import AppNavigator from './componentes/screens';
import type { Publicaciones } from './componentes/interfaces/Publicaciones';
import type { Perfiles } from './componentes/interfaces/Perfiles';
import type { Comentarios } from './componentes/interfaces/Comentarios';

interface QuoteApiResponse {
  quote: string;
  author: string;
  category: string;
}

const CANTIDAD_PERFILES = 10;

export default function App() {
  const [publicaciones, setPublicaciones] = useState<Publicaciones[]>([]);
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState<Publicaciones | null>(null); 
  const [perfiles, setPerfiles] = useState<Perfiles[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const cargarDatos = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1 solo pedido: trae 20 gatos de una (10 para perfiles + 10 para posts)
     const listaGatos = await api.get('/api/cats?limit=20');
const gatos = listaGatos.data as { id: string }[];

const gatosPerfil = gatos.slice(0, CANTIDAD_PERFILES);
const gatosPost = gatos.slice(CANTIDAD_PERFILES, CANTIDAD_PERFILES * 2);

const nuevosPerfiles: Perfiles[] = gatosPerfil.map((gato, i) => ({
  id: i,
  imagen: `https://cataas.com/cat/${gato.id}?width=100&height=100`,
  biografia: 'Amante de los gatos profesional',
  cantPubl: 1,
  nombreUser: `Mi__Gatito_${i + 1}`,
  alias: `@gatito_${i + 1}`,
  seguidores: Math.floor(Math.random() * 1000),
  cantLike: Math.floor(Math.random() * 1000),
  publicaciones: [],
}));

      setPerfiles(nuevosPerfiles);

      // 1 solo pedido para comentarios: 50 frases repartidas de a 5 por post
      const comentariosRespuesta = await apiComentarios.get<QuoteApiResponse[]>(
        'https://api.api-ninjas.com/v2/quotes?categories=success%2Cwisdom&limit=50'
      );
      const todasLasFrases = comentariosRespuesta.data;

     const nuevasPublicaciones: Publicaciones[] = gatosPost.map((gato, i) => {
  const frasesDelPost = todasLasFrases.slice(i * 5, i * 5 + 5);
  const comentariosFake: Comentarios[] = frasesDelPost.map((quote, index) => ({
    id: index,
    texto: quote.quote,
    fecha: new Date(),
    usuario: nuevosPerfiles[Math.floor(Math.random() * nuevosPerfiles.length)],
    likes: Math.floor(Math.random() * 100),
  }));

  return {
    id: i,
    perfil: nuevosPerfiles[i],
    // 👇 sacamos el /gif: usamos la imagen estática con los mismos filtros
    imagen: `https://cataas.com/cat/${gato.id}?filter=mono&fontColor=orange&fontSize=20`,
    nombreUsuario: nuevosPerfiles[i].nombreUser,
    imagenUsuario: nuevosPerfiles[i].imagen,
    descripcion: `Gatito numero ${i} en accion`,
    cantLike: Math.floor(Math.random() * 1000),
    comentarios: comentariosFake,
    fecha: new Date(),
    liked: false,
  };
});

      setPublicaciones(nuevasPublicaciones);
    } catch (err) {
      console.error('Error cargando datos:', err);
      setError('No pudimos cargar el contenido. Revisá tu conexión e intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  cargarDatos();
}, []);

 const handleSelectPublicacion = (idEl: number | null) => {
    if (idEl === null) {
      setPublicacionSeleccionada(null);
      return;
    }
    const publiEncontrada = publicaciones.find(
      (publi) => publi.id === idEl
    );
    setPublicacionSeleccionada(publiEncontrada ?? null);
  };

  const toggleLike = (id: number) => {
    setPublicaciones((prev) =>
      prev.map((publi) =>
        publi.id === id
          ? { ...publi, liked: !publi.liked }
          : publi
      )
    );
  };

  return (
    <AppNavigator
      perfil={perfiles[7]}
      publicaciones={publicaciones}
      onSelect={handleSelectPublicacion}
      toggleLike={toggleLike}
    />
  );
}