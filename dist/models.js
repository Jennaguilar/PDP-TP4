"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearTarea = void 0;
// Tareas Inmutables
const crearTarea = (titulo, descripcion = "", dificultad = "Facil", vencimiento) => Object.freeze({
    titulo,
    descripcion,
    estado: "Pendiente",
    dificultad,
    fechaCreacion: new Date(),
    ultimaEdicion: new Date(),
    vencimiento
});
exports.crearTarea = crearTarea;
