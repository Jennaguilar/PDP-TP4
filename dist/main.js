"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// main.ts
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
const models_1 = require("./models");
const puras_1 = require("./puras");
const utils_1 = require("./utils");
// === Lista INMUTABLE ===
let listaTareas = [];
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
                const nuevaTarea = (0, models_1.crearTarea)(titulo, descripcion, dificultad);
                listaTareas = (0, puras_1.agregarTarea)(listaTareas, nuevaTarea);
                console.log("Tarea agregada correctamente!☻");
                break;
            case "2":
                (0, utils_1.impLista)(listaTareas);
                break;
            case "3":
                const est = prompt("Estado: [ Penndiente | En Curso | Terminada | Cancelada ]: ");
                (0, utils_1.impLista)((0, puras_1.filtrarEstados)(est)(listaTareas));
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
                console.log("Tarea Actualizada.");
                break;
            case "0":
                return;
            default:
                console.log("Opcion Invalida, vuelve a intentar!");
        }
    } while (opcion !== "0");
}
menu();
