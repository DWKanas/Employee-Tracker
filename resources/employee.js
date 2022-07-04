class Employee {
    constructor(firstname, lastname, title, role, manager) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.title = title;
        this.role = role; //ID
        this.manager = manager;
    }
}

module.exports = Employee;  