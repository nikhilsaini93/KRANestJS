import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomMng } from './enitity/room-mng.entity';
import { Repository } from 'typeorm';
import { LostFoundManagement } from 'src/lost-found-management/enitity/lost-found-mng.entity';
import { CreateRoomMngDto } from './DTO/room-mng.dto';
import { CreateLostFoundDto } from 'src/lost-found-management/DTO/lost-found-mng.dto';
import { HousekeepingTask, TaskStatus } from 'src/houseKeeping/enitity/houseKeeping.entity';
import { CreateHousekeepingTaskDto } from 'src/houseKeeping/DTO/housekeeping.dto';
import { error } from 'console';

@Injectable()
export class RoomMngService {
  constructor(
    @InjectRepository(RoomMng)
    private readonly roomMngRepository: Repository<RoomMng>,
    @InjectRepository(LostFoundManagement)
    private readonly lostFoundManagementRepository: Repository<LostFoundManagement>,
    @InjectRepository(HousekeepingTask)
    private readonly housekeepingTaskRepository: Repository<HousekeepingTask>,
  ) {}

  async findall() {
    return await this.roomMngRepository.find();
  }

  async findRoomMngById(id: number) {
    const res = await this.roomMngRepository.findOne({
      where: { room_number: id },
    });
    if (!res) {
      throw new NotFoundException(`Room not found with id ${id}`);
    }
    return res;
  }

  async createRoommng(createRoomMngDto: CreateRoomMngDto) {
    const newRoomMng = this.roomMngRepository.create({
      room_status_cleaning: createRoomMngDto.room_status_cleaning,
      housekeeping_task_assign_id: createRoomMngDto.housekeeping_task_assign_id,
      room_inspection: createRoomMngDto.room_inspection,
      guest: { id: createRoomMngDto.assigned_guest_id },
    });
    return await this.roomMngRepository.save(newRoomMng);
  }

  async findallLostFound() {
    return await this.lostFoundManagementRepository.find();
  }

  async findLostFoundById(id: number) {
    const res = await this.lostFoundManagementRepository.findOne({
      where: { id: id },
    });
    if (!res) {
      throw new NotFoundException(`Lost Found not found with id ${id}`);
    }
    return res;
  }

  async createlostFound(createLostFoundDto: CreateLostFoundDto) {
    const newLostFound = this.lostFoundManagementRepository.create({
      room: { room_number: createLostFoundDto.room_id },
      item_description: createLostFoundDto.item_description,
      date_found: createLostFoundDto.date_found,
      status: createLostFoundDto.status,
    });
    return await this.lostFoundManagementRepository.save(newLostFound);
  }

  async findAllHousekeepingTasks() {
    return await this.housekeepingTaskRepository.find({
      relations: {
        room: true,
        staff: true,
      },
    });
  }

  async findHousekeepingTaskById(id: number) {
    const res = await this.housekeepingTaskRepository.findOne({
      where: { Htask_id: id },
      relations: {
        room: true,
        staff: true,
      },
    });
    if (!res) {
      throw new NotFoundException(`Housekeeping task not found with id ${id}`);
    }
    return res;
  }

  async findHosuekeepingTaskbyStaffId(staffId: number) {
    console.log(staffId)
    const res = await this.housekeepingTaskRepository.find({
      where: { assigned_staff_id: staffId },
      relations: {
        room: true,
        staff: true,
      },
    });
    console.log(staffId)
    console.log(res)
   if (res.length === 0) {
  throw new NotFoundException(`Housekeeping task not found with staff id ${staffId}`);
}
    return res;
    }

    async findHouseKeepingTaskByRoomId(roomId: number) {
         const res = await this.housekeepingTaskRepository.find({
      where: { room_id: roomId },
      relations: {
        room: true,
        staff: true,
      },
    });
    if(res.length === 0) {
        throw new NotFoundException(`Housekeeping task not found with Room id ${roomId}`);
    }
    return res;
    }

    async houseKeepingStatusChange(id: number, status: TaskStatus) {
    const task = await this.housekeepingTaskRepository.findOne({
        where: { Htask_id: id },
        relations: {
            room: true,
            staff: true,
        },
    });

    if (!task) {
        throw new NotFoundException(`Housekeeping task not found with id ${id}`);
    }
 if (status === TaskStatus.COMPLETED) {
        task.completed_at = new Date();
    }
   

    // Update status
    task.status = status;

    const updatedTask = await this.housekeepingTaskRepository.save(task);

    return {
        success: true,
        message: `Task status successfully updated to ${status}`,
        task: updatedTask
    };
}
    


  async createHousekeepingTask(createHousekeepingTaskDto: CreateHousekeepingTaskDto) {
    const newHousekeepingTask = this.housekeepingTaskRepository.create({
      room: { room_number: createHousekeepingTaskDto.room_id },
      task_type: createHousekeepingTaskDto.task_type,
      status: createHousekeepingTaskDto.status,
      assigned_staff_id: createHousekeepingTaskDto.assigned_staff_id,
      scheduled_date: createHousekeepingTaskDto.scheduled_date,
    });
    return await this.housekeepingTaskRepository.save(newHousekeepingTask);
  }

}
