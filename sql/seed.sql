INSERT INTO employee (first_name, last_name, role_id, manager_id) 
    VALUES  ("Todd", "Smith", 2, 4),
            ("Kevin", "Jameson", 1, 3),
            ("Sarah", "Johnson", 3, 4),
            ("Rebeccah", "Lorentz", 5, 2),
            ("Greg", "Siggins", 1, 1);


INSERT INTO roles (title, salary, department_id)
VALUES  ("Senior Engineer", 120000, 2),
        ("Junior Engineer", 60000, 2),
        ("Marketing", 75000, 3),
        ("Sales", 65000, 3),
        ('Executive', 150000, 1);

INSERT INTO departments (name)
VALUES  ('Administration'),
        ('Programming'),
        ('Sales and Marketing');