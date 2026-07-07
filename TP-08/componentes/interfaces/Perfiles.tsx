import type { Publicaciones } from "./Publicaciones";
export interface Perfiles {
    id: number
    imagen: string;
    biografia: string;
    cantPubl: number;
    nombreUser: string;
    alias:string;
    seguidores: number;
    cantLike: number;
    publicaciones: Publicaciones[];
}