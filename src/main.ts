// main.ts
import promptSync from "prompt-sync";
const prompt = promptSync();

import { crearTarea, Tarea, Estado, Dificultad } from "./models";
import { guardar, cargar } from "./utilsPersistencia";
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
import { ordenarPorEstado } from "./puras";





// === Lista INMUTABLE ===
let listaTareas: Tarea[] = cargar();


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

                let dificultad: Dificultad;
                if (difInput === "facil") dificultad = "Facil";
                    else if (difInput === "medio") dificultad = "Medio";
                    else if (difInput === "dificil") dificultad = "Dificil";
                    else {
                        dificultad = "Medio";}
            
            const venc = prompt("Vencimiento (AAAA-MM-DD) o vacío: ");
            const fechaVenc = venc ? new Date(venc) : undefined;
            const nuevaTarea = crearTarea(titulo, descripcion, dificultad);
            listaTareas = agregarTarea(listaTareas, nuevaTarea);
            guardar(listaTareas);
            console.log("Tarea agregada correctamente!☻");
            break;

            case "2":
                impLista(listaTareas);
            break;

            case "3":
               let estado: Estado;
                 const estInput = prompt("Estado [Pendiente-En Curso-Terminada-Cancelada]: ")
                        .trim()
                        .toLowerCase();

                    if (estInput === "pendiente") estado = "Pendiente";
                    else if (estInput === "en curso") estado = "En Curso";
                    else if (estInput === "terminada") estado = "Terminada";
                    else if (estInput === "cancelada") estado = "Cancelada";
                    else estado = "Pendiente";

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
                guardar(listaTareas); 
                console.log("Tarea Actualizada.");
            break;

            case "8":
                const criterio = prompt("Texto del título para filtrar y ordenar por fecha: ");
    
                const procesar = pipe(
                    filtrarTitulo(criterio),
                    ordenarPorFecha
                );

                impLista(procesar(listaTareas));
                break;

            case "9":
            impLista(ordenarPorEstado(listaTareas));
            break;

            case "0":
                return;
            
                default:
                    console.log("Opcion Invalida, vuelve a intentar!");
    }

} while (opcion !== "0");

}

menu();