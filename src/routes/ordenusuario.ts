import { Router } from "express";
import {OrdenUsuarioController  } from ".././controller/OrdenUsuarioController";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

//Get all orden

//Create a new orden
router.post('/', OrdenUsuarioController.newOrden);
//Editar orden


export default router;
