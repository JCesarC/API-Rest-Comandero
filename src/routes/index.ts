import { Router } from "express";

import auth from './auth';
import user from './user';
import categoria from './categoria';
import producto from './producto';
import cliente from './cliente';
import carrito from './carrito';
import orden from './orden';
import signup from './signup';
import cart from './cart';
import neworden from './ordenusuario';


const routes = Router();

routes.use('/auth', auth);
routes.use('/signup', signup);
routes.use('/users', user);
routes.use('/categorias', categoria );
routes.use('/productos', producto );
routes.use('/clientes', cliente );
routes.use('/carritos', carrito );
routes.use('/ordenes', orden );
routes.use('/cart', cart);
routes.use('/nuevaorden', neworden);


export default routes;