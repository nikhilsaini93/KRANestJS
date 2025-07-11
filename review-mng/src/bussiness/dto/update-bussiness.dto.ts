;
import { PartialType } from '@nestjs/swagger';
import { CreateBussinessDto } from './create-bussiness.dto';

export class UpdateBussinessDto extends PartialType(CreateBussinessDto) {}
