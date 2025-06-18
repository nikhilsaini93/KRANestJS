# Hotel Management System API Documentation

## Authentication
```http
POST /auth/login          # User login
GET /auth/audit-logs      # Get all audit logs
GET /auth/audit-logs/:id  # Get specific audit log by ID
GET /auth/audit-logs/:id/user # Get audit logs for specific user
```

## User Accounts
```http
POST /user-accounts/register     # Register new user (Admin, Manager, Staff)
GET /user-accounts              # Get all users (Admin, Manager)
GET /user-accounts/:id          # Get user by ID
PATCH /user-accounts/:id/promote-to-manager # Promote staff to manager (Admin only)
```

## Room Management
```http
GET /room-mng                    # Get all rooms
GET /room-mng/:id               # Get room by ID
GET /room-mng/lost-found        # Get all lost & found items
GET /room-mng/lost-found/:id    # Get lost & found item by ID
GET /room-mng/housekeeping-tasks # Get all housekeeping tasks
GET /room-mng/housekeeping-tasks/:id # Get housekeeping task by ID
GET /room-mng/housekeeping-tasks/staff/:id # Get tasks by staff ID
GET /room-mng/housekeeping-tasks/room/:id  # Get tasks by room ID
POST /room-mng                   # Create new room
POST /room-mng/lost-found       # Create lost & found entry
POST /room-mng/housekeeping-tasks # Create housekeeping task
```

## Staff Management
```http
GET /staff-mng                  # Get all staff
GET /staff-mng/:id             # Get staff by ID
GET /staff-mng/attendance      # Get all attendance records
GET /staff-mng/attendance/:id  # Get attendance by ID
GET /staff-mng/attendance/staff/:staffId # Get attendance by staff ID
GET /staff-mng/shifts          # Get all shifts
GET /staff-mng/shifts/:id      # Get shift by ID
GET /staff-mng/shifts/staff/:staffId # Get shifts by staff ID
GET /staff-mng/task           # Get all tasks
GET /staff-mng/task/:id       # Get task by ID
GET /staff-mng/task/staff/:staffId # Get tasks by staff ID
POST /staff-mng              # Create new staff
POST /staff-mng/attendance/check-in/:id # Staff check-in
POST /staff-mng/attendance/check-out/:id # Staff check-out
POST /staff-mng/shifts      # Create shift
POST /staff-mng/task       # Create task
DELETE /staff-mng/:id      # Delete staff
DELETE /staff-mng/shifts/:id # Delete shift
DELETE /staff-mng/task/:id  # Delete task
```

## Guest Management
```http
GET /guest-mng              # Get all guests
GET /guest-mng/:id         # Get guest by ID
GET /guest-mng/service     # Get all services
GET /guest-mng/service/:id # Get service by ID
GET /guest-mng/service/guest/:id # Get services by guest ID
POST /guest-mng           # Create new guest
POST /guest-mng/service   # Create service request
PATCH /guest-mng/service/:id/status/:status # Update service status
```

## Room Service
```http
GET /room-service         # Get all room services
GET /room-service/:id    # Get room service by ID
GET /room-service/menu   # Get all menu items
GET /room-service/menu/:id # Get menu item by ID
GET /room-service/kot    # Get all KOT entries
GET /room-service/kot/:id # Get KOT by ID
POST /room-service       # Create room service
POST /room-service/menu  # Create menu item
POST /room-service/kot   # Create KOT
```

## Bookings
```http
GET /bookings            # Get all bookings
GET /bookings/:id       # Get booking by ID
GET /bookings/details   # Get all booking details
GET /bookings/details/:id # Get booking details by ID
GET /bookings/customerdetails/:id # Get bookings by customer ID
POST /bookings          # Create new booking
POST /bookings/details  # Create booking details
PATCH /bookings/:id     # Update booking
DELETE /bookings/:id    # Delete booking
```

## Room Reservations
```http
GET /room-reservation    # Get all reservations
POST /room-reservation  # Create new reservation
PATCH /room-reservation/:id/check-in  # Record check-in
PATCH /room-reservation/:id/check-out # Record check-out
PATCH /room-reservation/:id/status/:status # Update reservation status
DELETE /room-reservation/:id # Delete reservation
```

## Customer Management
```http
GET /customer-details    # Get all customers
GET /customer-details/:id # Get customer by ID
POST /customer-details   # Create new customer
PATCH /customer-details/:id # Update customer
DELETE /customer-details/:id # Delete customer
PATCH /customer-details/:id/status/:status # Update customer status
```

## Payments
```http
GET /payment            # Get all payments
GET /payment/:id       # Get payment by ID
POST /payment          # Create new payment
PATCH /payment/:id/status # Update payment status
```

## Feedback
```http
GET /feedback          # Get all feedback
GET /feedback/:id     # Get feedback by ID
POST /feedback        # Create new feedback
```

## Inventory Management
```http
GET /inventory-mng    # Get all inventory
GET /inventory-mng/:id # Get inventory by ID
GET /inventory-mng/purchase-order # Get all purchase orders
GET /inventory-mng/purchase-order/:id # Get purchase order by ID
GET /inventory-mng/supplier # Get all suppliers
GET /inventory-mng/supplier/:id # Get supplier by ID
POST /inventory-mng   # Create inventory item
POST /inventory-mng/purchase-order # Create purchase order
POST /inventory-mng/supplier # Create supplier
```

### Authentication Required
Most endpoints require JWT authentication. Include the token in the Authorization header:
```http
Authorization: Bearer <your-jwt-token>
```

### Total Count: 74 Endpoints
This includes:
```http
GET: 35 endpoints
POST: 21 endpoints
PATCH: 12 endpoints
DELETE: 6 endpoints
```

### Role-Based Access Control
- ADMIN: Full access to all endpoints
- MANAGER: Limited administrative access
- STAFF: Basic operational access