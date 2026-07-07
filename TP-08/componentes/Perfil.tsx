import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

interface PerfilUsuarioProps {
  perfil: {
    imagen: string;
    nombreUser: string;
    alias: string;
    seguidores: number;
    cantLike: number;
  };
}

// Definimos los ítems del menú como datos, no repetidos a mano.
// Esto evita copiar/pegar 5 bloques casi idénticos (principio DRY:
// Don't Repeat Yourself). Si mañana agregás un ítem, solo tocás este array.
const MENU_ITEMS = [
  { key: 'home', label: 'Home', activo: true },
  { key: 'explore', label: 'Explore', activo: false },
  { key: 'reels', label: 'Reels', activo: false },
  { key: 'igtv', label: 'IGTV', activo: false },
  { key: 'notification', label: 'Notification', activo: false },
] as const;

export default function PerfilUsuario({ perfil }: PerfilUsuarioProps) {
  return (
    <View style={styles.container}>
      {/* LinearGradient envuelve la imagen, simulando el borde degradado.
          El padding acá hace de "grosor" del borde de color. */}
      <LinearGradient
        colors={['#ff00c8', '#ff0055', '#ff8800']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorder}
      >
        <Image
          source={{ uri: perfil.imagen }}
          style={styles.perfilImg}
          resizeMode="cover"
        />
      </LinearGradient>

      <Text style={styles.nombre}>{perfil.nombreUser}</Text>
      <Text style={styles.alias}>{perfil.alias}</Text>

      <View style={styles.stats}>
        <View style={styles.statBox}>
          <IconoSeguidores />
          <Text style={styles.statTexto}>{perfil.seguidores} K</Text>
        </View>

        <View style={styles.statBox}>
          <IconoLikes />
          <Text style={styles.statTexto}>{perfil.cantLike} K</Text>
        </View>
      </View>

      <View style={styles.menu}>
        {MENU_ITEMS.map((item) => (
          <Pressable
            key={item.key}
            style={({ pressed }) => [
              styles.menuItem,
              item.activo && styles.menuItemActivo,
              pressed && styles.menuItemPresionado,
            ]}
          >
            <IconoMenu nombre={item.key} />
            <Text style={styles.menuTexto}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

// --- Íconos ---
// Cada ícono es su propio mini-componente. Ventaja: el JSX principal
// queda legible (no hay 40 líneas de <Path> mezcladas con la UI),
// y si un ícono se repite en otra pantalla, lo importás y ya está.

function IconoSeguidores() {
  return (
    <Svg width={18} height={18} viewBox="0 0 20 20" fill="#ffffff">
      <Path d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598"
        transform="translate(-84, -1999)"
      />
    </Svg>
  );
}

function IconoLikes() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
        stroke="#ffffff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconoMenu({ nombre }: { nombre: string }) {
  const color = 'white';
  const props = { width: 32, height: 32, fill: color };

  switch (nombre) {
    case 'home':
      return (
        <Svg {...props} viewBox="0 0 16 16">
          <Path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" />
        </Svg>
      );
    case 'explore':
      return (
        <Svg {...props} viewBox="0 0 24 24">
          <Path d="M6.45 17.216l7.981-3.845 2.98-7.115-7.116 2.98zm6.741-4.358l-4.599 2.216 2.216-4.6zM12 1.2A10.8 10.8 0 1 0 22.8 12 10.812 10.812 0 0 0 12 1.2zm0 20.6a9.8 9.8 0 1 1 9.8-9.8 9.81 9.81 0 0 1-9.8 9.8z" />
        </Svg>
      );
    case 'reels':
      return (
        <Svg {...props} viewBox="0 0 20 20">
          <Path d="M96.66,3608.872 L91,3612 L91,3606 L96.66,3608.872 Z M86,3617 L102,3617 L102,3601 L86,3601 L86,3617 Z M84,3619 L104,3619 L104,3599 L84,3599 L84,3619 Z"
            transform="translate(-84, -3599)"
          />
        </Svg>
      );
    case 'igtv':
      return (
        <Svg {...props} viewBox="0 0 32 32">
          <Path d="M26 26.75h-20c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h20c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM28 2.75h-24c-1.794 0.002-3.248 1.456-3.25 3.25v16c0.002 1.794 1.456 3.248 3.25 3.25h24c1.794-0.001 3.249-1.456 3.25-3.25v-16c-0.002-1.794-1.456-3.248-3.25-3.25h-0zM28.75 22c-0 0.414-0.336 0.75-0.75 0.75h-24c-0.414-0-0.75-0.336-0.75-0.75v-16c0.001-0.414 0.336-0.749 0.75-0.75h24c0.414 0 0.75 0.336 0.75 0.75v0z" />
        </Svg>
      );
    case 'notification':
      return (
        <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            fill={color}
            d="M11.5 1C10.9477 1 10.5 1.44772 10.5 2V3H9.99998C7.23864 3 4.99999 5.23825 4.99999 7.99975V11C4.99999 11.7377 4.76718 12.5722 4.39739 13.4148C4.03165 14.2482 3.55876 15.0294 3.14142 15.6439C2.38188 16.7624 2.85216 18.5301 4.40564 18.8103C5.42144 18.9935 6.85701 19.2115 8.54656 19.3527C8.54454 19.4015 8.54352 19.4506 8.54352 19.5C8.54352 21.433 10.1105 23 12.0435 23C13.9765 23 15.5435 21.433 15.5435 19.5C15.5435 19.4482 15.5424 19.3966 15.5402 19.3453C17.1921 19.204 18.596 18.9903 19.5943 18.8103C21.1478 18.5301 21.6181 16.7624 20.8586 15.6439C20.4412 15.0294 19.9683 14.2482 19.6026 13.4148C19.2328 12.5722 19 11.7377 19 11V7.99975C19 5.23825 16.7613 3 14 3H13.5V2C13.5 1.44772 13.0523 1 12.5 1H11.5ZM12 19.5C12.5113 19.5 13.0122 19.4898 13.4997 19.4715C13.5076 20.2758 12.8541 20.9565 12.0435 20.9565C11.2347 20.9565 10.5803 20.2778 10.5872 19.4747C11.0473 19.491 11.5191 19.5 12 19.5ZM9.99998 5C8.34305 5 6.99999 6.34298 6.99999 7.99975V11C6.99999 12.1234 6.65547 13.2463 6.22878 14.2186C5.79804 15.2 5.25528 16.0911 4.79599 16.7675C4.78578 16.7825 4.78102 16.7969 4.77941 16.8113C4.77797 16.8242 4.77919 16.8362 4.78167 16.8458C6.3644 17.1303 9.00044 17.5 12 17.5C14.9995 17.5 17.6356 17.1303 19.2183 16.8458C19.2208 16.8362 19.222 16.8242 19.2206 16.8113C19.2189 16.7969 19.2142 16.7825 19.204 16.7675C18.7447 16.0911 18.2019 15.2 17.7712 14.2186C17.3445 13.2463 17 12.1234 17 11V7.99975C17 6.34298 15.6569 5 14 5H9.99998Z"
          />
        </Svg>
      );
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040427',
    alignItems: 'center',
    paddingTop: 40,
  },
  gradientBorder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    padding: 3,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  perfilImg: {
    width: '100%',
    height: '100%',
    borderRadius: 52, // un poco menor al del padre, para que se vea el borde
  },
  nombre: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  alias: {
    color: '#b7b7d6',
    marginTop: 8,
    marginBottom: 25,
    fontSize: 14,
  },
  stats: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  statBox: {
    width: 75,
    height: 42,
    backgroundColor: '#1b1c4d',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  statTexto: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  menu: {
    width: '100%',
    marginTop: 10,
  },
  menuItem: {
    width: '100%',
    minHeight: 75,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
    paddingHorizontal: 25,
  },
  menuItemActivo: {
    backgroundColor: '#23255a',
    borderLeftWidth: 4,
    borderLeftColor: '#ff3ea5',
  },
  menuItemPresionado: {
    backgroundColor: '#1a1d46',
  },
  menuTexto: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});