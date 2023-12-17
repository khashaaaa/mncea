import { Language } from "../entities/language"

export class CreatePostDto {

    title: string
    content: string
    posted_date?: Date
    admin: string
    thumbnail?: string
    language: Language
    base_category?: number
    mid_category?: number
    sub_category?: number
}
