import { Router } from "express";

import { CarritoController} from '../controller/CarritoController';

const router = Router();


//Get all Carritos
router.get('/', CarritoController.getAll);
//get one carrito
router.get('/:id', CarritoController.getById);
//Create a new carrito
router.post('/', CarritoController.newCarrito);
//Editar carrito
router.patch('/:id', CarritoController.editCarrito);
//Delete carrito
router.delete('/:id', CarritoController.deleteCarrito);

export default router;