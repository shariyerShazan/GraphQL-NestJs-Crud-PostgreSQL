import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './model/book.model';
import { CreateBookInput } from './dto/create-book-dto';
import { UpdateBookInput } from './dto/update-book-dto';


@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  findAllBooks() {
    return this.bookService.findAll();
  }

  @Query(() => Book, { nullable: true })
  findBookById(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  createBook(@Args('data') data: CreateBookInput) {
    return this.bookService.create(data);
  }

  @Mutation(() => Book)
  updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateBookInput,
  ) {
    return this.bookService.update(id, data);
  }

  @Mutation(() => Book)
  deleteBook(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.delete(id);
  }
}
