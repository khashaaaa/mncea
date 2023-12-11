import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { SubcategoryService } from './subcategory.service'
import { CreateSubcategoryDto } from './dto/create-subcategory.dto'
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto'
import { JwtAuthGuard } from 'src/auth/auth.guard'

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return await this.subcategoryService.create(createSubcategoryDto)
  }

  @Get()
  async findAll() {
    return await this.subcategoryService.findAll()
  }

  @Get(':mark')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('mark') mark: number) {
    return await this.subcategoryService.findOne(mark)
  }

  @Patch(':mark')
  @UseGuards(JwtAuthGuard)
  async update(@Param('mark') mark: number, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.subcategoryService.update(mark, updateSubcategoryDto)
  }

  @Delete(':mark')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('mark') mark: number) {
    return await this.subcategoryService.remove(mark)
  }
}
