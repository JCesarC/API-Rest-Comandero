import { Router } from "express";
import CartController from '../controller/CartController';


const router = Router();

router.post('/', CartController.find);

router.patch('/:id', CartController.deleteProducto);


export default router;