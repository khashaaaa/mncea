import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { BasecategoryService } from './basecategory.service'
import { CreateBasecategoryDto } from './dto/create-basecategory.dto'
import { UpdateBasecategoryDto } from './dto/update-basecategory.dto'

@Controller('basecategory')
export class BasecategoryController {
  constructor(private readonly basecategoryService: BasecategoryService) { }

  @Post()
  async create(@Body() createBasecategoryDto: CreateBasecategoryDto) {
    return await this.basecategoryService.create(createBasecategoryDto)
  }

  @Get()
  async findAll() {
    return await this.basecategoryService.findAll()
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: number) {
    return await this.basecategoryService.findOne(mark)
  }

  @Patch(':mark')
  async update(@Param('mark') mark: number, @Body() updateBasecategoryDto: UpdateBasecategoryDto) {
    return await this.basecategoryService.update(mark, updateBasecategoryDto)
  }

  @Delete(':mark')
  async remove(@Param('mark') mark: number) {
    return await this.basecategoryService.remove(mark)
  }
}
