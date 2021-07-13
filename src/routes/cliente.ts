import { Router } from "express";
import { ClienteController } from '../controller/ClienteController';

const router = Router();

//Get all categories
router.get('/', ClienteController.getAll);
//get one Category
router.get('/:id', ClienteController.getById);
//Create a new Category
router.post('/', ClienteController.newCliente);
//Editar Categoria
router.patch('/:id', ClienteController.editCliente);
//Delete Category
router.delete('/:id', ClienteController.deleteCliente);

export default router;
