import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './DTO/createuser.dto';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto, currentUser: User) {
    if (currentUser.role !== 'admin') {
      throw new ForbiddenException('You are not authorized to create a user');
    }
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ForbiddenException('User with this email already exists');
    }
    //('Creating user with email:', createUserDto , currentUser);


    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    if (!hashedPassword) {
      throw new ForbiddenException('Failed to hash password');
    }
    

    const newUser = this.usersRepository.create({
      email: createUserDto.email,
      password: hashedPassword,
      role: UserRole.USER,
      secretmsg: await this.encrypt(createUserDto.secretmsg ?? ''),
    });

    return await this.usersRepository.save(newUser);
  }

  // async findAll() {
  //   return await this.usersRepository.find();
  // }

  async findAll() {
  const users = await this.usersRepository.find();
  return users;
}
async toCheckSecretMsg(id: number) {
  const user = await this.usersRepository.findOne({ where: { userId: id } });

  if (!user) {
    throw new ForbiddenException('User not found');
  }

  const decryptedMsg = user.secretmsg ? await this.decrypt(user.secretmsg) : '';

  return {
    email: user.email,
    secretmsg: decryptedMsg || 'No secret message found for this user',
  };
}



  private async encrypt(text: string): Promise<string> {
    const iv = randomBytes(16);
    const password = 'Password used to generate key';

    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedText = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final(),
    ]);

    // Store both IV and encrypted text (hex encoded)
    return iv.toString('hex') + ':' + encryptedText.toString('hex');
  }

 private async decrypt(encryptedText: string): Promise<string> {
  if (!encryptedText) {
    // Return empty string or some default if there's nothing to decrypt
    return '';
  }

  const [ivHex, contentHex] = encryptedText.split(':');
  if (!ivHex || !contentHex) {
    // Handle invalid format gracefully
    return '';
  }

  const iv = Buffer.from(ivHex, 'hex');
  const content = Buffer.from(contentHex, 'hex');
  const password = 'Password used to generate key';

  const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
  const decipher = createCipheriv('aes-256-ctr', key, iv);

  const decryptedText = Buffer.concat([
    decipher.update(content),
    decipher.final(),
  ]);

  return decryptedText.toString('utf8');
}

}
