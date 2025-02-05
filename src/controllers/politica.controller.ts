import { error } from "console";
import {prisma} from "../prisma.js"

// Crear ua Politica
export const crearPolitica = async (req, res) => {
  try {
    const politica = await prisma.politica.create({
      data: req.body,
    });

    res.status(200).json({
      message: "Politica creado con éxito",
      data: politica,
      error: false,
    });
  } catch (error) {
    console.error("Error en crearPolitica", error);
    res.status(500).json({
      message: "Error al crear la politica",
      error: true,
      details: error.message,
    });
  }
}

//Obtener Politicas existentes
const obtenerPoliticas = async (req, res) => {
  try {
    const politicas = await prisma.politica.findMany();
    res.status(200).json({
      message: "Politicas obtenidos con éxito",
      data: politicas,
      error: false,
    });
  } catch (error) {
    console.error("Error en obtenerPoliticas:", error);
    res.status(500).json({
      message: "Error al obtener las Politicas",
      error: true,
      details: error.message,
    });
  }
}

export default {crearPolitica, obtenerPoliticas};