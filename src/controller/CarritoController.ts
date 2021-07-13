import { getRepository } from "typeorm";
import { Request, Response } from "express";

import {Carrito} from '../entity/Carrito';
import { Cliente } from "../entity/Cliente";
import { validate } from "class-validator";
import { Producto } from "../entity/Producto";

export class CarritoController{
    static getAll = async (req:Request, res:Response)=>{
        const carritoRepository = getRepository(Carrito);
        const carrito = await carritoRepository.find();

        if(carrito.length>0){
            res.send(carrito);
        }else{
            res.status(404).json({message:'No hay resultado para carritos'});  
        }
    };

    static getById = async (req:Request, res:Response)=>{
        const {id} = req.params;
        const carritoRepository = getRepository(Carrito);

        try{
            const carrito = await carritoRepository.findOneOrFail(id);
            res.send(carrito);
        }catch(e){
            res.status(404).json({message:'Not result by Id'});
        }
    };

    static newCarrito = async (req:Request, res:Response)=>{
        const {clienteId, productos, cantidad_productos, total} = req.body;
        
        const carrito = new Carrito();

        const clienteRepository = getRepository(Cliente);
        try{
            const cliente = await clienteRepository.findOneOrFail(clienteId);

            carrito.clienteId = clienteId;
            carrito.nombre_cliente = cliente.nombre;
            carrito.productos = productos;
            carrito.cantidad_productos = cantidad_productos;
            carrito.total = total;


        }catch(e){
            return res.status(409).json({message:'Cliente  no existe'});
        }

        const errors = await validate(carrito);
        if(errors.length > 0){
            return res.status(400).json(errors);
            
        }
        const carritoRepository = getRepository(Carrito);
        try{
            await carritoRepository.save(carrito);
        }catch(e){
            return res.status(409).json({message:'Carrito ya existe o algo ha salido mal'})
        }

        res.send('Carrito creado');
    };

    static editCarrito = async(req:Request, res:Response)=>{
        let carrito;
        const {id} = req.params;
        const {carrritoId, clienteId, productoId, cantidad_productos} =req.body

        const carritoAnterior = getRepository(Carrito);
        const productoRepository = getRepository(Producto);
        const carritoRepository = getRepository(Carrito);
        const clienteRepository = getRepository(Cliente);

        //try get producto

        try{
            const carr = await carritoAnterior.findOneOrFail(id);

            let cartProductos = carr.productos;
            let cartSubtotal = carr.subtotal;
            let cartProductosId = carr.productos_id;
            let cartCantidad = carr.cantidad_productos;
            let cartTotal = parseInt(""+carr.total);





            const productoNuevo = await productoRepository.findOneOrFail(productoId);
            let nombreP = productoNuevo.descripcion;
            let idP = productoNuevo.id;
            let precio = productoNuevo.precio;
            
            cartProductos = cartProductos+""+nombreP+",";
            cartSubtotal = cartSubtotal+""+precio+",";
            cartProductosId = cartProductosId+""+idP+",";
            cartCantidad = cartCantidad+""+1+",";
            // cartTotal = parseInt(""+precio+cartTotal);
         

            console.log("Precio->", precio);
            console.log("Total->", 60.00 + 0);
            // console.log("String Total->", stringTotal);


            const cliente = await clienteRepository.findOneOrFail(clienteId);

            carrito = await carritoRepository.findOneOrFail(id);

            carrito.clienteId = clienteId;
            carrito.nombre_cliente = cliente.nombre;
            carrito.productos = cartProductos;
            carrito.cantidad_productos = cartCantidad;
            carrito.subtotal = cartSubtotal;
            carrito.productos_id = cartProductosId;
            carrito.total = parseInt(""+cartTotal) + parseInt(""+precio);
        
        
        }catch(e){
            return res.status(404).json({message:'Carrito no encontrado'});
        }


        const errors = await validate(carrito);

        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        //try to save cliente

        try{
            await carritoRepository.save(carrito);
        }catch(e){
            return res.status(409).json({message:'Carrito en uso'});
        }
        res.status(201).json({message:'Carrito Actualizado'})
    };

    static deleteCarrito = async(req:Request, res:Response) =>{
        const {id} = req.params;
        const carritoRepository = getRepository(Carrito);
        
        let carrito:Carrito;

        try{
            carrito = await carritoRepository.findOneOrFail(id);
        }catch(e){
            return res.status(404).json({message:'Carrito no encontrado'});
        }

        //Remove

        carritoRepository.delete(id);
        res.status(201).json({message:'Carrito eliminado'});
    };
}
export default CarritoController;