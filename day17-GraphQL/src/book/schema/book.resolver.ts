// import { Query, Resolver } from '@nestjs/graphql';

// @Resolver('Book')
// export class BookeResolver {
//   @Query('books')
//   getAllBooks() {
//     return [
//       {
//         id: 1,
//         title: 'The Great Gatsby',
//         author: 'F. Scott Fitzgerald',
//         price: 10.99,
//         description:
//           'A novel set in the Roaring Twenties, exploring themes of decadence and excess.',
//       },
//       {
//         id: 2,
//         title: 'To Kill a Mockingbird',
//         author: 'Harper Lee',
//         price: 12.99,
//         description:
//           'A novel about the serious issues of racism and injustice in the American South.',
//       },
//     ];
//   }
// }
import { Query, Resolver } from '@nestjs/graphql';
import { Book } from './book.schema';

@Resolver(of => Book)
export class BookeResolver {
  @Query(returns => [Book] ,{ name : 'books'})
  getAllBooks() {
    return [
      {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        price: 10,
        description:
          'A novel set in the Roaring Twenties, exploring themes of decadence and excess.',
      },
      {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        price: 12,
        description:
          'A novel about the serious issues of racism and injustice in the American South.',
      },
    ];
  }
}
