import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomMng } from './enitity/room-mng.entity';
import { Repository } from 'typeorm';
import { LostFoundManagement } from 'src/lost-found-management/enitity/lost-found-mng.entity';
import { CreateRoomMngDto } from './DTO/room-mng.dto';
import { CreateLostFoundDto } from 'src/lost-found-management/DTO/lost-found-mng.dto';
import {
  HousekeepingTask,
  TaskStatus,
} from 'src/houseKeeping/enitity/houseKeeping.entity';
import { CreateHousekeepingTaskDto } from 'src/houseKeeping/DTO/housekeeping.dto';
import { error } from 'console';
import { UpdateRoomMngDto } from './DTO/updatroommng.dto';

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

  // async createRoommng(createRoomMngDto: CreateRoomMngDto) {
  //   try{

  //   const newRoomMng = this.roomMngRepository.create({
  //     room_status_cleaning: createRoomMngDto.room_status_cleaning,
  //     housekeeping_task_assign_id: createRoomMngDto.housekeeping_task_id,
  //     room_inspection: createRoomMngDto.room_inspection,
  //     guest: { id: createRoomMngDto.assigned_guest_id },
  //   });
  //  const savedRoom = await this.roomMngRepository.save(newRoomMng);
  //    if (createRoomMngDto.housekeeping_task_id) {
  //               const housekeepingTask = await this.housekeepingTaskRepository.findOne({
  //                   where: { Htask_id: createRoomMngDto.housekeeping_task_id}
  //               });
  //               if (housekeepingTask) {
  //                   housekeepingTask.room = savedRoom;
  //                   await this.housekeepingTaskRepository.save(housekeepingTask);
  //               }
  //           }

  //           return savedRoom;

  //          } catch (error) {
  //           throw new BadRequestException(`Failed to create room: ${error.message}`);
  //       }

  // }
  async createRoommng(createRoomDto: CreateRoomMngDto) {
    try {
      const room = this.roomMngRepository.create({
        room_status_cleaning: createRoomDto.room_status_cleaning,
        room_inspection: createRoomDto.room_inspection,
        housekeeping_task_assign_id:
          createRoomDto.housekeeping_task_id ?? undefined,
        guest: createRoomDto.assigned_guest_id
          ? { id: createRoomDto.assigned_guest_id }
          : undefined,
      });

      const savedRoom = await this.roomMngRepository.save(room);

      // If housekeeping task ID is provided, update the task
      if (createRoomDto.housekeeping_task_id) {
        const housekeepingTask = await this.housekeepingTaskRepository.findOne({
          where: { Htask_id: createRoomDto.housekeeping_task_id },
        });

        if (housekeepingTask) {
          housekeepingTask.room = savedRoom;
          await this.housekeepingTaskRepository.save(housekeepingTask);
        }
      }

      return {
        success: true,
        message: 'Room created successfully',
        data: savedRoom,
      };
    } catch (error) {
      throw new BadRequestException(`Failed to create room: ${error.message}`);
    }
  }

  async updateRoommng(
    id: number,
    updateRoomDto: UpdateRoomMngDto,
  ) {
    const room = await this.roomMngRepository.findOne({
      where: { room_number: id },
    });

    if (!room) {
      throw new NotFoundException(`Room not found with id ${id}`);
    }
    // Update room properties
    const updateRoom = await this.roomMngRepository.merge(room, {
      room_status_cleaning: updateRoomDto.room_status_cleaning,
      housekeeping_task_assign_id:
        updateRoomDto.housekeeping_task_assign_id ?? undefined,
      room_inspection: updateRoomDto.room_inspection,
      guest: updateRoomDto.assigned_guest_id
        ? { id: updateRoomDto.assigned_guest_id }
        : undefined,
    });
    try {
      const updatedRoom = await this.roomMngRepository.save(updateRoom);
      return {
        success: true,
        message: 'Room updated successfully',
        data: updatedRoom,
      };
    } catch (error) {
      throw new BadRequestException(`Failed to update room: ${error.message}`);
    }
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

  async chnagestatusLostFound(id: number, status: string) {
    try {
      const lostFoundItem = await this.lostFoundManagementRepository.findOne({
        where: { id: id },
      });
      if (!lostFoundItem) {
        throw new NotFoundException(`Lost Found item not found with id ${id}`);
      }

      lostFoundItem.status = status;
      const updatedItem =
        await this.lostFoundManagementRepository.save(lostFoundItem);
      return {
        success: true,
        message: `Lost Found item status successfully updated to ${status}`,
        item: updatedItem,
      };
    } catch (error) {
      throw new BadRequestException(
        `Failed to change status: ${error.message}`,
      );
    }
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
    console.log(staffId);
    const res = await this.housekeepingTaskRepository.find({
      where: { assigned_staff_id: staffId },
      relations: {
        room: true,
        staff: true,
      },
    });
    console.log(staffId);
    console.log(res);
    if (res.length === 0) {
      throw new NotFoundException(
        `Housekeeping task not found with staff id ${staffId}`,
      );
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
    if (res.length === 0) {
      throw new NotFoundException(
        `Housekeeping task not found with Room id ${roomId}`,
      );
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
      task: updatedTask,
    };
  }

  // async createHousekeepingTask(createHousekeepingTaskDto: CreateHousekeepingTaskDto) {
  //   const newHousekeepingTask = this.housekeepingTaskRepository.create({
  //     room: { room_number: createHousekeepingTaskDto.room_id },
  //     task_type: createHousekeepingTaskDto.task_type,
  //     status: createHousekeepingTaskDto.status,
  //     assigned_staff_id: createHousekeepingTaskDto.assigned_staff_id,
  //     scheduled_date: createHousekeepingTaskDto.scheduled_date,
  //   });
  //   return await this.housekeepingTaskRepository.save(newHousekeepingTask);
  // }
  async createHousekeepingTask(
    createHousekeepingDto: CreateHousekeepingTaskDto,
  ) {
    try {
      // Check if room exists
      const room = await this.roomMngRepository.findOne({
        where: { room_number: createHousekeepingDto.room_id },
      });

      if (!room) {
        throw new NotFoundException(
          `Room ${createHousekeepingDto.room_id} not found`,
        );
      }

      const task = this.housekeepingTaskRepository.create({
        ...createHousekeepingDto,
        room: room,
      });

      const savedTask = await this.housekeepingTaskRepository.save(task);

      return savedTask;
    } catch (error) {
      throw new BadRequestException(`Failed to create task: ${error.message}`);
    }
  }
}
