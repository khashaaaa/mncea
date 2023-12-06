import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Subcategory {

    @PrimaryGeneratedColumn()
    mark: number

    @Column()
    name: string

    @Column()
    grandParent: number

    @Column()
    parent: number
}
