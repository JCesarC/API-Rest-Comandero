import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Categoria } from "./Categoria";

@Entity()
@Unique(['descripcion'])
export class Producto{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    descripcion: string;

    @ManyToOne(() =>Categoria, categoria => categoria.id)
    categoria:Categoria;

    @Column()
    categoriaDescripcion:string;
    // @ManyToOne(() => Categoria, categoria => categoria.descripcion)
    // categoria: Categoria;

    @Column("decimal", { precision:5, scale:2})
    precio:number;

    @Column()
    cantidad: number;

}