import { Router } from "express";
import {OrdenController} from '../controller/OrdenController';
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

//Get all orden
router.get('/', [checkJwt, checkRole(['admin'])], OrdenController.getAll);
//get one orden
router.get('/:id',[checkJwt, checkRole(['admin'])], OrdenController.getById);
//Create a new orden
router.post('/', OrdenController.newOrden);
//Editar orden
router.patch('/:id',[checkJwt, checkRole(['admin'])], OrdenController.editOrden);
//Delete orden
router.delete('/:id',[checkJwt, checkRole(['admin'])], OrdenController.deleteOrden);

export default router;
