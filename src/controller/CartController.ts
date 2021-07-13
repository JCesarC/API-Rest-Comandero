import { validate } from "class-validator";
import { Request, response, Response } from "express";
import { getRepository } from "typeorm";
import { Carrito } from "../entity/Carrito";
import { Cliente } from "../entity/Cliente";
import { Producto } from "../entity/Producto";


class CartController{
    static find = async(req:Request, res:Response)=>{

      const {clienteId, mesa} = req.body;
        if(!(clienteId && mesa)){
          res.status(400).json({message:'Cliente Id y mesa son requeridos'});
        }
  
      const cartRepository = getRepository(Carrito);
      const clienteRepository = getRepository(Cliente);
      const carrito = new Carrito();
      

      try{
        const cart = await cartRepository.findOneOrFail({where:{clienteId}});
        res.send(cart);
      }catch(e){
        try{
          const cliente = await clienteRepository.findOneOrFail(clienteId);
          carrito.clienteId = clienteId;
          carrito.nombre_cliente = cliente.nombre;
          carrito.productos_id = "";
          carrito.productos = "";
          carrito.cantidad_productos = "";
          carrito.subtotal = "";
          carrito.total = 0;
          
          const errors = await validate(carrito);
          if(errors.length > 0){
            return res.status(400).json(errors);
          }

          await cartRepository.save(carrito);

          res.send(carrito);
        }catch(e){
          return res.status(409).json({message:'Algo ha salido mal'})
        }
      }
    //     const {clienteId, mesa, productos_id, cantidad_productos, subtotal} = req.body;

    //     if(!(clienteId && mesa)){
    //         res.status(400).json({message:'UsuarioId y mesa requeridos'});

    //     }

    //     const cartNuevo = new Carrito;
    //     let cart:Carrito;
    //     const cartRepository = getRepository(Carrito);
    //     const clienteRepository = getRepository(Cliente);


        

    //     try {
    //       cart = await cartRepository.findOneOrFail({
    //         where: {
    //           clienteId
    //         }
    //       });

    //       res.send(cart);
    //     } catch (e) {

    //       try {

    //         // let arrayProductos = productos_id.split(',');
    //         // arrayProductos = arrayProductos.map(x => parseInt(x));




    //         // let arrayCantidad = cantidad_productos.split(',');
    //         // arrayCantidad = arrayCantidad.map(x => parseInt(x));


    //         // var nombresProductos = [];
    //         // var subt = [];
    //         // let total = 0;

    //         // const productoRepository = getRepository(Producto);
    //         // let producto;
    //         // let precio;
    //         // let sub;

    //         // try {
    //         //   for (let i = 0; i < arrayProductos.length; i++) {
    //         //     producto = await productoRepository.findOneOrFail(arrayProductos[i]);
    //         //     nombresProductos.push(producto.descripcion);
    //         //     precio = producto.precio;
    //         //     sub = precio * arrayCantidad[i];
    //         //     total = total + sub;
    //         //     subt.push("" + sub);
    //         //   }
    //         // } catch (e) {
    //         //   return res.status(404).json({
    //         //     message: 'Productos no encontrados'
    //         //   });
    //         // }
    //         const cliente = await clienteRepository.findOneOrFail(clienteId);
    //         cartNuevo.clienteId = clienteId;
    //         cartNuevo.nombre_cliente = cliente.nombre;
    //         cartNuevo.productos_id = "";
    //         cartNuevo.productos = "";
    //         cartNuevo.subtotal = "";
    //         cartNuevo.cantidad_productos = "";

    //         //cartNuevo.cantidad_productos = cantidad_productos;

    //         await cartRepository.save(cartNuevo);

    //         res.json({message:'OK', clienteId:cartNuevo.clienteId, nombre_cliente:cartNuevo.nombre_cliente, 
    //         productos_id:cartNuevo.productos_id, productos:cartNuevo.productos, cantidad_productos:cartNuevo.cantidad_productos,
    //         subtotal:cartNuevo.subtotal
    //         });

    //       } catch (e) {
    //         return res.status(400).json({
    //           message: 'Algo salio mal'
    //         })
    //       }
    

            
    //     }

    // //     res.json({message:'OK', id:cart.id, clienteId:cart.clienteId, nombre_cliente:cart.nombre_cliente,
    // //     productos_id:cart.productos_id, cantidad_productos:cart.cantidad_productos
    // // })
    //       res.send(cartNuevo);
    }

    static deleteProducto = async(req:Request, res:Response)=>{
      let carrito;
      const {id} = req.params;
      const {clienteId, nombre_cliente, productos_id, cantidad_productos, total, subtotal, productos} = req.body;

      const carritoRepository = getRepository(Carrito);
      try{
        carrito = await carritoRepository.findOneOrFail(id);
        carrito.clienteId = clienteId;
        carrito.nombre_cliente = nombre_cliente;
        carrito.productos_id = productos_id;
        carrito.cantidad_productos = cantidad_productos;
        carrito.total =total;
        carrito.subtotal = subtotal;
        carrito.productos = productos;

        await carritoRepository.save(carrito);

      }catch(e){
        return res.status(404).json({message:'carrito no encontrado'});
      }
      res.status(201).json({message:'El carrito ha sido actualizado'})
    }
}
export default CartController;