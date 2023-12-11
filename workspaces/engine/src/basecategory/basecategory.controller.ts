import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { BasecategoryService } from './basecategory.service'
import { CreateBasecategoryDto } from './dto/create-basecategory.dto'
import { UpdateBasecategoryDto } from './dto/update-basecategory.dto'
import { JwtAuthGuard } from 'src/auth/auth.guard'

@Controller('basecategory')
export class BasecategoryController {
  constructor(private readonly basecategoryService: BasecategoryService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createBasecategoryDto: CreateBasecategoryDto) {
    return await this.basecategoryService.create(createBasecategoryDto)
  }

  @Get()
  async findAll() {
    return await this.basecategoryService.findAll()
  }

  @Get(':mark')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('mark') mark: number) {
    return await this.basecategoryService.findOne(mark)
  }

  @Patch(':mark')
  @UseGuards(JwtAuthGuard)
  async update(@Param('mark') mark: number, @Body() updateBasecategoryDto: UpdateBasecategoryDto) {
    return await this.basecategoryService.update(mark, updateBasecategoryDto)
  }

  @Delete(':mark')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('mark') mark: number) {
    return await this.basecategoryService.remove(mark)
  }
}
