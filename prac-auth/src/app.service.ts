import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';

  }
async tocheck(something : any) {

const iv = randomBytes(16);
const password = 'Password used to generate key';

// The key length is dependent on the algorithm.
// In this case for aes256, it is 32 bytes.
const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
const cipher = createCipheriv('aes-256-ctr', key, iv);

const textToEncrypt = something.random;
const encryptedText = Buffer.concat([
  cipher.update(textToEncrypt),
  cipher.final(),
]);

const decipher = createDecipheriv('aes-256-ctr', key, iv);
const decryptedText = Buffer.concat([
  decipher.update(encryptedText),
  decipher.final(),
])
//(encryptedText.toString("hex"));
//(decryptedText.toString());
return encryptedText.toString('hex');
  }

}







