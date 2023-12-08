import { UserRole } from "../entities/role"

export class CreateUserDto {

    username: string
    mobile?: string
    avatar?: string
    password: string
    role?: UserRole
}
