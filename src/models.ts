//models.ts
export type Estado = "Pendiente" | "En Curso" | "Terminada" | "Cancelada";
export type Dificultad = "Facil" | "Medio" | "Dificil";

export interface Tarea {
    titulo: string;
    descripcion: string;
    estado: Estado;
    dificultad: Dificultad;
    fechaCreacion: Date;
    ultimaEdicion: Date;
    vencimiento?: Date;
}


// Tareas Inmutables

export const crearTarea = (
    titulo: string,
    descripcion: string = "",
    dificultad: Dificultad = "Facil",
    vencimiento?: Date
): Tarea =>
    Object.freeze({
        titulo,
        descripcion,
        estado: "Pendiente" as Estado,
        dificultad,
        fechaCreacion: new Date(),
        ultimaEdicion: new Date(),
        vencimiento
    });

