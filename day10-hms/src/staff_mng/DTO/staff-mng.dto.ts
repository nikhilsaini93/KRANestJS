import { IsNumber, IsString, IsNotEmpty, IsEnum, Min } from 'class-validator';

export enum StaffType {
    MANAGER = 1,
    RECEPTIONIST = 2,
    HOUSEKEEPER = 3,
    KITCHEN = 4,
    MAINTENANCE = 5,
    SECURITY = 6
}

export enum Department {
    FRONT_DESK = 'front_desk',
    HOUSEKEEPING = 'housekeeping',
    FOOD_SERVICE = 'food_service',
    MAINTENANCE = 'maintenance',
    SECURITY = 'security',
    ADMINISTRATION = 'administration'
}

export enum StaffRole {
    GENERAL_MANAGER = 'general_manager',
    FRONT_DESK_MANAGER = 'front_desk_manager',
    RECEPTIONIST = 'receptionist',
    CHEF = 'chef',
    WAITER = 'waiter',
    HOUSEKEEPER = 'housekeeper',
    MAINTENANCE_STAFF = 'maintenance_staff',
    SECURITY_GUARD = 'security_guard'
}

export class CreateStaffDto {
    @IsNumber()
    @IsNotEmpty()
    @IsEnum(StaffType)
    staff_type: StaffType;

    @IsString()
    @IsNotEmpty()
    @IsEnum(StaffRole)
    role: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    salary: number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(Department)
    dept: string;
}