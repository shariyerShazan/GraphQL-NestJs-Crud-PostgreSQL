import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateBookInput } from './dto/create-book-dto';
import { UpdateBookInput } from './dto/update-book-dto';


@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  private handleError(error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Record not found
      if (error.code === 'P2025') {
        throw new NotFoundException('Book not found');
      }


      throw new BadRequestException(error.message);
    }

    throw new BadRequestException('Something went wrong');
  }

  private async getBookOrThrow(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }


  async findAll() {
    try {
      return await this.prisma.book.findMany({
        orderBy: { id: 'desc' },
      });
    } catch (error) {
      this.handleError(error);
    }
  }


  async findOne(id: number) {
    try {
      return await this.getBookOrThrow(id);
    } catch (error) {
      this.handleError(error);
    }
  }

  async create(data: CreateBookInput) {
    try {
      return await this.prisma.book.create({ data });
    } catch (error) {
      this.handleError(error);
    }
  }


  async update(id: number, data: UpdateBookInput) {
    try {
      await this.getBookOrThrow(id); // ensures ID exists first

      return await this.prisma.book.update({
        where: { id },
        data,
      });
    } catch (error) {
      this.handleError(error);
    }
  }


  async delete(id: number ) {
    try {
      await this.getBookOrThrow(id); // validates ID exists

      return await this.prisma.book.delete({
        where: { id },
      });
    } catch (error) {
      this.handleError(error);
    }
  }
}
