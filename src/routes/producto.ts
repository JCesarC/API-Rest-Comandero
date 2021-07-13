import { Router } from "express";
import {ProductoController} from '../controller/ProductoController';

const router = Router();

//Get all productos
router.get('/', ProductoController.getAll);
//get one producto
router.get('/:id', ProductoController.getById);
//Create a new producto
router.post('/', ProductoController.newProducto);
//Editar producto
router.patch('/:id', ProductoController.editProducto);
//Delete producto
router.delete('/:id', ProductoController.deleteProducto);

export default router;

