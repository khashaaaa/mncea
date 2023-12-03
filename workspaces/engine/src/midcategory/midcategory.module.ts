import { Module } from '@nestjs/common'
import { MidcategoryService } from './midcategory.service'
import { MidcategoryController } from './midcategory.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Midcategory } from './entities/midcategory.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Midcategory])
  ],
  controllers: [MidcategoryController],
  providers: [MidcategoryService],
})
export class MidcategoryModule { }
