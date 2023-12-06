import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { MidcategoryService } from './midcategory.service'
import { CreateMidcategoryDto } from './dto/create-midcategory.dto'
import { UpdateMidcategoryDto } from './dto/update-midcategory.dto'

@Controller('midcategory')
export class MidcategoryController {
  constructor(private readonly midcategoryService: MidcategoryService) { }

  @Post()
  create(@Body() createMidcategoryDto: CreateMidcategoryDto) {
    return this.midcategoryService.create(createMidcategoryDto)
  }

  @Get()
  findAll() {
    return this.midcategoryService.findAll()
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: number) {
    return await this.midcategoryService.findOne(mark)
  }

  @Patch(':mark')
  async update(@Param('mark') mark: number, @Body() updateMidcategoryDto: UpdateMidcategoryDto) {
    return await this.midcategoryService.update(mark, updateMidcategoryDto)
  }

  @Delete(':mark')
  async remove(@Param('mark') mark: number) {
    return await this.midcategoryService.remove(mark)
  }
}
