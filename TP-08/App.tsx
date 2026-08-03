import { useEffect, useMemo, useState } from 'react';
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
const PERFIL_ACTIVO_INDEX = 7;
const POSTS_EXTRA_PERFIL_ACTIVO = 2;
const CANT_POSTS_BASE = CANTIDAD_PERFILES; 
const CANT_GATOS = CANTIDAD_PERFILES + CANT_POSTS_BASE + POSTS_EXTRA_PERFIL_ACTIVO; 
const FRASES_POR_POST = 5;
const CANT_FRASES = (CANT_POSTS_BASE + POSTS_EXTRA_PERFIL_ACTIVO) * FRASES_POR_POST; 

export default function App() {
  const [publicaciones, setPublicaciones] = useState<Publicaciones[]>([]);
  const [perfiles, setPerfiles] = useState<Perfiles[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      setError(null);
      try {
        const listaGatos = await api.get(`/api/cats?limit=${CANT_GATOS}`);
        const gatos = listaGatos.data as { id: string }[];

        const gatosPerfil = gatos.slice(0, CANTIDAD_PERFILES);
        const gatosPost = gatos.slice(CANTIDAD_PERFILES, CANTIDAD_PERFILES + CANT_POSTS_BASE);
        const gatosExtra = gatos.slice(
          CANTIDAD_PERFILES + CANT_POSTS_BASE,
          CANTIDAD_PERFILES + CANT_POSTS_BASE + POSTS_EXTRA_PERFIL_ACTIVO
        );

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

        const comentariosRespuesta = await apiComentarios.get<QuoteApiResponse[]>(
          `https://api.api-ninjas.com/v2/quotes?categories=success%2Cwisdom&limit=${CANT_FRASES}`
        );
        const todasLasFrases = comentariosRespuesta.data;

        const crearComentarios = (frases: QuoteApiResponse[]): Comentarios[] =>
          frases.map((quote, index) => ({
            id: index,
            texto: quote.quote,
            fecha: new Date(),
            usuario: nuevosPerfiles[Math.floor(Math.random() * nuevosPerfiles.length)],
            likes: Math.floor(Math.random() * 100),
          }));

        const publicacionesBase: Publicaciones[] = gatosPost.map((gato, i) => {
          const frasesDelPost = todasLasFrases.slice(i * FRASES_POR_POST, i * FRASES_POR_POST + FRASES_POR_POST);
          return {
            id: i,
            perfil: nuevosPerfiles[i],
            imagen: `https://cataas.com/cat/${gato.id}?filter=mono&fontColor=orange&fontSize=20`,
            nombreUsuario: nuevosPerfiles[i].nombreUser,
            imagenUsuario: nuevosPerfiles[i].imagen,
            descripcion: `Gatito numero ${i} en accion`,
            cantLike: Math.floor(Math.random() * 1000),
            comentarios: crearComentarios(frasesDelPost),
            fecha: new Date(),
            liked: false,
          };
        });


        const perfilActivoBase = nuevosPerfiles[PERFIL_ACTIVO_INDEX];
        const publicacionesExtra: Publicaciones[] = gatosExtra.map((gato, j) => {
          const offset = (CANT_POSTS_BASE + j) * FRASES_POR_POST;
          const frasesDelPost = todasLasFrases.slice(offset, offset + FRASES_POR_POST);
          return {
            id: CANT_POSTS_BASE + j,
            perfil: perfilActivoBase,
            imagen: `https://cataas.com/cat/${gato.id}?filter=mono&fontColor=orange&fontSize=20`,
            nombreUsuario: perfilActivoBase.nombreUser,
            imagenUsuario: perfilActivoBase.imagen,
            descripcion: `Gatito numero ${CANT_POSTS_BASE + j} en accion`,
            cantLike: Math.floor(Math.random() * 1000),
            comentarios: crearComentarios(frasesDelPost),
            fecha: new Date(),
            liked: false,
          };
        });

        const nuevasPublicaciones: Publicaciones[] = [...publicacionesBase, ...publicacionesExtra];

        const perfilesConPublicaciones: Perfiles[] = nuevosPerfiles.map((perfil) => {
          const publicacionesDelPerfil = nuevasPublicaciones.filter(
            (publi) => publi.perfil.id === perfil.id
          );
          return {
            ...perfil,
            publicaciones: publicacionesDelPerfil,
            cantPubl: publicacionesDelPerfil.length,
          };
        });

        setPerfiles(perfilesConPublicaciones);
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

  const toggleLike = (id: number) => {
  setPublicaciones((prev) =>
    prev.map((publi) => {
      if (publi.id !== id) return publi;
      const liked = !publi.liked;
      return {
        ...publi,
        liked,
        cantLike: publi.cantLike + (liked ? 1 : -1),
      };
    })
  );
};

 const perfilActivo = perfiles[PERFIL_ACTIVO_INDEX];

  return (
  <AppNavigator
  perfil={perfilActivo}
  publicaciones={publicaciones}
  toggleLike={toggleLike}
/>
  );
}