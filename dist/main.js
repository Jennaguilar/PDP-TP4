"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// main.ts
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
const models_1 = require("./models");
const utilsPersistencia_1 = require("./utilsPersistencia");
const puras_1 = require("./puras");
const utils_1 = require("./utils");
const puras_2 = require("./puras");
// === Lista INMUTABLE ===
let listaTareas = (0, utilsPersistencia_1.cargar)();
function menu() {
    let opcion;
    // === MENU PRINCIPAL === 
    do {
        console.log(" \n======== MENU TO DO LIST ========");
        console.log("[1] Crear tarea");
        console.log("[2] Ver tareas");
        console.log("[3] Filtrar por estado");
        console.log("[4] Filtrar por titulo");
        console.log("[5] Ordenar por fecha");
        console.log("[6] Ordenar por dificultad");
        console.log("[7] Actualizar tarea");
        console.log("[8] Filtrar + Ordenar(pipe)");
        console.log("[9] Ordenar por estado");
        console.log("[0] Salir del menu");
        opcion = prompt("Elige una opcion: ");
        switch (opcion) {
            case "1":
                const titulo = prompt("Titulo: ");
                const descripcion = prompt("Descripción: ");
                const difInput = prompt("Dificultad [Facil-Medio-Dificil]: ")
                    .trim()
                    .toLowerCase();
                let dificultad;
                if (difInput === "facil")
                    dificultad = "Facil";
                else if (difInput === "medio")
                    dificultad = "Medio";
                else if (difInput === "dificil")
                    dificultad = "Dificil";
                else {
                    dificultad = "Medio";
                }
                const venc = prompt("Vencimiento (AAAA-MM-DD) o vacío: ");
                const fechaVenc = venc ? new Date(venc) : undefined;
                const nuevaTarea = (0, models_1.crearTarea)(titulo, descripcion, dificultad);
                listaTareas = (0, puras_1.agregarTarea)(listaTareas, nuevaTarea);
                (0, utilsPersistencia_1.guardar)(listaTareas);
                console.log("Tarea agregada correctamente!☻");
                break;
            case "2":
                (0, utils_1.impLista)(listaTareas);
                break;
            case "3":
                let estado;
                const estInput = prompt("Estado [Pendiente-En Curso-Terminada-Cancelada]: ")
                    .trim()
                    .toLowerCase();
                if (estInput === "pendiente")
                    estado = "Pendiente";
                else if (estInput === "en curso")
                    estado = "En Curso";
                else if (estInput === "terminada")
                    estado = "Terminada";
                else if (estInput === "cancelada")
                    estado = "Cancelada";
                else
                    estado = "Pendiente";
                break;
            case "4":
                const txt = prompt("Texto del titulo: ");
                (0, utils_1.impLista)((0, puras_1.filtrarTitulo)(txt)(listaTareas));
                break;
            case "5":
                (0, utils_1.impLista)((0, puras_1.ordenarPorFecha)(listaTareas));
                break;
            case "6":
                (0, utils_1.impLista)((0, puras_1.ordenarPorDificultad)(listaTareas));
                break;
            case "7":
                const t = prompt("Titulo de la tarea en actualizar: ");
                const nuevoEstado = prompt("Nuevo Estado de tarea: ");
                listaTareas = (0, puras_1.actualizarTarea)(listaTareas, t, { estado: nuevoEstado });
                (0, utilsPersistencia_1.guardar)(listaTareas);
                console.log("Tarea Actualizada.");
                break;
            case "8":
                const criterio = prompt("Texto del título para filtrar y ordenar por fecha: ");
                const procesar = (0, puras_1.pipe)((0, puras_1.filtrarTitulo)(criterio), puras_1.ordenarPorFecha);
                (0, utils_1.impLista)(procesar(listaTareas));
                break;
            case "9":
                (0, utils_1.impLista)((0, puras_2.ordenarPorEstado)(listaTareas));
                break;
            case "0":
                return;
            default:
                console.log("Opcion Invalida, vuelve a intentar!");
        }
    } while (opcion !== "0");
}
menu();
