import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class Cliente{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    username:string;

    @Column()
    mesa:string;

    @Column()
    @CreateDateColumn()
    fecha_registro: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;
}
