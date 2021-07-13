import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Cliente } from "../entity/Cliente";

import * as jwt from 'jsonwebtoken';
import config from "../config/config";

export class SignupController{
    static signup = async(req: Request, res:Response) =>{
        const {nombre, mesa} = req.body;
        
        let username = nombre.split(' ')[0];

        if( !(nombre && mesa)){
            res.status(400).json({message:'Usuario y mesa son requeridos!'});
        }

        const userRepository = getRepository(Cliente);
        let cliente: Cliente;
        const clienteNuevo = new Cliente();
        let token: any;

        
        try{
            cliente = await userRepository.findOneOrFail({where:{nombre}});

            cliente.mesa = mesa;

            //Updating cliente
            await userRepository.save(cliente);
            //res con el token
            //res.send(cliente);
            token = jwt.sign({clienteId:cliente.id, username:cliente.username, nombre:cliente.nombre, mesa:cliente.mesa}, config.jwtSecret, {expiresIn:'1h'});
            res.json({message:'OK', token, clienteId:cliente.id, nombre:cliente.nombre, mesa:cliente.mesa})
        }catch(e){
            clienteNuevo.nombre = nombre;
            clienteNuevo.username = username;
            clienteNuevo.mesa = mesa;

            try{
                await userRepository.save(clienteNuevo);
                token = jwt.sign({clienteId:clienteNuevo.id, username:clienteNuevo.username, nombre:clienteNuevo.nombre, mesa:clienteNuevo.mesa}, config.jwtSecret, {expiresIn:'1h'});
                res.json({message:'OK', token, clienteId:clienteNuevo.id, nombre:clienteNuevo.nombre, mesa:clienteNuevo.mesa})
            }catch(e){
                return res.status(400).json({message:'ALgo ha salido mal con el nuevo cliente'});
            }  
        }
        //res.send(cliente);

    };


}
export default SignupController