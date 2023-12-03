import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Midcategory {

    @PrimaryGeneratedColumn()
    mark: number

    @Column()
    name: string

    @Column()
    parent: number
}
