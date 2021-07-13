import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Cliente } from "./Cliente";

@Entity()
export class Orden{
    @PrimaryGeneratedColumn()
    id:number;

    // @Column({nullable:true})
    // clienteId: number
    
    // @OneToOne(type=>Cliente)
    // @JoinColumn()
    // cliente:Cliente;

    @Column()
    clienteId: number;

    @Column()
    nombre_cliente:string;

    @Column()
    mesa:string;

    @Column()
    fecha:string;

    @Column()
    hora:string;

    @Column()
    productos:string;

    @Column()
    cantidad_productos:string;

    @Column()
    subtotal_productos:string;

    @Column()
    total: number;

    @Column()
    estado: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;
}
