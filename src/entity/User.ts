import {Entity, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, Column} from "typeorm";
import { MinLength, IsNotEmpty } from "class-validator";
import * as bycrypt from 'bcryptjs';

//TODO isEmail

@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(6)
    username: string;

    @Column()
    @MinLength(6)
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;

    hashPassword():void{
        const salt = bycrypt.genSaltSync(10);
        this.password = bycrypt.hashSync(this.password, salt);

    }

    checkPassword(password: string):boolean{
        return bycrypt.compareSync(password, this.password);
    }


    
    
}
