//puras.ts

import { Tarea, Estado, Dificultad } from "./models";

//creamos una lista nueva
// agregar tareas : puro
export const agregarTarea = (lista: readonly Tarea[], nueva: Tarea): Tarea[] => [...lista, nueva];


// === FILTRAR ===
// puro
export const filtrarEstados = (estado: Estado) => (lista: readonly Tarea[]) =>
    lista.filter(t => t.estado === estado);
// puro
export const filtrarTitulo = (texto: string) => (lista: readonly Tarea[]) =>
    lista.filter(t => t.titulo.toLowerCase().includes(texto.toLowerCase()));


// === ORDENAR ===
//puro devuelve copia ordenada
export const ordenarPorFecha = (lista: readonly Tarea[]) =>
[...lista].sort((a, b) => a.fechaCreacion.getTime() - b.fechaCreacion.getTime());

//pura
export const ordenarPorDificultad = (lista: readonly Tarea[])=>
[...lista].sort((a, b) => a.dificultad.localeCompare(b.dificultad));


export const ordenarPorEstado = (lista: readonly Tarea[]) =>
    [...lista].sort((a, b) => a.estado.localeCompare(b.estado));


// === ACTUALIZAR TAREA INMUTABLE ===
export const actualizarTarea = (
    lista: readonly Tarea[],
    titulo: string,
    cambios: Partial<Tarea>
): Tarea[] =>
    lista.map(t =>
        t.titulo === titulo
        ? Object.freeze({
            ...t,
            ...cambios,
            ultimaEdicion: new Date()
        })
        :t
    );


    // === COMPOSICION DE FUNCIONES ===
    // pura 
export const pipe =
    <T>(...fns: Array<(x: T) => T>) =>
    (valor: T): T =>
        fns.reduce((acc, fn) => fn(acc), valor);

    // pipe: permite encadenar varias funciones mas clara de leer
