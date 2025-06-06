create or replace function check_salary()
returns trigger as $$
begin 
if new.salary < 0  then 
new.salary := 0;
end if ;
return new  ;
end ;
$$ language plpgsql

DROP TRIGGER IF EXISTS before_insert_salary ON emp;

create trigger before_insert_salary 
before insert OR UPDATE ON emp
for each row 
execute function check_salary()


create or replace procedure update_emp_salary(p_emp_id INT ,p_new_salary NUMERIC )
LANGUAGE plpgsql
as $$
begin 
 UPDATE emp
    SET salary = p_new_salary
    WHERE emp_id = p_emp_id;
end;
$$;
select * from emp

call update_emp_salary(1 ,405)