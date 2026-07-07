import type { Perfiles } from "./Perfiles";
import type { Comentarios } from "./Comentarios";
export interface Publicaciones {
    id: number
    nombreUsuario: string;
    imagenUsuario:string;
    imagen: string;
    descripcion: string;
    cantLike: number;
   comentarios: Comentarios[];
    fecha: Date;
    perfil: Perfiles;
    liked: boolean 
}