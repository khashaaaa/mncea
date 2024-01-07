import { CompliantType } from "src/enum/compliant-type"
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm"

export class Compliant {

    @PrimaryGeneratedColumn()
    mark: number

    @Column()
    user: string

    @Column()
    email: string

    @Column()
    mobile: string

    @Column({
        type: 'enum',
        enum: CompliantType
    })
    type: CompliantType

    @Column()
    statement: string

    @CreateDateColumn()
    created: Date
}