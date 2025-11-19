"use strict";
//puras.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipe = exports.actualizarTarea = exports.ordenarPorDificultad = exports.ordenarPorFecha = exports.filtrarTitulo = exports.filtrarEstados = exports.agregarTarea = void 0;
//creamos una lista nueva
// agregar tareas : puro
const agregarTarea = (lista, nueva) => [...lista, nueva];
exports.agregarTarea = agregarTarea;
// === FILTRAR ===
// puro
const filtrarEstados = (estado) => (lista) => lista.filter(t => t.estado === estado);
exports.filtrarEstados = filtrarEstados;
// puro
const filtrarTitulo = (texto) => (lista) => lista.filter(t => t.titulo.toLowerCase().includes(texto.toLowerCase()));
exports.filtrarTitulo = filtrarTitulo;
// === ORDENAR ===
//puro devuelve copia ordenada
const ordenarPorFecha = (lista) => [...lista].sort((a, b) => a.fechaCreacion.getTime() - b.fechaCreacion.getTime());
exports.ordenarPorFecha = ordenarPorFecha;
//pura
const ordenarPorDificultad = (lista) => [...lista].sort((a, b) => a.dificultad.localeCompare(b.dificultad));
exports.ordenarPorDificultad = ordenarPorDificultad;
// === ACTUALIZAR TAREA INMUTABLE ===
const actualizarTarea = (lista, titulo, cambios) => lista.map(t => t.titulo === titulo
    ? Object.freeze(Object.assign(Object.assign(Object.assign({}, t), cambios), { ultimaEdicion: new Date() }))
    : t);
exports.actualizarTarea = actualizarTarea;
// === COMPOSICION DE FUNCIONES ===
// pura 
const pipe = (...fns) => (valor) => fns.reduce((acc, fn) => fn(acc), valor);
exports.pipe = pipe;
// pipe: permite encadenar varias funciones mas clara de leer
