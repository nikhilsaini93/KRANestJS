import { Injectable } from '@nestjs/common';
import { UserValidationException } from './ExceptionsHandler/userexception';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


   validateAge(age: number) {
    if (age < 1 || age > 110) {
      throw new UserValidationException('Age must be between 1 and 110');
    }
  }

  validateDateOfBirth(dob: string) {
    const dobDate = new Date(dob);
    // console.log(dobDate)
    const today = new Date();
    // console.log(today)
    const fifteenYearsAgo = new Date();
    // console.log(fifteenYearsAgo)
    // console.log(fifteenYearsAgo.setFullYear)
    // console.log( fifteenYearsAgo.setFullYear(today.getFullYear() - 15))

    fifteenYearsAgo.setFullYear(today.getFullYear() - 15);
    // console.log(fifteenYearsAgo)

    if (dobDate > fifteenYearsAgo) {
      throw new UserValidationException('User must be at least 15 years old');
    }
}
}
