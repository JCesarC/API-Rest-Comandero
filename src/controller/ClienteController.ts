import { getRepository } from "typeorm";
import { Request, Response } from "express";
import {Cliente} from '../entity/Cliente';
import { validate } from "class-validator";

export class ClienteController{
    //
    static getAll = async (req:Request, res:Response)=>{
        const clienteRepository = getRepository(Cliente);
        const clientes = await clienteRepository.find();

        if(clientes.length>0){
            res.send(clientes);
        }else{
            res.status(404).json({message:'Not result'});  
        }
    };

    static getById = async (req:Request, res:Response)=>{
        const {id} = req.params;
        const clienteRepository = getRepository(Cliente);

        try{
            const cliente = await clienteRepository.findOneOrFail(id);
            res.send(cliente);
        }catch(e){
            res.status(404).json({message:'Not result by Id'});
        }
    };

    static newCliente = async (req:Request, res:Response)=>{
        const {nombre, mesa } = req.body;
        const cliente = new Cliente();
        
        
        cliente.nombre= nombre;
        cliente.mesa = mesa;
        cliente.username = nombre.split(' ')[0];

        const errors = await validate(cliente);
        if(errors.length > 0){
            return res.status(400).json(errors);
            
        }
        const clienteRepository = getRepository(Cliente);
        try{
            await clienteRepository.save(cliente);
        }catch(e){
            return res.status(409).json({message:'Cliente ya existe'})
        }

        res.send('cliente creado');
    };

    static editCliente = async(req:Request, res:Response)=>{
        let cliente;
        const {id} = req.params;
        const {nombre, username, mesa} =req.body

        const clienteRepository = getRepository(Cliente);

        //try get cliente

        try{
            cliente = await clienteRepository.findOneOrFail(id);
            
            cliente.nombre = nombre;
            cliente.username = username;
            cliente.mesa = mesa;
        }catch(e){
            return res.status(404).json({message:'Cliente no encontrado'});
        }


        const errors = await validate(cliente);

        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        //try to save cliente

        try{
            await clienteRepository.save(cliente);
        }catch(e){
            return res.status(409).json({message:'Cliente en uso'});
        }
        res.status(201).json({message:'Cliente Actualizado'})
    };

    static deleteCliente = async(req:Request, res:Response) =>{
        const {id} = req.params;
        const clienteRepository = getRepository(Cliente);
        
        let cliente:Cliente;

        try{
            cliente = await clienteRepository.findOneOrFail(id);
        }catch(e){
            return res.status(404).json({message:'Cliente no encontrado'});
        }

        //Remove

        clienteRepository.delete(id);
        res.status(201).json({message:'Cliente eliminado'});
    };
}
export default ClienteController;

