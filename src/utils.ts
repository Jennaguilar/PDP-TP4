// utils.ts
import { Tarea } from "./models";

export const impLista = (lista: readonly Tarea[]) =>
    lista.forEach((t, i) =>
    console.log(
        `\n${i+1}. ${t.titulo} - ${t.estado} (${t.dificultad}) 
            \nCreada : ${t.fechaCreacion}
            \nUltima edicion: ${t.ultimaEdicion.toISOString()}
            \nVence: ${t.vencimiento ? t.vencimiento.toISOString() : "Sin fecha"}
            \nDescripcion: ${t.descripcion}\n `
                 
        //El uso de to.ISOString para una fecha legible
    ));

