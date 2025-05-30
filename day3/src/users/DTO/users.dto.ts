// users/user.entity.ts
export class User {
  id: number;
  name: string;
  email: string;
  purchases: any[]; // Product IDs
}
