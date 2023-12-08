import { UserRole } from "../entities/role"

export class UpdateUserDto {

    username?: string
    mobile?: string
    password?: string
    avatar?: string
    role?: UserRole
}