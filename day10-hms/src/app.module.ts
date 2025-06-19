import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAccountsModule } from './user-accounts/user-accounts.module';

import { ChannelManagementModule } from './channel-management/channel-management.module';
import { RoomServiceModule } from './room-service/room-service.module';

import { InventoryMngModule } from './inventory-mng/inventory-mng.module';
import { GuestMngModule } from './guest-mng/guest-mng.module';
import { RoomReservationModule } from './room-reservation/room-reservation.module';
import { FeedbackModule } from './feedback/feedback.module';
import { PaymentModule } from './payment/payment.module';
import { CustomerDetailsModule } from './customer_details/customer_details.module';
import { BookingsModule } from './bookings/bookings.module';
import { StaffMngModule } from './staff_mng/staff_mng.module';
import { RoomMngModule } from './room_mng/room_mng.module';
import { AuthModule } from './auth/auth.module';
import { Booking } from './bookings/entity/booking.entity';
import { Customer } from './customer_details/entity/customer_details.entitiy';
import { ChannelManagement } from './channel-management/entity/channel-management.entity';
import { BookingDetails } from './bookingdetails/enitity/bookingdetails.entity';
import { RoomReservation } from './room-reservation/enitity/room-reservation';
import { Payment } from './payment/enitity/payment.entity';
import { GuestMng } from './guest-mng/enitity/guest-mng.entity';
import { InventoryMng } from './inventory-mng/enitity/inventory.entity';
import { PurchaseOrderMng } from './purchase-order-mng/enitity/purchase-order.entity';
import { Supplier } from './supplier/enitity/supplier.entity';
import { Feedback } from './feedback/enitity/feedback.entity';
import { AuditLogs } from './audit-logs/entity/audit-logs.entity';
import { KotGeneration } from './kot-generation/enitity/kot-gen.entity';
import { LostFoundManagement } from './lost-found-management/enitity/lost-found-mng.entity';
import { Menu } from './menu/enitity/menu.entity';
import { RoomMng } from './room_mng/enitity/room-mng.entity';
import { RoomService } from './room-service/enitity/room-service.entity';
import { ServiceRequests } from './service-requests/enitity/service-req.entity';
import { StaffAttendance } from './staff-attendance/enitity/staff-attendence.entity';
import { StaffMng } from './staff_mng/enitity/stff-mng.entity';
import { StaffShifts } from './staff-shifts/enitity/staff-shifts.entity';
import { TaskMng } from './task-mng/enitity/task-mng.entity';
import { UserAccounts } from './user-accounts/enitity/user-account.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',

      database: 'HMSS',
      entities: [
        Booking,
        Customer,
        ChannelManagement,
        BookingDetails,
        RoomReservation,
        Payment,
        GuestMng,
        InventoryMng,
        PurchaseOrderMng,
        Supplier,
        Feedback,
        AuditLogs,
        KotGeneration,
        LostFoundManagement,
        Menu,
        RoomMng,
        RoomService,
        ServiceRequests,
        StaffAttendance,
        StaffMng,
        StaffShifts,
        TaskMng,
        UserAccounts,
      ],
      autoLoadEntities: true,

      synchronize: true,
    }),
    AuthModule,
    CustomerDetailsModule,
    BookingsModule,
    StaffMngModule,
    RoomMngModule,
    PaymentModule,
    FeedbackModule,
    RoomReservationModule,
    GuestMngModule,
    InventoryMngModule,
    RoomServiceModule,
    ChannelManagementModule,
    UserAccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
