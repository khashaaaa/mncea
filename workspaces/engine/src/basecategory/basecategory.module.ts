import { Module } from '@nestjs/common'
import { BasecategoryService } from './basecategory.service'
import { BasecategoryController } from './basecategory.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Basecategory } from './entities/basecategory.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Basecategory])
  ],
  controllers: [BasecategoryController],
  providers: [BasecategoryService],
})
export class BasecategoryModule { }
