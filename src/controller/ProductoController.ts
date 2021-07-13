import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Producto} from '../entity/Producto';
import { Categoria } from "../entity/Categoria";
import { validate } from "class-validator";

export class ProductoController{
    static getAll = async (req:Request, res:Response)=>{
        const productoRepository = getRepository(Producto);
        const producto = await productoRepository.find();

        if(producto.length>0){
            res.send(producto);
        }else{
            res.status(404).json({message:'No hay resultado para productos'});  
        }
    };

    static getById = async (req:Request, res:Response)=>{
        const {id} = req.params;
        const productoRepository = getRepository(Producto);

        try{
            const producto = await productoRepository.findOneOrFail(id);
            res.send(producto);
        }catch(e){
            res.status(404).json({message:'Not result by Id'});
        }
    };

    static newProducto = async (req:Request, res:Response)=>{
        const {descripcion, precio, cantidad, categoriaId} = req.body;
        const producto = new Producto();

        const categoriaRepository = getRepository(Categoria);
        try{
            const categoria = await categoriaRepository.findOneOrFail(categoriaId);
            
            producto.descripcion = descripcion;
            producto.precio = precio;
            producto.cantidad = cantidad;
            producto.categoria = categoriaId;
            producto.categoriaDescripcion = categoria.descripcion;
        }catch(e){
            return res.status(409).json({message:'Categoria no existe'});
        }

        const errors = await validate(producto);
        if(errors.length > 0){
            return res.status(400).json(errors);
            
        }
        const productoRepository = getRepository(Producto);
        try{
            await productoRepository.save(producto);
        }catch(e){
            return res.status(409).json({message:'Producto ya existe'})
        }

        res.send('producto creado');
    };

    static editProducto = async(req:Request, res:Response)=>{
        let producto;
        const {id} = req.params;
        const {descripcion, precio, cantidad, categoriaId} =req.body

        const productoRepository = getRepository(Producto);
        const categoriaRepository = getRepository(Categoria);

        //try get producto

        try{
            const categoria = await categoriaRepository.findOneOrFail(categoriaId);

            producto = await productoRepository.findOneOrFail(id);
            producto.descripcion = descripcion;
            producto.precio = precio;
            producto.cantidad = cantidad;
            producto.categoriaId = categoriaId;
            producto.categoriaDescripcion = categoria.descripcion;
        
        }catch(e){
            return res.status(404).json({message:'Producto no encontrado'});
        }


        const errors = await validate(producto);

        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        //try to save cliente

        try{
            await productoRepository.save(producto);
        }catch(e){
            return res.status(409).json({message:'Producto en uso'});
        }
        res.status(201).json({message:'Producto Actualizado'})
    };

    static deleteProducto = async(req:Request, res:Response) =>{
        const {id} = req.params;
        const productoRepository = getRepository(Producto);
        
        let producto:Producto;

        try{
            producto = await productoRepository.findOneOrFail(id);
        }catch(e){
            return res.status(404).json({message:'producto no encontrado'});
        }

        //Remove

        productoRepository.delete(id);
        res.status(201).json({message:'Producto eliminado'});
    };

}
export default ProductoController;