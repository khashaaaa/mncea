import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, BadRequestException, Res, InternalServerErrorException, Query, NotFoundException } from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import * as path from 'path'
import * as fs from 'fs/promises'
import { Language } from '../enum/language'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('thumbnail')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'public/post',
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      },
    }),
  }))
  async upload(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
      ],
    }),
  ) file: Express.Multer.File) {
    try {
      return {
        ok: true,
        file,
        message: 'Зураг амжилттай хуулагдлаа'
      }
    } catch (error) {
      throw new BadRequestException('Алдааны мэдээлэл: ' + error.message)
    }
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postService.create(createPostDto)
  }

  @Get('/thumbnail/:thumbnail')
  serveImage(@Param('thumbnail') filename: string, @Res() res: any) {
    try {
      const imagePath = path.join(__dirname, '../../../public/post', filename)
      return res.sendFile(imagePath)
    } catch (error) {
      throw new NotFoundException('Image not found')
    }
  }

  @Get()
  async findAll(@Query('language') language: Language) {
    return await this.postService.findAll(language)
  }

  @Get('mid/:mark')
  async findMid(@Param('mark') mark: number) {
    return await this.postService.findMid(mark)
  }

  @Get('sub/:mark')
  async findSub(@Param('mark') mark: number) {
    return await this.postService.findSub(mark)
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: string) {
    return await this.postService.findOne(mark)
  }

  @Patch(':mark/edit')
  async update(@Param('mark') mark: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.update(mark, updatePostDto)
  }

  @Post('sweep')
  async sweepImage(@Body() data: any) {
    const { thumbnail } = data

    try {
      const imgPath = path.join(__dirname, '../../../public/post', thumbnail)
      await fs.unlink(imgPath)
      return {
        ok: true,
        data: null,
        message: 'Зураг устгагдлаа'
      }
    } catch (error) {
      throw new InternalServerErrorException('Зураг утсгах явцад алдаа гарлаа: ' + error.message)
    }
  }

  @Delete(':mark/delete')
  async remove(@Param('mark') mark: string) {
    return await this.postService.remove(mark)
  }
}
