import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffMng } from './enitity/stff-mng.entity';
import { Repository } from 'typeorm';
import { StaffAttendance } from 'src/staff-attendance/enitity/staff-attendence.entity';
import { StaffShifts } from 'src/staff-shifts/enitity/staff-shifts.entity';
import { TaskMng } from 'src/task-mng/enitity/task-mng.entity';
import { CreateStaffDto } from './DTO/staff-mng.dto';
import { CreateStaffShiftDto } from 'src/staff-shifts/DTO/staffshift.dto';
import { CreateTaskDto } from 'src/task-mng/DTO/task-mng.dto';

@Injectable()
export class StaffMngService {
  constructor(
    @InjectRepository(StaffMng)
    private readonly staffMngRepository: Repository<StaffMng>,
    @InjectRepository(StaffAttendance)
    private readonly staffAttendanceRepository: Repository<StaffAttendance>,
    @InjectRepository(StaffShifts)
    private readonly staffShiftsRepository: Repository<StaffShifts>,
    @InjectRepository(TaskMng)
    private readonly taskMngRepository: Repository<TaskMng>,
  ) {}

  async findallStaff() {
    return await this.staffMngRepository.find({
      relations: {
        attendanceRecords: true,
        shiftRecords: true,
        tasks: true,
      },
    });
  }

  async findStaffById(id: number) {
    let res = await this.staffMngRepository.findOne({
      where: {
        staff_id: id,
      },
      relations: {
        attendanceRecords: true,
        shiftRecords: true,
      },
    });
    if (!res) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }
    return res;
  }

  async createStaff(createStaffDto: CreateStaffDto) {
    const newStaff = this.staffMngRepository.create({
      staff_type: createStaffDto.staff_type,
      role: createStaffDto.role,
      salary: createStaffDto.salary,
      dept: createStaffDto.dept,
    });
    return await this.staffMngRepository.save(newStaff);
  }

  async deletestaff(id: number) {
    const result = await this.staffMngRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }

    return { message: `Staff with ID ${id} has been successfully deleted.` };
  }

  async findAllAttendence() {
    return await this.staffAttendanceRepository.find({
      relations: {
        staff: true,
      },
    });
  }

  async findAttendenceById(id: number) {
    let res = await this.staffAttendanceRepository.findOne({
      where: {
        staff_attendance_id: id,
      },
      relations: {
        staff: true,
      },
    });
    if (!res) {
      throw new NotFoundException(`Staff Attendance with ID ${id} not found`);
    }
    return res;
  }

  async findAttendenceByStaffId(staffId: number) {
    return await this.staffAttendanceRepository.find({
      where: {
        staff: {
          staff_id: staffId,
        },
      },
      relations: {
        staff: true,
      },
    });
  }

  async Postattendence(id: number) {
    const newAttendence = this.staffAttendanceRepository.create({
      date: new Date(),
      check_in: new Date(),
      check_out: null,
      staff: {
        staff_id: id,
      },
    });
    return await this.staffAttendanceRepository.save(newAttendence);
  }
  async postAttenddenceCheckOutTime(id: number) {
    const attendance = await this.staffAttendanceRepository.findOne({
      where: {
        staff_attendance_id: id,
      },
      relations: {
        staff: true,
      },
    });

    if (!attendance) {
      throw new NotFoundException(`Attendance with ID ${id} not found`);
    }

    attendance.check_out = new Date();

    return await this.staffAttendanceRepository.save(attendance);
  }

  async findallStaffShifts() {
    return await this.staffShiftsRepository.find({
      relations: {
        staff: true,
      },
    });
  }

  async findStaffShiftsById(id: number) {
    let res = await this.staffShiftsRepository.findOne({
      where: {
        staff_shift_id: id,
      },
      relations: {
        staff: true,
      },
    });
    if (!res) {
      throw new NotFoundException(`Staff Shift with ID ${id} not found`);
    }
    return res;
  }

  async findStaffShiftsByStaffId(staffId: number) {
    return await this.staffShiftsRepository.find({
      where: {
        staff: {
          staff_id: staffId,
        },
      },
      relations: {
        staff: true,
      },
    });
  }

  async createStaffShifts(createStaffShiftDto: CreateStaffShiftDto) {
    const newStaffShift = await this.staffShiftsRepository.create({
      shift_start: createStaffShiftDto.shift_start,
      shift_end: createStaffShiftDto.shift_end,
      shift_date: createStaffShiftDto.shift_date,
      staff: {
        staff_id: createStaffShiftDto.staff_id,
      },
    });
    return await this.staffShiftsRepository.save(newStaffShift);
  }

  async deleteStaffShift(id: number) {
    const result = await this.staffShiftsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Staff Shift with ID ${id} not found`);
    }
    return {
      message: `Staff Shift with ID ${id} has been successfully deleted.`,
    };
  }

  async findallTask() {
    return await this.taskMngRepository.find({
      relations: {
        staffMembers: true,
      },
    });
  }
  async findTaskById(id: number) {
    let res = await this.taskMngRepository.findOne({
      where: {
        task_id: id,
      },
      relations: {
        staffMembers: true,
      },
    });
    if (!res) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return res;
  }

  async findTaskByStaffId(staffId: number) {
    let res = await this.taskMngRepository.find({
      where: {
        staffMembers: {
          staff_id: staffId,
        },
      },
      relations: {
        staffMembers: true,
      },
    });
    if (!res) {
      throw new NotFoundException(`Task with ID ${staffId} not found`);
    }
    return res;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const newTask = this.taskMngRepository.create({
      task_type: createTaskDto.task_type,
      description: createTaskDto.description,
      status: createTaskDto.status,
      staffMembers: createTaskDto.staff_ids.map((staffId) => ({
        staff_id: staffId,
      })),
    });
    return await this.taskMngRepository.save(newTask);
  }

  async deleteTask(id: number) {
    const result = await this.taskMngRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return { message: `Task with ID ${id} has been successfully deleted.` };
  }
}
