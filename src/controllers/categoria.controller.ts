import { error } from "console";
import {prisma} from "../prisma.js"

// Crear una Categoria
export const crearCategoria = async (req, res) => {
  try {
    const categoria = await prisma.categoria.create({
      data: req.body,
    });

    res.status(200).json({
      message: "Categoria creado con éxito",
      data: categoria,
      error: false,
    });
  } catch (error) {
    console.error("Error en crearCategoria", error);
    res.status(500).json({
      message: "Error al crear la categoria",
      error: true,
      details: error.message,
    });
  }
}

const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany();
    res.status(200).json({
      message: "categorias obtenidos con éxito",
      data: categorias,
      error: false,
    });
  } catch (error) {
    console.error("Error en obtenerCategorias:", error);
    res.status(500).json({
      message: "Error al obtener las Categorias",
      error: true,
      details: error.message,
    });
  }
}

const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoriaEliminada = await prisma.categoria.delete({
      where: { id: parseInt(id) },
    });
    if (!categoriaEliminada) {
      return res.status(404).json({
        message: "Categoria no encontrada",
        error: true,
      });
    }
    res.status(200).json({
      message: "Categoria eliminada con éxito",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la categoria",
      error: true,
      details: error.message,
    });
  }
}

export default {crearCategoria, obtenerCategorias, eliminarCategoria};