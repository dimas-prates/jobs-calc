const Database = require('./config')

//Opening db
Database()

Database.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    hour_value INT
)`);
Database.exec(` CREATE TABLE jobs(
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    createdAt DATETIME
)`);

Database.run(`INSERT INTO profile (
    name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
    hour_value
) VALUES (
    "Mayk",
    "https://github.com/maykbrito.png",
    3000,
    5,
    5,
    4,
    75
)`);

Database.run(`INSERT INTO jobs (
    name,
    dayly_hours,
    total_hours,
    createdAt,
) VALUES (
    "Pizzaria Guloso",
    2,
    1,
    1652162486
);`)

Database.run(`INSERT INTO jobs (
    name,
    dayly_hours,
    total_hours,
    createdAt,
) VALUES (
    "OneTwo Project",
    3,
    47,
    1651062585
);`)

Database.close()