// utilsPersistencia
import fs from "fs";
import { Tarea } from "./models";

export const guardar = (lista: readonly Tarea[]) =>
    fs.writeFileSync("tareas.json", JSON.stringify(lista, null, 2));

export const cargar = (): Tarea[] => {
    try {
        const data = fs.readFileSync("tareas.json", "utf8");
        const raw = JSON.parse(data);

        // Reconstruir fechas
        return raw.map((t: any) => ({
            ...t,
            fechaCreacion: new Date(t.fechaCreacion),
            ultimaEdicion: new Date(t.ultimaEdicion),
            vencimiento: t.vencimiento ? new Date(t.vencimiento) : undefined
        }));
    } catch {
        return [];
    }
};