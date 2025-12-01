// In a resolver file (e.g., app.resolver.ts)
import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String) // Decorate a method as a Query
  hello(): string {
    return 'Hello World!';
  }
}
