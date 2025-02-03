import { error } from "console";
import {prisma} from "../prisma.js"

// Crear una organización
export const crearOrganizacion = async (req, res) => {
  try {
    const { eventos, ...organizacionData } = req.body;

    const organizacion = await prisma.organizacion.create({
      data: {
        ...organizacionData,
        ...(eventos?.length > 0 ? { eventos: { create: eventos } } : {}),
      },
    });

    res.status(200).json({
      message: "Organización creada con éxito",
      data: organizacion,
      error: false,
    });
  } catch (error) {
    console.error("Error en crearOrganizacion:", error);
    res.status(500).json({
      message: "Error al crear la organización",
      error: true,
      details: error.message,
    });
  }
}

export default { crearOrganizacion };