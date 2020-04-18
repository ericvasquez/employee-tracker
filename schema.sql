create database employee_db;
use employee_db;

create table department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

create table employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR (30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

create table role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL(10,3),
department_id INT,
 PRIMARY KEY (id)
);