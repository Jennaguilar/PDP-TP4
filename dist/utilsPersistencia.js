"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cargar = exports.guardar = void 0;
// utilsPersistencia
const fs_1 = __importDefault(require("fs"));
const guardar = (lista) => fs_1.default.writeFileSync("tareas.json", JSON.stringify(lista, null, 2));
exports.guardar = guardar;
const cargar = () => {
    try {
        const data = fs_1.default.readFileSync("tareas.json", "utf8");
        const raw = JSON.parse(data);
        // Reconstruir fechas
        return raw.map((t) => (Object.assign(Object.assign({}, t), { fechaCreacion: new Date(t.fechaCreacion), ultimaEdicion: new Date(t.ultimaEdicion), vencimiento: t.vencimiento ? new Date(t.vencimiento) : undefined })));
    }
    catch (_a) {
        return [];
    }
};
exports.cargar = cargar;
