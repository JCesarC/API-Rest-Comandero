import { Router } from "express";
import { UserController } from "../controller/UserController";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

//Get Users
router.get('/', [checkJwt, checkRole(['admin'])], UserController.getAll);
//get one user
router.get('/:id',[checkJwt, checkRole(['admin'])], UserController.getById);
//Create a new User
router.post('/',[checkJwt, checkRole(['admin'])], UserController.newUser);
//Edit user
router.patch('/:id',[checkJwt, checkRole(['admin'])], UserController.editUser);
//Delete
router.delete('/:id', [checkJwt, checkRole(['admin'])],UserController.deleteUser);

export default router;