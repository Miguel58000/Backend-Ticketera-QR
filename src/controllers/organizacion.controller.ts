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

const obtenerOrganizaciones = async (req, res) => {
  try {
    const organizaciones = await prisma.organizacion.findMany();
    res.status(200).json({
      message: "Organizaciones obtenidas con éxito",
      data: organizaciones,
      error: false,
    });
  } catch (error) {
    console.error("Error en obtenerOrganizaciones:", error);
    res.status(500).json({
      message: "Error al obtener las organizaciones",
      error: true,
      details: error.message,
    });
  }
}

const obtenerOrganizacionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const organizacion = await prisma.organizacion.findUnique({
      where: { idOrganizacion: parseInt(id) },
    });

    if (!organizacion) {
      return res.status(404).json({
        message: "Organización no encontrada",
        error: true,
      });
    }

    res.status(200).json({
      message: "Organización obtenida con éxito",
      data: organizacion,
      error: false,
    });
  }catch (error) {
    res.status(500).json({
      message: "Error al obtener la organización",
      error: true,
      details: error.message,
    });
  }
}
const eliminarOrganizacion = async (req, res) => {
  try {
    const { id } = req.params;
    const organizacionEliminada = await prisma.organizacion.delete({
      where: { idOrganizacion: parseInt(id) },
    });
    if (!organizacionEliminada) {
      return res.status(404).json({
        message: "Organización no encontrada",
        error: true,
      });
    }
    res.status(200).json({
      message: "Organización eliminada con éxito",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la organización",
      error: true,
      details: error.message,
    });
  }
}

const actualizarOrganizacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { eventos, ...organizacionData } = req.body;

    const organizacionActualizada = await prisma.organizacion.update({
      where: { idOrganizacion: parseInt(id) },
      data: {
        ...organizacionData,
        ...(eventos?.length > 0 ? { eventos: { create: eventos } } : {}),
      },
    });

    res.status(200).json({
      message: "Organización actualizada con éxito",
      data: organizacionActualizada,
      error: false,
    });
  }catch (error) { 
    res.status(500).json({
      message: "Error al actualizar la organización",
      error: true,
      details: error.message,
    });
  }
}
export default { crearOrganizacion, obtenerOrganizaciones, obtenerOrganizacionPorId, eliminarOrganizacion, actualizarOrganizacion };