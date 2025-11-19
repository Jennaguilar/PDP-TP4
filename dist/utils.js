"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.impLista = void 0;
const impLista = (lista) => lista.forEach((t, i) => console.log(`\n${i + 1}. ${t.titulo} - ${t.estado} (${t.dificultad}) 
            \nCreada : ${t.fechaCreacion}
            \nUltima edicion: ${t.ultimaEdicion.toISOString}
            \nVence: ${t.vencimiento ? t.vencimiento.toISOString() : "Sin fecha"}
            \nDescripcion: ${t.descripcion}\n `
//El uso de to.ISOString para una fecha legible
));
exports.impLista = impLista;
