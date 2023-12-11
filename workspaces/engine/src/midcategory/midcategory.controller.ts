import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { MidcategoryService } from './midcategory.service'
import { CreateMidcategoryDto } from './dto/create-midcategory.dto'
import { UpdateMidcategoryDto } from './dto/update-midcategory.dto'
import { JwtAuthGuard } from 'src/auth/auth.guard'

@Controller('midcategory')
export class MidcategoryController {
  constructor(private readonly midcategoryService: MidcategoryService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createMidcategoryDto: CreateMidcategoryDto) {
    return this.midcategoryService.create(createMidcategoryDto)
  }

  @Get()
  findAll() {
    return this.midcategoryService.findAll()
  }

  @Get(':mark')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('mark') mark: number) {
    return await this.midcategoryService.findOne(mark)
  }

  @Patch(':mark')
  @UseGuards(JwtAuthGuard)
  async update(@Param('mark') mark: number, @Body() updateMidcategoryDto: UpdateMidcategoryDto) {
    return await this.midcategoryService.update(mark, updateMidcategoryDto)
  }

  @Delete(':mark')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('mark') mark: number) {
    return await this.midcategoryService.remove(mark)
  }
}
