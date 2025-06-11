<!-- <p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).





 -->



-- =======================
-- 1. CUSTOMER MANAGEMENT
-- =======================

CREATE TABLE customer_details (
    customer_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    phone NUMERIC(10,0) NOT NULL CHECK (char_length(phone::text) = 10),
    dob DATE,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode NUMERIC(6,0),
    customer_status VARCHAR(20) DEFAULT 'active',
    id_type VARCHAR(50),
    id_number VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATE DEFAULT CURRENT_DATE
);

-- ===================
-- 2. HOTEL BOOKING
-- ===================

CREATE TABLE booking_details (
    booking_details_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    booking_date DATE NOT NULL,
    room_type VARCHAR(50),
    is_available BOOLEAN DEFAULT TRUE,
    total_bill NUMERIC CHECK (total_bill >= 0),
    payment_id INT
);

CREATE TABLE booking (
    booking_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    hotel_name VARCHAR(100) NOT NULL,
    room_type VARCHAR(50),
    date DATE NOT NULL,
    customer_id INT NOT NULL,
    booking_details_id INT NOT NULL,
    is_availability BOOLEAN DEFAULT TRUE,
    amenities TEXT,
    FOREIGN KEY (customer_id) REFERENCES customer_details(customer_id),
    FOREIGN KEY (booking_details_id) REFERENCES booking_details(booking_details_id)
);

-- ==========================
-- 3. ROOM & HOUSEKEEPING
-- ==========================

CREATE TABLE room_mng (
    room_number INT PRIMARY KEY,
    room_type VARCHAR(50) NOT NULL,
    room_status_cleaning VARCHAR(20) DEFAULT 'dirty',
    room_inspection VARCHAR(100),
    assigned_customer_id INT,
    housekeeping_task_assign_id INT,
    FOREIGN KEY (assigned_customer_id) REFERENCES guest_mng(id)
);

CREATE TABLE housekeeping_tasks (
    task_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    room_id INT NOT NULL,
    task_type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending',
    assigned_staff_id INT,
    scheduled_date DATE,
    completed_at TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES room_mng(room_number),
    FOREIGN KEY (assigned_staff_id) REFERENCES staff_mng(id)
);

-- ==================
-- 4. GUEST MANAGEMENT
-- ==================

CREATE TABLE guest_mng (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    room_reservation_id INT,
    special_req_preference TEXT,
    vip_access BOOLEAN DEFAULT FALSE,
    feedback_id INT,
    room_updated VARCHAR(50),
    FOREIGN KEY (room_reservation_id) REFERENCES room_reservation(res_id),
    FOREIGN KEY (feedback_id) REFERENCES feedback(feedback_id)
);

-- =====================
-- 5. ROOM RESERVATION
-- =====================

CREATE TABLE room_reservation (
    res_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    hotelbooking_id INT NOT NULL,
    booking_type VARCHAR(30),
    room_reservation_status VARCHAR(30) DEFAULT 'pending',
    is_room_available BOOLEAN DEFAULT TRUE,
    check_in TIMESTAMP,
    check_out_time TIMESTAMP,
    channel_mng_id INT,
    extra_fees NUMERIC DEFAULT 0 CHECK (extra_fees >= 0),
    FOREIGN KEY (hotelbooking_id) REFERENCES booking(booking_id),
    FOREIGN KEY (channel_mng_id) REFERENCES channel_management(channel_mng_id)
);

-- ===================
-- 6. PAYMENT & BILLING
-- ===================

