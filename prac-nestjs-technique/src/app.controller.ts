import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { createReadStream, existsSync } from 'fs';
import { Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService ,
    private readonly httpService: HttpService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
@UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        cb(null, filename);
      }
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      originalName: file.originalname,
      fileName: file.filename,
      path: file.path,
    };
  }

  @Get('upload/:filename')
  getUploadFile(@Res() res: Response, @Param('filename') filename: string) {
    const filePath = join(__dirname, '..', 'uploads', filename);

    // Check if the file exists
    if (!existsSync(filePath)) {
      return res.status(404).send('File not found');
    }

    const file = createReadStream(filePath);

    res.set({
      'Content-Type': 'application/png',
      'Content-Disposition': `inline; filename="${filename}"`,
    });

    file.pipe(res);
  }
  @Get('axios')
  async getAxiosExample() {
    const url = 'https://jsonplaceholder.typicode.com/posts';

    const response = await lastValueFrom(this.httpService.get(url));
    // console.log(response.data);
    
    return response.data;
  }

}

