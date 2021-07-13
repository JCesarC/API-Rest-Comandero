import { getRepository } from "typeorm";
import { Request, Response } from "express";

import {Orden } from '../entity/Orden';
import { Cliente } from "../entity/Cliente";
import { validate } from "class-validator";
import { Producto } from "../entity/Producto";

export class OrdenController{
    static getAll = async (req:Request, res:Response)=>{
        const ordenRepository = getRepository(Orden);
        const orden = await ordenRepository.find();
        

        if(orden.length>0){
            res.send(orden);
        }else{
            res.status(404).json({message:'No hay resultado para ordenes'});  
        }
    };

    static getById = async (req:Request, res:Response)=>{
        const {id} = req.params;
        const ordenRepository = getRepository(Orden);

        try{
            const orden = await ordenRepository.findOneOrFail(id);
            res.send(orden);
        }catch(e){
            res.status(404).json({message:'Not result by Id'});
        }
    };

    static newOrden = async (req:Request, res:Response)=>{
        const {clienteId, productos, cantidad_productos} = req.body;
        const estado = "PENDIENTE";
        let arrayProductos = productos.split(',');
        arrayProductos = arrayProductos.map(x=>parseInt(x));


        // let arrayCantidad = parseInt(cantidad_productos.split(","));
        let arrayCantidad = cantidad_productos.split(',');
        arrayCantidad = arrayCantidad.map(x=>parseInt(x));


        var nombresProductos = [];
        var subtotal = [];
        let total = 0;

        // const productoRepository = getRepository(Cliente)
        let i =0;
        console.log("Array Productps ->"+arrayProductos);
        // let product;
        const productoRepository = getRepository(Producto);
        let producto;
        let precio;
        let sub;
        try{
            for(i;i<arrayProductos.length;i++){
                producto = await productoRepository.findOneOrFail(arrayProductos[i]);
                nombresProductos.push(""+producto.descripcion);
                precio = producto.precio;
                sub = precio*arrayCantidad[i];
                total = total + sub;
                subtotal.push(""+sub);
            }
            

            // 
            // let precio = product.precio;
            // let sub = precio*arrayCantidad[i];
            // total = total + sub;
            // subtotal.push(""+sub);
            // i++;

            //res.send({message:"Producto se encontro"});
        }catch(e){
            return res.status(404).json({message:'Orden  no encontrada'});
        }

        

         const orden = new Orden();

         const clienteRepository = getRepository(Cliente);
         try{
             const cliente = await clienteRepository.findOneOrFail(clienteId);

             orden.clienteId = clienteId;
             orden.nombre_cliente = cliente.nombre;
             orden.productos = nombresProductos.toString();
             orden.cantidad_productos = cantidad_productos;
             orden.subtotal_productos = subtotal.toString();
             orden.total = total;
             orden.estado = estado;


         }catch(e){
             return res.status(409).json({message:'Cliente  no existe'});
         }

         const errors = await validate(orden);
         if(errors.length > 0){
             return res.status(400).json(errors);
            
         }
         const ordenRepository = getRepository(Orden);
         try{
             await ordenRepository.save(orden);
         }catch(e){
             return res.status(409).json({message:'Orden ya existe o algo ha salido mal'})
         }

         res.send('Orden creada');
    };

    static editOrden = async(req:Request, res:Response)=>{
        let orden;
        const {id} = req.params;
        const {clienteId, productos, cantidad_productos, total, estado} = req.body

        const ordenRepository = getRepository(Orden);
        const clienteRepository = getRepository(Cliente);

        let cliente : Cliente;

        //try get producto

        try{
            cliente = await clienteRepository.findOneOrFail({where:{id:clienteId}});

            orden = await ordenRepository.findOneOrFail(id);

            orden.clienteId = clienteId;
            orden.nombre_cliente = cliente.nombre;
            orden.productos = productos;
            orden.cantidad_productos = cantidad_productos;
            orden.total = total;
            orden.estado = estado;
        
        
        }catch(e){
            return res.status(404).json({message:'Orden no encontrada'});
        }


        const errors = await validate(orden);

        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        //try to save cliente

        try{
            await ordenRepository.save(orden);
        }catch(e){
            return res.status(409).json({message:'Orden en uso'});
        }
        res.status(201).json({message:'Orden Actualizada'})
    };

    
    static deleteOrden = async(req:Request, res:Response) =>{
        const {id} = req.params;
        const ordenRepository = getRepository(Orden);
        
        let orden:Orden;

        try{
            orden = await ordenRepository.findOneOrFail(id);
        }catch(e){
            return res.status(404).json({message:'Orden no encontrada'});
        }

        //Remove

        ordenRepository.delete(id);
        res.status(201).json({message:'Orden eliminada'});
    };
}

export default OrdenController;