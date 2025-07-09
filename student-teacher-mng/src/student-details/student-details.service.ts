import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDetailDto } from './dto/create-student-detail.dto';
import { UpdateStudentDetailDto } from './dto/update-student-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentDetail } from './entities/student-detail.entity';
import { In, Repository } from 'typeorm';
import { User, UserRole } from 'src/users/entities/user.entity';
import { Subject } from 'src/subject/entities/subject.entity';

@Injectable()
export class StudentDetailsService {
  constructor(
    @InjectRepository(StudentDetail)
    private readonly studentDetailRepository: Repository<StudentDetail>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create(createStudentDetailDto: CreateStudentDetailDto) {
    const { userId, teacherId, subjectIds } = createStudentDetailDto;

    const user = await this.userRepository.findOne({
      where: { id: userId, role: UserRole.STUDENT },
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${userId} not found or is not a student.`,
      );
    }

    const existingDetail = await this.studentDetailRepository.findOne({
      where: { user: { id: userId } },
    });
    if (existingDetail) {
      throw new BadRequestException(
        `Student details for user ID ${userId} already exist.`,
      );
    }

    let teacher: User | null = null;
    if (teacherId) {
      teacher = await this.userRepository.findOne({
        where: { id: teacherId, role: UserRole.TEACHER },
      });
      if (!teacher) {
        throw new NotFoundException(
          `Teacher with ID ${teacherId} not found or is not a teacher.`,
        );
      }
    }

    const subjects = subjectIds?.length
      ? await this.subjectRepository.findBy({ id: In(subjectIds) })
      : [];

    if (subjectIds?.length && subjects.length !== subjectIds.length) {
      throw new NotFoundException('One or more subjects could not be found.');
    }

    const studentDetail = this.studentDetailRepository.create({
      user,
      teacher: teacher ?? undefined,
      subjects,
    });

    return this.studentDetailRepository.save(studentDetail);
  }

  findAll() {
    return `This action returns all studentDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentDetail`;
  }

  update(id: number, updateStudentDetailDto: UpdateStudentDetailDto) {
    return `This action updates a #${id} studentDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentDetail`;
  }
  
}
