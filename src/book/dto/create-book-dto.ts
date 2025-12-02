// src/modules/book/dto/create-book.input.ts

import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsInt, IsDateString } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  author: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  publishedYear?: number;

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  publishedAt?: Date;
}
