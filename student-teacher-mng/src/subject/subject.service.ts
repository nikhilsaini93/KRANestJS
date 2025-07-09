import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/users/entities/user.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const teacher = await this.userRepository.findOne({
      where: { id: createSubjectDto.teacherId, role: UserRole.TEACHER },
    });

    if (!teacher) {
      throw new NotFoundException(
        `Teacher with ID ${createSubjectDto.teacherId} not found or is not a teacher.`,
      );
    }

    const newSubject = this.subjectRepository.create({
      name: createSubjectDto.name,
      teacher: teacher,
    });

    return this.subjectRepository.save(newSubject);
  }

  findAll() {
    return `This action returns all subject`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`;
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}
