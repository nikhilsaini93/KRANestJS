Assignment: Role-Based Authentication with Hierarchical User Permissions
 
->Design and implement a role-based authentication system in NestJS with strict hierarchical control, scoped access, and cascading deactivation logic.
There are 4 types of users in this system:
1-Admin
2-SuperAdmin
3-ControlUser
4-EndUser

REquirement actions->
Admin → can create SuperAdmin
SuperAdmin → can create ControlUser
ControlUser → can create EndUser
->Each user only has control over the users they have directly or indirectly created.

For example:
->ControlUser1 cannot view or manage ControlUser2 or their EndUsers.
->Same applies for SuperAdmins and Admins.
Task Requirements
1. Define Roles
Create a Role enum: ADMIN, SUPERADMIN, CONTROL_USER, END_USER.
2. User Entity Design
Include:
role: Enum type
createdBy: Self-referencing relation
isActive: Boolean flag to track active/deactivated status
3. Implement Authentication
->Use Passport and JWT for login and route protection.
->Protect all sensitive routes with JWT guard.
4. Role-Based Authorization
Create:
@Roles() decorator
RolesGuard to restrict access based on roles
 6. Access Rules:
Admin
Can view all SuperAdmins created under them..
SuperAdmin
Can view & manage their own created ControlUsers.
Cannot access or manage other SuperAdmin's ControlUsers.
ControlUser
Can view & manage their own created EndUsers.
Cannot access or manage another ControlUser's EndUsers.
EndUser
Has no access to manage anyone.
❗Important Note:
For example:
ControlUser1 can manage (create, update, deactivate) EndUsers they created.
ControlUser1 cannot view or manage any data related to ControlUser2 or their EndUsers.

7. Cascading Deactivation Logic 
->If a SuperAdmin deactivates a ControlUser, all of that ControlUser’s EndUsers should also be deactivated
->Deactivation is soft: no deletion, just setting isActive = false
->This should be recursive and follow the hierarchy
8. Create Protected API Endpoints
POST /auth/login → User login
POST /users/create → Create user under hierarchy
GET /users → List only scoped users
PATCH /users/:id/deactivate → Deactivate a user and its subtree
 9. Test Cases to Cover
Log in as each role and verify role-based creation
Try accessing users not created by current user (should be denied)
Deactivate a ControlUser → verify all their EndUsers are also deactivated
Deactivate a SuperAdmin → verify all related ControlUsers and EndUsers are deactivated

covered concept->
Authentication
Proper JWT setup and route protection
Role Guard
Effective use of RolesGuard and @Roles()
User Hierarchy
Strict creation limits and scoped visibility
Cascading Deactivation
Logical and consistent implementation
 Clean Code
Well-structured services, controllers, and modules



