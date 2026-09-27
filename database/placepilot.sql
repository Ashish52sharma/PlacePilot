CREATE DATABASE placepilot;

USE placepilot;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    company VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    package_lpa DECIMAL(5,2),
    location VARCHAR(100),
    status VARCHAR(50),
    applied_date DATE,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE interviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    application_id INT NOT NULL,
    round_name VARCHAR(100),
    interview_date DATE,
    status VARCHAR(50),
    notes TEXT,
    FOREIGN KEY (application_id) REFERENCES applications(id)
);
CREATE TABLE preparation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    topic VARCHAR(100),
    category VARCHAR(50),
    completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);