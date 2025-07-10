import { SetMetadata } from '@nestjs/common';

export const UserType = (...types: ('customer' | 'business')[]) =>
  SetMetadata('user_types', types);