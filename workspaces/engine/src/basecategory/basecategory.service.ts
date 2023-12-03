import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateBasecategoryDto } from './dto/create-basecategory.dto'
import { UpdateBasecategoryDto } from './dto/update-basecategory.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Basecategory } from './entities/basecategory.entity'
import { Repository } from 'typeorm'

@Injectable()
export class BasecategoryService {

  constructor(@InjectRepository(Basecategory) private repo: Repository<Basecategory>) { }

  async create(createBasecategoryDto: CreateBasecategoryDto) {

    try {
      return await this.repo.save(createBasecategoryDto)
    }
    catch (error) {
      throw new InternalServerErrorException('Алдааны мэдээлэл: ' + error.message)
    }
  }

  async findAll() {
    return await this.repo.find()
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
      throw new InternalServerErrorException('Алдааны мэдээлэл: ' + error.message)
    }
  }

  async update(mark: number, updateBasecategoryDto: UpdateBasecategoryDto) {

    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        throw new NotFoundException('Олдсонгүй')
      }

      const updated = await this.repo.save({
        ...exist,
        ...updateBasecategoryDto
      })

      return updated
    }
    catch (error) {
      throw new InternalServerErrorException('Алдааны мэдээлэл: ' + error.message)
    }
  }

  async remove(mark: number) {
    return await this.repo.delete(mark)
  }
}
