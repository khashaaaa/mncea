import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { SubcategoryService } from './subcategory.service'
import { CreateSubcategoryDto } from './dto/create-subcategory.dto'
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto'

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) { }

  @Post()
  async create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return await this.subcategoryService.create(createSubcategoryDto)
  }

  @Get()
  async findAll() {
    return await this.subcategoryService.findAll()
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: number) {
    return await this.subcategoryService.findOne(mark)
  }

  @Patch(':mark')
  async update(@Param('mark') mark: number, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.subcategoryService.update(mark, updateSubcategoryDto)
  }

  @Delete(':mark')
  async remove(@Param('mark') mark: number) {
    return await this.subcategoryService.remove(mark)
  }
}
