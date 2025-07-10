import { PartialType } from '@nestjs/mapped-types';
import { CreateBussinessDto } from './create-bussiness.dto';

export class UpdateBussinessDto extends PartialType(CreateBussinessDto) {}
