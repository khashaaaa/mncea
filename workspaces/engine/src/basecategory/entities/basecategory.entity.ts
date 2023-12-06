import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Basecategory {

    @PrimaryGeneratedColumn()
    mark: number

    @Column()
    name: string
}
