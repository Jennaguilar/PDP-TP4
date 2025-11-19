// main.ts
import promptSync from "prompt-sync";
const prompt = promptSync();

import { crearTarea, Tarea, Estado, Dificultad } from "./models";

import{
    agregarTarea,
    filtrarEstados,
    filtrarTitulo,
    ordenarPorFecha,
    ordenarPorDificultad,
    actualizarTarea,
    pipe

} from "./puras";

import { impLista } from "./utils";




// === Lista INMUTABLE ===
let listaTareas: Tarea[] = [];

function menu() {
    let opcion: string;
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

                let dificultad: Dificultad;
                if (difInput === "facil") dificultad = "Facil";
                    else if (difInput === "medio") dificultad = "Medio";
                    else if (difInput === "dificil") dificultad = "Dificil";
                    else {
                        dificultad = "Medio";
}
            const nuevaTarea = crearTarea(titulo, descripcion, dificultad);
            listaTareas = agregarTarea(listaTareas, nuevaTarea);
            console.log("Tarea agregada correctamente!☻");
            break;

            case "2":
                impLista(listaTareas);
            break;

            case "3":
                const est = prompt("Estado: [ Penndiente | En Curso | Terminada | Cancelada ]: ") as any;
                    impLista(filtrarEstados(est)(listaTareas));
            break;

            case "4":
                const txt = prompt("Texto del titulo: ");
                impLista(filtrarTitulo(txt)(listaTareas));
            break;

            case "5":
                impLista(ordenarPorFecha(listaTareas));
            break;

            case "6":
                impLista(ordenarPorDificultad(listaTareas));
            break;

            case "7":
                const t = prompt("Titulo de la tarea en actualizar: ");
                const nuevoEstado = prompt("Nuevo Estado de tarea: ") as any;
                listaTareas = actualizarTarea(listaTareas, t, {estado: nuevoEstado});
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