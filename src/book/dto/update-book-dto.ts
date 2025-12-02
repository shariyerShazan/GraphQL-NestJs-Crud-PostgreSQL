// src/modules/book/dto/update-book.input.ts

import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBookInput } from './create-book-dto';


@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {}
