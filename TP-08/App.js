import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './componentes/Home'
import Detalle from './componentes/Detalle'
import Perfil from './componentes/Perfil'

const Stack = createNativeStackNavigator()

useEffect(() => {
  const cargarDatos = async () => {

    setLoading(true)

    const nuevosPerfiles = []

    for (let i = 0; i < 10; i++) {
      const respuesta = await api.get(
        `/cat?width=100&height=100&random=${i}`
      )

      nuevosPerfiles.push({
        id: i,
        imagen: respuesta.request.responseURL,
        biografia: `Amante de los gatos profesional`,
        cantPubl: 1,
        nombreUser: `Mi__Gatito_${i + 1}`,
        alias: `@gatito_${i + 1}`,
        seguidores: Math.floor(Math.random() * 1000),
        cantLike: Math.floor(Math.random() * 1000),
        publicaciones: []
      })
    }

    setPerfiles(nuevosPerfiles)

    const nuevaPublis = []

    for (let i = 0; i < 10; i++) {
      const respuesta = await api.get(
        `/cat/gif/says/Jaju y Alan?filter=mono&fontColor=orange&fontSize=20&type=square&random=${i + 1}`
      )

      const respuestaComentarios =
        await apiComentarios.get(
          'https://api.api-ninjas.com/v2/quotes?categories=success%2Cwisdom&limit=5'
        )

      const comentariosFake =
        respuestaComentarios.data.map((quote, index) => ({
          id: index,
          texto: quote.quote,
          fecha: new Date(),
          usuario:
            nuevosPerfiles[Math.floor(Math.random() * nuevosPerfiles.length)],
          likes: Math.floor(Math.random() * 100)
        }))

      nuevaPublis.push({
        id: i,
        perfil: nuevosPerfiles[i],
        imagen: respuesta.request.responseURL,
        nombreUsuario: nuevosPerfiles[i].nombreUser,
        imagenUsuario: nuevosPerfiles[i].imagen,
        descripcion: `Gatito numero ${i} en accion`,
        cantLike: Math.floor(Math.random() * 1000),
        comentarios: comentariosFake,
        fecha: new Date(),
        liked: false
      })
    }

    setPublicaciones(nuevaPublis)
    setLoading(false)
  }

  cargarDatos()
}, [])




  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="Home" component={Home} 
         Publicaciones={Publicaciones}
         onSelect={handleSelectPublicacion}
         toggleLike={toggleLike} />
        <Stack.Screen name="Detail" component={Detalle} />
        <Stack.Screen name="Profile" component={Perfil} />

      </Stack.Navigator>
    </NavigationContainer>
  )
