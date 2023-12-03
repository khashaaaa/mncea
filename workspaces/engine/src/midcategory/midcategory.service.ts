import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateMidcategoryDto } from './dto/create-midcategory.dto'
import { UpdateMidcategoryDto } from './dto/update-midcategory.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Midcategory } from './entities/midcategory.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MidcategoryService {

  constructor(@InjectRepository(Midcategory) private repo: Repository<Midcategory>) { }

  async create(createMidcategoryDto: CreateMidcategoryDto) {

    try {
      return await this.repo.save(createMidcategoryDto)
    }
    catch (error) {
      throw new InternalServerErrorException('' + error.message)
    }
  }

  async findAll() {
    return this.repo.find()
  }

  async findOne(mark: number) {

    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        throw new NotFoundException('Олдсонгүй')
      }

      return exist
    }
    catch (error) {
      throw new InternalServerErrorException('' + error.message)
    }
  }

  async update(mark: number, updateMidcategoryDto: UpdateMidcategoryDto) {

    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        throw new NotFoundException('Олдсонгүй')
      }

      const updated = await this.repo.save({
        ...exist,
        ...updateMidcategoryDto
      })

      return updated
    }
    catch (error) {
      throw new InternalServerErrorException('' + error.message)
    }
  }

  async remove(mark: number) {
    return await this.repo.delete(mark)
  }
}
