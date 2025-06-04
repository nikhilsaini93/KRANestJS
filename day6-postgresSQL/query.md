# 📘 SQL CRUD Operations on `users` Table



---

## 🛠 Table Structure

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    age INT,
    city VARCHAR(100)
);
1️⃣ CREATE Operations
✅ Question 1:
Insert a new user into the users table with the following data:

ID: 21, First Name: Ravi, Last Name: Kumar, Email: ravi@gmail.com, Age: 28, City: Delhi


INSERT INTO users (id, first_name, last_name, email, age, city)
VALUES (21, 'Ravi', 'Kumar', 'ravi@gmail.com', 28, 'Delhi');
✅ Question 2:
Insert a new user with the following data:

First Name: Priya, Last Name: Sharma, Email: priya.sharma@example.com, Age: 26, City: Mumbai


INSERT INTO users (id, first_name, last_name, email, age, city)
VALUES (22, 'Priya', 'Sharma', 'priya.sharma@example.com', 26, 'Mumbai');
2️⃣ READ Operations
✅ Question 3:
Retrieve all the columns (id, first_name, last_name, email, age, city) of all users.


SELECT * FROM users;
✅ Question 4:
Retrieve the first_name, last_name, and city of all users who are older than 30 years.


SELECT first_name, last_name, city FROM users
WHERE age > 30;
✅ Question 5:
Retrieve the first_name, last_name, and email of users who live in Mumbai.


SELECT first_name, last_name, email FROM users
WHERE city = 'Mumbai';
3️⃣ UPDATE Operations
✅ Question 6:
Update the age of the user with id = 2 (Vivaan Verma) to 32.


UPDATE users SET age = 32 WHERE id = 2;
✅ Question 7:
Update the city of the user with id = 1 (Aarav Sharma) to Bangalore.


UPDATE users SET city = 'Bangalore' WHERE id = 1;
✅ Question 8:
Update the email of the user with id = 3 (Diya Iyer) to diya.iyer@newmail.com.


UPDATE users SET email = 'diya.iyer@newmail.com' WHERE id = 3;
4️⃣ DELETE Operations
✅ Question 9:
Delete the user with id = 4 (Anaya Patel) from the users table.


DELETE FROM users WHERE id = 4;
✅ Question 10:
Delete all users who are older than 35 years from the users table.


DELETE FROM users WHERE age > 35;
💡 Bonus Questions – Combined Operations
✅ Question 11:
Add a new user, then immediately update their city to a new value in a single transaction.

Add: First Name: Aakash, Last Name: Singh, Email: aakash.singh@example.com, Age: 22, City: Kolkata
Update: Change city to Delhi



INSERT INTO users (id, first_name, last_name, email, age, city)
VALUES (23, 'Aakash', 'Singh', 'aakash.singh@example.com', 22, 'Kolkata');

UPDATE users SET city = 'Delhi' WHERE id = 23;


✅ Question 12:
Select the first_name, last_name, and age of all users ordered by age in ascending order.


SELECT first_name, last_name, age FROM users
ORDER BY age ASC;
✅ Question 13:
List all users, but only include the id and first_name of users who are from either Mumbai or Delhi.

SELECT id, first_name FROM users
WHERE city IN ('Mumbai', 'Delhi');
✅ Question 14:
Count the total number of users from each city.


SELECT city, COUNT(*) AS user_count FROM users
GROUP BY city;