CREATE TABLE payment (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    payment_type VARCHAR(50),
    full_or_partial VARCHAR(20),
    advance_payment NUMERIC DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending',
    refund NUMERIC DEFAULT 0,
    payment_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE invoice (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    guest_id INT,
    amount NUMERIC CHECK (amount >= 0),
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (guest_id) REFERENCES guest_mng(id)
);

-- ===========================
-- 7. STAFF & HR MANAGEMENT
-- ===========================

CREATE TABLE staff_attendance (
    staff_attendance_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    staff_id INT NOT NULL,
    date DATE NOT NULL,
    check_in TIMESTAMP,
    check_out TIMESTAMP
);

CREATE TABLE staff_shifts (
    staff_shift_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    staff_id INT NOT NULL,
    shift_start TIME NOT NULL,
    shift_end TIME NOT NULL,
    shift_date DATE NOT NULL
);

CREATE TABLE task_mng (
    task_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    task_type VARCHAR(50),
    description TEXT
);

CREATE TABLE staff_mng (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    staff_type INT,
    role VARCHAR(50),
    salary NUMERIC CHECK (salary >= 0),
    dept VARCHAR(50),
    attendance_id INT,
    staff_shift_id INT,
    task_assign_id INT,
    FOREIGN KEY (attendance_id) REFERENCES staff_attendance(staff_attendance_id),
    FOREIGN KEY (staff_shift_id) REFERENCES staff_shifts(staff_shift_id),
    FOREIGN KEY (task_assign_id) REFERENCES task_mng(task_id)
);

-- ========================
-- 8. MENU & ROOM SERVICE
-- ========================

CREATE TABLE menu (
    menu_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    description TEXT,
    menu_type VARCHAR(50),
    price NUMERIC CHECK (price >= 0)
);

CREATE TABLE kot_generation (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_type VARCHAR(50)
);

CREATE TABLE room_service (
    room_service_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    guest_id INT,
    staff_id INT,
    table_id INT,
    ticket_order_id INT,
    menu_id INT,
    total_bill NUMERIC CHECK (total_bill >= 0),
    FOREIGN KEY (guest_id) REFERENCES guest_mng(id),
    FOREIGN KEY (staff_id) REFERENCES staff_mng(id),
    FOREIGN KEY (ticket_order_id) REFERENCES kot_generation(id),
    FOREIGN KEY (menu_id) REFERENCES menu(menu_id)
);

-- =============================
-- 9. CHANNEL MANAGEMENT & OTA
-- =============================

CREATE TABLE channel_management (
    channel_mng_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    customer_id INT,
    ota VARCHAR(100),
    room_type VARCHAR(50),
    isavailability BOOLEAN DEFAULT TRUE,
    date DATE,
    amenities TEXT,
    total_bill NUMERIC,
    payment_id INT,
    FOREIGN KEY (customer_id) REFERENCES customer_details(customer_id),
    FOREIGN KEY (payment_id) REFERENCES payment(id)
);

-- =======================
-- 10. INVENTORY & SUPPLY
-- =======================

CREATE TABLE supplier (
    sup_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    company_name VARCHAR(100),
    city VARCHAR(100),
    phone NUMERIC(10,0),
    email VARCHAR(100)
);

CREATE TABLE purchase_order_mng (
    purchase_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    supplier_id INT,
    item_id INT,
    quantity INT CHECK (quantity > 0),
    order_date DATE,
    FOREIGN KEY (supplier_id) REFERENCES supplier(sup_id)
);

CREATE TABLE inventory_mng (
    inv_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    inventory_type VARCHAR(50),
    supplier_id INT,
    stock VARCHAR(100),
    reorder_date DATE,
    expiry_inventory DATE,
    purchase_order_id INT,
    FOREIGN KEY (purchase_order_id) REFERENCES purchase_order_mng(purchase_id)
);

-- ===================
-- 11. GUEST FEEDBACK
-- ===================

CREATE TABLE feedback (
    feedback_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    guest_id INT,
    feedback_type VARCHAR(50),
    description TEXT,
    rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
    suggestion TEXT
);

-- ===================
-- 12. LOST & FOUND
-- ===================

CREATE TABLE lost_found_management (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    room_id INT,
    item_description VARCHAR(255),
    date_found DATE,
    status VARCHAR(50),
    FOREIGN KEY (room_id) REFERENCES room_mng(room_number)
);

-- =========================
-- 13. SERVICE REQUESTS
-- =========================

CREATE TABLE service_requests (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    guest_id INT,
    service_type VARCHAR(50),
    description TEXT,
    status VARCHAR(30),
    FOREIGN KEY (guest_id) REFERENCES guest_mng(id)
);

-- =========================
-- 14. USER & SECURITY
-- =========================

CREATE TABLE user_accounts (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(30),
    staff_id INT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (staff_id) REFERENCES staff_mng(id)
);

CREATE TABLE audit_logs (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT,
    log_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_accounts(id)
);

-- ============================
-- 15. OPTIONAL / ADVANCED ADD-ONS
-- ============================

CREATE TABLE guest_loyalty (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    guest_id INT,
    loyalty_points INT DEFAULT 0,
    membership_level VARCHAR(50),
    FOREIGN KEY (guest_id) REFERENCES guest_mng(id)
);

CREATE TABLE smart_room_devices (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    room_id INT,
    device_type VARCHAR(50),
    status VARCHAR(30),
    last_sync TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES room_mng(room_number)
);

CREATE TABLE event_bookings (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    guest_id INT,
    event_type VARCHAR(50),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    venue VARCHAR(100),
    status VARCHAR(30),
    FOREIGN KEY (guest_id) REFERENCES guest_mng(id)
);






🧾 1. Front Office / Reservation Management
Customer
POST /customers – Create new customer

GET /customers – Get all customers

GET /customers/:id – Get customer by ID

PUT /customers/:id – Update customer

DELETE /customers/:id – Delete customer

Booking
POST /bookings – Create a booking (walk-in / online)

GET /bookings – Get all bookings

GET /bookings/:id – Get booking by ID

PUT /bookings/:id – Modify booking

DELETE /bookings/:id – Cancel booking

Booking Details
GET /booking-details/:id – View booking detail

POST /booking-details – Create booking detail

Check-in / Check-out
POST /room-reservation/checkin – Guest check-in

POST /room-reservation/checkout – Guest check-out

🛏️ 2. Room & Housekeeping
Room Management
GET /rooms – View all rooms

GET /rooms/:id – View room by ID

PUT /rooms/:id/status – Update room status (clean, dirty, etc.)

POST /rooms – Add new room

PUT /rooms/:id – Update room info

Housekeeping Tasks
GET /tasks/housekeeping – View all housekeeping tasks

POST /tasks/housekeeping – Assign housekeeping task

Lost & Found
POST /lost-found – Report item

GET /lost-found – View all lost & found items

👤 3. Guest Management
Guest Info
POST /guests – Register guest

GET /guests – Get all guests

GET /guests/:id – Get guest by ID

PUT /guests/:id – Update guest info

Preferences / Feedback
PUT /guests/:id/preferences – Update preferences

POST /feedback – Submit feedback

GET /feedback – View all feedbacks

💳 4. Billing & Payment
Payment
POST /payments – Make payment

GET /payments – Get all payments

GET /payments/:id – Get payment by ID

PUT /payments/:id – Update payment status

POST /payments/refund – Process refund

🍽️ 5. Restaurant & Room Service (POS)
Menu
GET /menu – View menu

POST /menu – Add item to menu

Room Service
POST /room-service – Create room service request

GET /room-service/:guestId – Get services for guest

KOT Generation
POST /kot – Generate KOT for order

🧹 6. Inventory & Procurement
Suppliers
POST /suppliers – Add supplier

GET /suppliers – View suppliers

Purchase Orders
POST /purchase-orders – Create purchase order

GET /purchase-orders – View all purchase orders

Inventory
GET /inventory – View inventory

POST /inventory – Add inventory stock

PUT /inventory/:id/reorder – Update reorder status

🧑‍🍳 7. Staff & HR Management
Staff
POST /staff – Add staff

GET /staff – View all staff

PUT /staff/:id – Update staff info

Attendance
POST /attendance – Mark attendance

GET /attendance/:staffId – View attendance history

Shifts
POST /shifts – Assign shift

GET /shifts/:staffId – View staff shift

Tasks
POST /tasks – Assign task to staff

🌐 8. Channel Management & Integrations
POST /channels – Add OTA channel info

GET /channels – View all channel integrations

PUT /channels/:id – Update OTA data

📱 9. Guest Self-Service & Mobile Access
GET /self-service/bill/:guestId – View current bill

POST /self-service/checkin – Self check-in

POST /self-service/checkout – Self check-out

POST /self-service/service-request – Request service from mobile

📊 10. Reports & Analytics
GET /reports/daily – Daily occupancy & revenue report

GET /reports/feedback – Guest satisfaction report

GET /reports/performance – Sales dashboard

GET /audit-logs – View system activity logs

🔐 11. Security & User Access
User Accounts
POST /auth/register – Register user

POST /auth/login – Login user

GET /users/:id – View user info

PUT /users/:id/role – Update role (RBAC)

Audit Logs
GET /audit-logs – View access & activity logs

🧩 12. Optional / Advanced Features
Events, CRM, Spa, etc.
POST /event-booking – Book banquet/event hall

POST /spa-services – Book spa services

GET /loyalty/:guestId – View guest loyalty status

🧰 AUTH + MIDDLEWARE (Global)
JWT Auth Middleware

Role Guards (Admin, Staff, Guest)

Validation Pipe (class-validator)

Logging Middleware for Audit Logs

