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
        const perfilesRespuestas = await Promise.all(
          Array.from({ length: CANTIDAD_PERFILES }, (_, i) =>
            api.get(`/cat?width=100&height=100&random=${i}`)
          )
        );

        const nuevosPerfiles: Perfiles[] = perfilesRespuestas.map((respuesta, i) => ({
          id: i,
          imagen: respuesta.request.responseURL,
          biografia: 'Amante de los gatos profesional',
          cantPubl: 1,
          nombreUser: `Mi__Gatito_${i + 1}`,
          alias: `@gatito_${i + 1}`,
          seguidores: Math.floor(Math.random() * 1000),
          cantLike: Math.floor(Math.random() * 1000),
          publicaciones: [],
        }));

        setPerfiles(nuevosPerfiles);

        const publicacionesRespuestas = await Promise.all(
          Array.from({ length: CANTIDAD_PERFILES }, (_, i) =>
            api.get(
              `/cat/gif/says/Jaju y Alan?filter=mono&fontColor=orange&fontSize=20&type=square&random=${i + 1}`
            )
          )
        );

        const comentariosRespuestas = await Promise.all(
          Array.from({ length: CANTIDAD_PERFILES }, () =>
            apiComentarios.get<QuoteApiResponse[]>(
              'https://api.api-ninjas.com/v2/quotes?categories=success%2Cwisdom&limit=5'
            )
          )
        );

        const nuevasPublicaciones: Publicaciones[] = publicacionesRespuestas.map((respuesta, i) => {
          const comentariosFake: Comentarios[] = comentariosRespuestas[i].data.map((quote, index) => ({
            id: index,
            texto: quote.quote,
            fecha: new Date(),
            usuario: nuevosPerfiles[Math.floor(Math.random() * nuevosPerfiles.length)],
            likes: Math.floor(Math.random() * 100),
          }));

          return {
            id: i,
            perfil: nuevosPerfiles[i],
            imagen: respuesta.request.responseURL,
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