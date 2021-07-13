import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Cliente } from "./Cliente";

@Entity()
export class Carrito{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    clienteId:number;

    @OneToOne(type=>Cliente)
    @JoinColumn()
    cliente:Cliente;

    @Column()
    nombre_cliente:string;
    
    @Column()
    productos_id:string;

    @Column()
    productos:string;

    @Column()
    cantidad_productos:string;

    // @ManyToOne(() => Cliente, cliente => cliente.nombre)
    // cliente: Cliente;
    @Column()
    subtotal: string;


    @Column()
    total: number;

    @Column()
    @CreateDateColumn()
    creadedAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;
}
