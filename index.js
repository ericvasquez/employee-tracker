var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "IRLYH8kat33**",
database: "employee_db"
});
connection.connect(function(err) {
if (err) throw err;
  start();
});
function start() {
inquirer
    .prompt({
name: "action",
type: "list",
message: "What do you want to do?",
choices: ["Add Department", "Add Role", "Add Employee", "View All Departments", "View All Roles", "View All Employees", "Update Employee's Role"]
})
.then(function(answer) {
      if (answer.action === "Add Department") {
addDepartment();
}
else if (answer.action === "Add Role") {
    addRole();
    }
else if (answer.action === "Add Employee") {
        addEmployee();
        }
else if(answer.action === "View All Departments") {
viewAllDepartments();
} 
else if(answer.action === "View All Roles") {
    viewAllRoles();
    } 
else if(answer.action === "View All Employees") {
        viewAllEmployees();
        } 
        else if(answer.action === "Update Employee's Role") {
            updateEmployeeRole();
            } 
else{
connection.end();
}
});
}

function addDepartment() {
  inquirer
    .prompt([
{name: "name",
type: "input",
message: "What is the new department name?"
      },
])
.then(function(answer) {
      connection.query(
"INSERT INTO department SET ?",
{
name: answer.name,
        },
        function(err) {
if (err) throw err;
console.log("Your department was created successfully!");
          start();
}
);
});
}

function addRole() {
    inquirer
      .prompt([
  {name: "title",
  type: "input",
  message: "What role do you want to add?"
        },
        {
  name: "salary",
  type: "input",
  message: "What is the salary?"
        },
        {
  name: "department_id",
  type: "input",
  message: "What is the department id?",
  validate: function(value) {
  if (isNaN(value) === false) {
  return true;
  }
  return false;
  }
  }
  ])
  .then(function(answer) {
        connection.query(
  "INSERT INTO role SET ?",
  {
  title: answer.title,
  salary: answer.salary,
  department_id: answer.department_id
          },
          function(err) {
  if (err) throw err;
  console.log("Your new role was created successfully!");
            start();
  }
  );
  });
  }

  function addEmployee() {
    inquirer
      .prompt([
  {name: "first_name",
  type: "input",
  message: "What is the first name?"
        },
        {
  name: "last_name",
  type: "input",
  message: "What is the last name?"
        },
        {
  name: "role_id",
  type: "input",
  message: "What is the role id?",
  validate: function(value) {
  if (isNaN(value) === false) {
  return true;
  }
  return false;
  }
  },
  {
    name: "manager_id",
    type: "input",
    message: "What is the manager id?",
    validate: function(value) {
    if (isNaN(value) === false) {
    return true;
    }
    return false;
    }
    }
  ])
  .then(function(answer) {
        connection.query(
  "INSERT INTO employee SET ?",
  {
  first_name: answer.first_name,
  last_name: answer.last_name,
  role_id: answer.role_id,
  manager_id: answer.manager_id
          },
          function(err) {
  if (err) throw err;
  console.log("Your new employee was created successfully!");
            start();
  }
  );
  });
  }

function viewAllDepartments() {
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }

  function viewAllRoles() {
    connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }
  function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }

  function updateEmployeeRole() {
    connection.query("SELECT * FROM employee", function(err, results) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].first_name);
              }
              return choiceArray;
            },
            message: "What employee do you want to update?"
          },
          {
            name: "role_id",
            type: "input",
            message: "What is the new role id?"
          }
        ])
        .then(function(answer) {
          var chosenEmployee;
          for (var i = 0; i < results.length; i++) {
            if (results[i].first_name === answer.choice) {
              chosenEmployee = results[i];
            }
          }

            connection.query(
              "UPDATE employee SET ? WHERE ?",
              [
                {
                  role_id: answer.role_id
                },
                {
                  id: chosenEmployee.id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("Role updated successfully!");
                start();
              }
            );
        });
    });
  }