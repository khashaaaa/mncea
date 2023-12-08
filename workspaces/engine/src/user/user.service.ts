import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  async login(createUserDto: CreateUserDto) {
    const user = await this.repo.findOne({
      where: { username: createUserDto.username, password: createUserDto.password },
    })

    if (!user) {
      this.handleNotFoundError('Мэдээлэл таарсангүй')
    }

    return {
      ok: true,
      data: user,
      message: 'Амжилттай нэвтэрлээ. Хуудсыг чиглүүлж байна',
    }
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.repo.findOne({
      where: [
        { username: createUserDto.username },
        { mobile: createUserDto.mobile },
      ],
    })

    if (existingUser) {
      this.handleConflictError('Хэрэглэгч бүртгэгдсэн байна')
    }

    try {
      const user = await this.repo.save(createUserDto)
      return {
        ok: true,
        data: user,
        message: 'Хэрэглэгч үүслээ',
      }
    } catch (error) {
      this.handleInternalServerError(error.message)
    }
  }

  async findAll() {
    return await this.repo.find()
  }

  async findOne(mark: string) {
    try {
      const user = await this.repo.findOneOrFail({ where: { mark } })

      if (!user) {
        this.handleNotFoundError('Олдсонгүй')
      }

      return {
        ok: true,
        data: user,
      }
    } catch (error) {
      this.handleInternalServerError(error.message)
    }
  }

  async update(mark: string, updateUserDto: UpdateUserDto) {
    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        this.handleNotFoundError('Олдсонгүй')
      }

      const updated = await this.repo.save({
        ...exist,
        ...updateUserDto,
      })

      return {
        ok: true,
        data: updated,
        message: 'Мэдээлэл шинэчлэгдлээ',
      }
    } catch (error) {
      this.handleInternalServerError(error.message)
    }
  }

  async remove(mark: string) {
    const delItem = await this.repo.delete(mark)
    if (delItem.affected === 0) {
      this.handleNotFoundError('Олдсонгүй')
    }
    return {
      ok: true,
      data: delItem,
      message: 'Мэдээлэл устгагдлаа',
    }
  }

  private handleNotFoundError(message: string) {
    throw new NotFoundException(message)
  }

  private handleConflictError(message: string) {
    throw new ConflictException(message)
  }

  private handleInternalServerError(message: string) {
    throw new InternalServerErrorException('Алдааны мэдээлэл: ' + message)
  }
}

