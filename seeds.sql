USE employee_db;

INSERT INTO department (name)
VALUES
("Human Resources"),
("Sales");

INSERT INTO role (title, salary, department_id)
VALUES
("Manager", 50000, 1),
("Supervisor", 60000, 2),
("Clerk", 30000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Chris", "Christopherson", 1, 4),
("Matt", "Heafy", 2, 5),
("Mike", "Michaelson", 3, 6);


