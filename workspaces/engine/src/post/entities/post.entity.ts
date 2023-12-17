import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Language } from "./language"

@Entity()
export class Post {

    @PrimaryGeneratedColumn('uuid')
    mark: string

    @Column()
    title: string

    @Column('text')
    content: string

    @Column()
    posted_date: Date

    @Column()
    admin: string

    @Column({ nullable: true })
    thumbnail: string

    @Column({
        type: 'enum',
        enum: Language
    })
    language: Language

    @Column()
    base_category: number

    @Column({ nullable: true })
    mid_category: number

    @Column({ nullable: true })
    sub_category: number

    @CreateDateColumn()
    actual_posted_date: Date

    @UpdateDateColumn()
    updated_date: Date
}
