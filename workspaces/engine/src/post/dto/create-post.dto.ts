export class CreatePostDto {

    title: string
    content: string
    posted_date?: Date
    admin: string
    thumbnail?: string
    basecategory?: number
    midcategory?: number
    subcategory?: number
}
