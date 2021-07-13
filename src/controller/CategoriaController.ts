import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Categoria} from '../entity/Categoria';
import { validate } from "class-validator";

export class CategoriaController{
    static getAll = async (req:Request, res:Response) =>{
        const categoriaRepository = getRepository(Categoria);
         let categoria;
        try{
             categoria = await categoriaRepository.find({select:['id', 'descripcion']});
   
        }catch(e){
             res.status(404).json({message:'Something goes wrong!'});
        }
        if(categoria.length>0){
             res.send(categoria);
         }else{
             res.status(404).json({message:'Not result for categories'});
         }    
    };

    static getById = async(req: Request, res:Response)=>{
        const {id} = req.params;
        const categoriaRepository = getRepository(Categoria);
        try{
             const categoria = await categoriaRepository.findOneOrFail(id);
             res.send(categoria);
        }catch(e){
             res.status(404).json({message: ' Not result by Id'});
        }
     };

     static newCategoria = async(req:Request, res:Response) =>{
        const {descripcion} = req.body;
        const categoria = new Categoria();

        categoria.descripcion = descripcion;
      
        const errors = await validate(categoria);
        if(errors.length > 0){
            return res.status(400).json(errors);
            
        }
        const categoriaRepository = getRepository(Categoria);
        try{
            await categoriaRepository.save(categoria);
        }catch(e){
            return res.status(409).json({message:'Categoria ya existe'})
        }

        res.send('Categoria creada');
    };

    static editCategoria = async(req:Request, res:Response)=>{
        let categoria;
        const {id} = req.params;
        const {descripcion} =req.body

        const categoriaRepository = getRepository(Categoria);

        //try get categoria

        try{
            categoria = await categoriaRepository.findOneOrFail(id);
            
            categoria.descripcion = descripcion;
        }catch(e){
            return res.status(404).json({message:'categoria no encontrada'});
        }


        const errors = await validate(categoria);

        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        //try to save Categoria

        try{
            await categoriaRepository.save(categoria);
        }catch(e){
            return res.status(409).json({message:'Categoria en uso'});
        }
        res.status(201).json({message:'Categoria Actualizada'})
    };

    static deleteCategoria = async(req:Request, res:Response) =>{
        const {id} = req.params;
        const categoriaRepository = getRepository(Categoria);
        
        let categoria:Categoria;

        try{
            categoria = await categoriaRepository.findOneOrFail(id);
        }catch(e){
            return res.status(404).json({message:'Categoria no encontrada'});
        }

        //Remove

        categoriaRepository.delete(id);
        res.status(201).json({message:'Categoria eliminada'});
    };
}
export default CategoriaController;