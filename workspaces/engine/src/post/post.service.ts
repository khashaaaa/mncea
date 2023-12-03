import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PostService {

  constructor(@InjectRepository(Post) private repo: Repository<Post>) { }

  async create(createPostDto: CreatePostDto) {

    try {
      return await this.repo.save(createPostDto)
    }
    catch (error) {
      throw new InternalServerErrorException('Алдааны мэдээлэл: ' + error.message)
    }
  }

  async findAll() {
    return await this.repo.find()
  }

  async findOne(mark: string) {

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

  async update(mark: string, updatePostDto: UpdatePostDto) {

    try {
      const exist = await this.repo.findOneOrFail({ where: { mark } })

      if (!exist) {
        throw new NotFoundException('Олдсонгүй')
      }

      const updated = await this.repo.save({
        ...exist,
        ...updatePostDto
      })

      return updated
    }
    catch (error) {
      throw new InternalServerErrorException('Алдааны мэдээлэл: ' + error.message)
    }
  }

  async remove(mark: string) {
    return await this.repo.delete(mark)
  }
}
