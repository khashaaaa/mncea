import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartnershipService } from './partnership.service';
import { CreatePartnershipDto } from './dto/create-partnership.dto';
import { UpdatePartnershipDto } from './dto/update-partnership.dto';

@Controller('partnership')
export class PartnershipController {
  
  constructor(private readonly partnershipService: PartnershipService) {}

  @Post()
  async create(@Body() createPartnershipDto: CreatePartnershipDto) {
    return await this.partnershipService.create(createPartnershipDto);
  }

  @Get()
  async findAll() {
    return await this.partnershipService.findAll();
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: string) {
    return await this.partnershipService.findOne(mark);
  }

  @Patch(':mark')
  async update(@Param('mark') mark: string, @Body() updatePartnershipDto: UpdatePartnershipDto) {
    return await this.partnershipService.update(mark, updatePartnershipDto);
  }

  @Delete(':mark')
  async remove(@Param('mark') mark: string) {
    return await this.partnershipService.remove(mark);
  }
}
