import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Partnership {

    @PrimaryGeneratedColumn('uuid')
    mark: string

    @Column()
    name: string

    @Column()
    logo: string

    @Column()
    website: string

    @CreateDateColumn()
    created: Date
}
