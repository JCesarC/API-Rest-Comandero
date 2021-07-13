import { Router } from "express";
import { CategoriaController } from '../controller/CategoriaController';

const router = Router();

//Get all categories
router.get('/', CategoriaController.getAll);
//get one Category
router.get('/:id', CategoriaController.getById);
//Create a new Category
router.post('/', CategoriaController.newCategoria);
//Editar Categoria
router.patch('/:id', CategoriaController.editCategoria);
//Delete Category
router.delete('/:id', CategoriaController.deleteCategoria);

export default router;
