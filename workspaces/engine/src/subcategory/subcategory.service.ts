import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateSubcategoryDto } from './dto/create-subcategory.dto'
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Subcategory } from './entities/subcategory.entity'
import { Repository } from 'typeorm'

@Injectable()
export class SubcategoryService {

  constructor(@InjectRepository(Subcategory) private repo: Repository<Subcategory>) { }

  async create(createSubcategoryDto: CreateSubcategoryDto) {

    try {
      return await this.repo.save(createSubcategoryDto)
    }
    catch (error) {
      throw new InternalServerErrorException('', error.message)
    }
  }

  async findAll() {
    return await this.repo.find()
  }

  async findOne(mark: number) {

    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        throw new NotFoundException('')
      }

      return exist
    }
    catch (error) {
      throw new InternalServerErrorException('', error.message)
    }
  }

  async update(mark: number, updateSubcategoryDto: UpdateSubcategoryDto) {

    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        throw new NotFoundException('Олдсонгүй')
      }

      const updated = await this.repo.save({
        ...exist,
        ...updateSubcategoryDto
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
