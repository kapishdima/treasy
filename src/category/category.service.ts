import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/db/db.module';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prismaService.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return this.prismaService.category.findMany({
      include: { operation: true },
    });
  }

  findOne(id: string) {
    return this.prismaService.category.findFirst({
      where: { id },
      include: { operation: true },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.prismaService.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    return this.prismaService.category.delete({ where: { id } });
  }
}
