import { error } from "console";
import {prisma} from "../prisma.js"
import { Request, Response } from "express";

// Crear un Evento
export const crearEvento = async (req:Request, res:Response) => {
  try {
    const {
      nombre,
      fechaCreacion,
      fechaHoraEvento,
      capacidadMax,
      descripcion,
      idCategoria,
      idOrganizacion
    } = req.body
    const evento = await prisma.evento.create({
      data: {
        nombre,
        fechaCreacion,
        fechaHoraEvento,
        capacidadMax,
        descripcion,
        categoria:{
          connect: {
            id: idCategoria
          }
        },
        organizacion:{
          connect: {
            idOrganizacion: idOrganizacion
          }
        }
      }
    });
    res.status(200).json({
      message: "Evento creado con éxito",
      data: evento,
      error: false,
    });
  } catch (error) {
    console.error("Error en crearEvento", error);
    res.status(500).json({
      message: "Error al crear el evento",
      error: true,
      details: (error as Error).message,
    });
  }
}

export default {crearEvento};