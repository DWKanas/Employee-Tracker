const express = require('express');
const sql = require('mysql2');
const inquirer = require('inquirer')
// const sequelize = require('./config/connection');
require('dotenv').config();
const { Department, Employee, Role } = require('./resources')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = sql.createConnection(
    {
        host: 'localhost',
        
        user: 'root',
        
        password: 'pass',
        database: 'company_db'
    },
    console.log(`Connected to the employees_db database.`)
);

departmentArray = [];
roleArray = [];
employeeArray = [];
mainChoiceArr = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']


function mainSplash() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'main',
                choices: mainChoiceArr,
            },
        ])
        .then(answer => {
            switch (answer.main) {
                case 'View all departments':
                    viewDepartment();
                    break;

                case 'View all roles':
                    viewRoles();
                    break;

                case 'View all employees':
                    viewEmployees();
                    break;

                case 'Add a department':
                    addDep();
                    break;

                case 'Add a role':
                    addRole();
                    break;

                case 'Add an employee':
                    addEmp();
                    break;

                case 'Update an employee role':
                    updRole();
                    break;

                default:
                    buildTeam();
                    break;
            }
        })
}

function addEmp() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the employees first name?',
                name: 'firstname'
            },
            {
                type: 'input',
                message: 'What is the employees last name?',
                name: 'lastname'
            },
            {
                type: 'input',
                message: 'What is the employees title?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is the employees role?',
                name: 'role'
            },
            {
                type: 'input',
                message: 'Who is the employees manager?',
                name: 'manager'
            },
        ])
        .then(answers => {
            const employee = new Employee(
                answers.firstname,
                answers.lastname,
                answers.title,
                answers.role,
                answers.manager,
            )
            employeeArray.push(employee);
            console.log(employeeArray)

            const sql = `INSERT INTO employees(first_name, last_name, role_id) VALUES (?, ?, ?);`;
            const params = [employee.first_name, employee.last_name, employee.role_id]
            db.query(sql, params, (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('\n');
                    viewEmployees();
                    console.log('\n');
                }
                console.log('~~~~~~~~~~~~~~~~~~~~~~')
                mainSplash();
            })
        })
};

function addRole() {
    let departmentChoices = [];
    let depChoiceMapped = [];
    const sql = `SELECT id, name FROM departments;`;
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            departmentChoices= data;
            depChoiceMapped = departmentChoices.map(element => {
                return {name: element.name, value: element.id}
            })
            console.log(depChoiceMapped)
        }
        inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the role title?',
                name: 'roleTitle'
            },
            {
                type: 'input',
                message: 'What is the salary for the role?',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'What is the department for this role?',
                name: 'roleDep',
                choices: depChoiceMapped
            },
        ])
        .then(answers => {
            const role = new Role(
                answers.roleTitle,
                answers.salary,
                answers.roleDep,
            )
            console.log(role);
            roleArray.push(role);
            const sql = `INSERT INTO roles(title, salary, department_id) VALUES (?, ?, ?);`;
            const params = [role.title, role.salary, role.department]
            db.query(sql, params, (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('\n')
                    viewRoles();
                    console.log('\n')
                }

            })
            console.log('~~~~~~~~~~~~~~~~~~~~~~')
            mainSplash();
        })
    });
};


function addDep() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the department name?',
                name: 'depName'
            },
        ])
        .then(answers => {
            const department = new Department(
                answers.depName,
            )
            departmentArray.push(department);
            const sql = `INSERT INTO departments(name) VALUES (?);`;
            const params = [department.name]
            db.query(sql, params, (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('\n')
                    viewDepartment();
                    console.log('\n')
                }
            })
            console.log('~~~~~~~~~~~~~~~~~~~~~~')
            mainSplash();
        })
};

function viewDepartment() {
    const sql = `SELECT * FROM departments;`;
    db.query(sql, function (err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log('\n');
            console.table(data);
            console.log('\n');
        }
        console.log('~~~~~~~~~~~~~~~~~~~~~~');
        mainSplash();
    });
}

function viewEmployees() {
    const sql = `SELECT * FROM employees;`;
    db.query(sql, function (err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log('\n');
            console.table(data);
            console.log('\n');
        }
        console.log('~~~~~~~~~~~~~~~~~~~~~~');
        mainSplash();
    });
}
function viewRoles() {
    const sql = `SELECT * FROM roles;`;
    db.query(sql, function (err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log('\n');
            console.table(data);
            console.log('\n');
        }
        console.log('~~~~~~~~~~~~~~~~~~~~~~');
        mainSplash();
    });
}
mainSplash()


module.exports = db;