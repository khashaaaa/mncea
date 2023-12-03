import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

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

    @Column()
    thumbnail: string

    @Column()
    basecategory: number

    @Column()
    midcategory: number

    @Column()
    subcategory: number

    @CreateDateColumn()
    actual_posted_date: Date

    @UpdateDateColumn()
    updated_date: Date
}
