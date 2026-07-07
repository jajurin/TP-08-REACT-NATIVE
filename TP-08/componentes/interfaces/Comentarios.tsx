import type { Perfiles } from "./Perfiles";
export interface Comentarios {
    id: number;

    texto: string;

    fecha: Date;

    usuario: Perfiles;

    likes: number;
}