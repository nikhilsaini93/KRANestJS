 Level 1 – Basic (10 Questions)
List all customers from the city 'Noida'.

Find the total number of products available.

Display all payment methods that are allowed.

Show the name and email of customers whose country is India.

List all suppliers from the state 'MH'.

Display all the products that belong to the category 'Skin Care'.

Find the total number of orders made by customer ID 2.

List all orders where the total order amount is greater than 500.

Show all products with a sale price less than 300.

List all shippers along with their phone numbers.

🔸 Level 2 – Intermediate (10 Questions)
Get the total sales (sum of Total_order_amount) made in the month of September 2022.
SELECT SUM(Total_order_amount) AS TotalSales
FROM Orders
WHERE OrderDate BETWEEN '2022-09-01' AND '2022-09-30';


List all customers who have placed more than one order.
SELECT c.CustomerID, c.FirstName, c.LastName, COUNT(o.OrderID) AS OrderCount
FROM customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
GROUP BY c.CustomerID, c.FirstName, c.LastName
HAVING COUNT(o.OrderID) > 1;


Find the product names along with their brand and category.



Display order details with customer name, product name, and quantity.
select o.customerID , od.orderID , c.firstname ,p.product, od.quantity  from orders o
join customers c on c.customerID = o.customerID
join orderdetails od on od.orderID = o.orderID
join products p on p.productID = od.productID


List the suppliers who provided products for orders above ₹500.
select s.SupplierID, s.CompanyName, o.OrderID, o.Total_order_amount from Orders o
join OrderDetails od ON o.OrderID = od.OrderID
join  Products p ON od.ProductID = p.ProductID
join Suppliers s ON od.SupplierID = s.SupplierID
where o.Total_order_amount > 500;

Get the total quantity of each product sold (use GROUP BY).
select p.product, Sum(od.quantity) from products p
join orderdetails od ON od.ProductID = p.ProductID
group by p.product

Show all products whose market price is greater than their sale price by more than ₹100.
select ProductID, Product, Market_Price, Sale_Price, 
       (Market_Price - Sale_Price) AS Difference
from  Products
where (Market_Price - Sale_Price) > 100;


List the names of categories that have at least one product.
select DISTINCT c.CategoryID, c.CategoryName
from Category c
join Products p ON c.CategoryID = p.Category_ID;


Get all orders shipped by 'Blue Dart'.
select o.OrderID, o.ShipperID, s.CompanyName, o.ShipDate, o.DeliveryDate from orders o 
join shippers s on s.ShipperID = o.ShipperID 
where companyName = 'Blue Dart';

Find all customers who made payments via 'Credit Card'.
select c.firstname , c.lastname from customers c
join orders o on o.customerID = c.customerID
join payments p on p.paymentID = o.paymentID
where paymentType ='Credit Card'

🔺 Level 3 – Advanced (10 Questions)
Find the customer who spent the highest total amount on orders.
select c.customerid, c.firstname, c.lastname, sum(o.total_order_amount) as totalspent
from customers c
join orders o on c.customerid = o.customerid
group by c.customerid, c.firstname, c.lastname
order by totalspent desc
limit 1;


Display the most frequently ordered product.
select p.productid, p.product, sum(od.quantity) as totalorders
from orderdetails od
join products p on od.productid = p.productid
group by p.productid, p.product
order by totalorders desc
--limit 1;

List customers who have not placed any orders.
select customerid, firstname, lastname
from customers
where customerid not in (select distinct customerid from orders);


Show top 3 cities by number of customers.
select city, count(*) as customercount
from customers
group by city
order by customercount desc
limit 3;


Display each category and total sales from products in that category.


Find customers who bought products from more than one supplier.

List all products that were never ordered.

Get each customer's latest order date.

Find which shipper delivered the most orders.

List suppliers who have supplied more than 2 different products.












CREATE OR REPLACE PROCEDURE update_emp_salary(
    p_employee_id INT,
    p_new_salary NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE emp
    SET salary = p_new_salary
    WHERE emp_id = p_employee_id;
END;
$$;

CALL update_emp_salary(2, 65000);

select * from emp


CREATE OR REPLACE VIEW high_earners AS
SELECT emp_id, fname, salary
FROM emp
WHERE salary > 50000;

SELECT * FROM high_earners;



CREATE OR REPLACE FUNCTION dept_max_sal_emp1(dept_name VARCHAR)

RETURNS TABLE(emp_id INT, fname VARCHAR, salary NUMERIC) 

AS $$

BEGIN

    RETURN QUERY

    SELECT 

        e.emp_id,  e.fname, e.salary

    FROM 

        emp e

    WHERE 

        e.dept = dept_name

        AND e.salary = (

            SELECT MAX(emp.salary)

            FROM emp 

            WHERE emp.dept = dept_name

        );

END;

$$ LANGUAGE plpgsql;

select dept_max_sal_emp1('HR')
