import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['descripcion'])
export class Categoria{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    descripcion:string;

}



