-- DROP DATABASE IF EXISTS floweraufdauer;

-- CREATE DATABASE IF NOT EXISTS floweraufdauer;

-- USE floweraufdauer;

-- USERS
CREATE TABLE IF NOT EXISTS users(  
        id int AUTO_INCREMENT PRIMARY KEY NOT NULL,  
        username varchar(255) NOT NULL,  
        firstname varchar(255) NULL,  
        lastname varchar(255) NULL,
        email varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        role ENUM('admin', 'user', 'manager', 'verwalter', 'betreuer') NOT NULL,  
        authToken varchar(255) NULL  
    );

CREATE INDEX IF NOT EXISTS usersIndex ON users(username, lastname, firstname, role);


-- Passwörter mit bcrypt nodejs generiert das entschlüsselte Passwort für diese Benutzer ist "password"
INSERT IGNORE INTO users (id, username, password, role, email) values (1, 'admin', 'password', 'admin', "admin@gmail.com");
INSERT IGNORE INTO users (id, username, firstname, lastname, password, role, email) values (2, 'oszi', 'Stefan', 'Ostojic', "$2b$10$mduoe4DF8LxNr4K6y/lsmO2BsmeM2yMolxQIgffJvpySRCsRmSNy6", 'admin', "oszi@gmail.com");
INSERT IGNORE INTO users (id, username, firstname, lastname, password, role, email) values (3, 'klausi', 'Klaus', 'Musterman', "$2b$10$BYKsVvi1JVnMkI.Lmvc/XeriqNtCog2Qn9r8FwD.6VtNReZtFiY9y", 'user', "klausi@gmail.com");
INSERT IGNORE INTO users (id, username, firstname, lastname, password, role, email) values (4, 'Matzi', 'Matthias', 'Schwenniger', "$2b$10$DxTsp/vdCILc6JSJ8QMlfOHiry1bUpVQl9lZ1Y5q8JBYCL8tRb7am", 'manager', "matzi@gmail.com");
INSERT IGNORE INTO users (id, username, firstname, lastname, password, role, email) values (5, 'Lexi', 'Alexander', 'Tusch', "$2b$10$bTiyZLpRwn358.6u9fuqb.INMK9CdXO9XKy7Wxh8zE6T4WOms6BcG", 'admin', "lexi@gmail.com");
INSERT IGNORE INTO users (id, username, firstname, lastname, password, role, email) values (6, 'Gamper', 'Michael', 'Gamper', "$2b$10$T5FJ1k/j3uvKxB5lPd9B1ehdtXOWDwdI7AMoEz0MS7qJlIR.DsRNK", 'betreuer', 'gamper@gmail.com');


-- FIELDS
CREATE TABLE IF NOT EXISTS fields(  
        id int AUTO_INCREMENT PRIMARY KEY NOT NULL, 
        name varchar(255) NOT NULL, 
        area int NULL,
        unit ENUM("square meter", "hectar", "square kilometer", "square feet", "square yard", "acre") NULL,
        country varchar(2) NULL,
        federalState varchar(255) NULL,
        latitude DOUBLE NULL,
        longitude DOUBLE NULL,
        description varchar(255) NULL
    );
CREATE INDEX IF NOT EXISTS fieldsIndex ON fields(country, federalState);

INSERT IGNORE INTO fields (id, name, area, unit, country, federalState, latitude, longitude, description) values (1, "Feld1", "200", "hectar", "AT", "Tirol", 47.26543, 11.392769, "Feld in Innsbruck"); 
INSERT IGNORE INTO fields (id, name, area, unit, country, federalState, latitude, longitude, description) values (2, "Feld2", "400", "square meter", "AT", "Salzburg", 47.7981346, 13.0464806, "Feld in Salzburg"); 
INSERT IGNORE INTO fields (id, name, area, unit, country, federalState, latitude, longitude, description) values (3, "Landteil", "15", "square kilometer", "AT", "Burgenland", 47.8387577, 16.5362159, "Feld in Eisenstadt"); 


-- SENSORS
CREATE TABLE IF NOT EXISTS sensors(  
        id int AUTO_INCREMENT PRIMARY KEY NOT NULL,  
        fieldID int NOT NULL,
        type varchar(255) NULL,
        locationOnField varchar(255) NULL,
        Foreign key (fieldID) REFERENCES fields(id)
    );
CREATE INDEX IF NOT EXISTS sensorIndex ON sensors(fieldID, type, locationOnField);

INSERT IGNORE INTO sensors (id, fieldID, type, locationOnField) values (1, 1,'Temperatur', "middle"); 
INSERT IGNORE INTO sensors (id, fieldID, type, locationOnField) values (2, 1,'Temperatur', "top left"); 
INSERT IGNORE INTO sensors (id, fieldID, type, locationOnField) values (3, 1,'Temperatur', "top right"); 
INSERT IGNORE INTO sensors (id, fieldID, type, locationOnField) values (4, 1,'Temperatur', "bottom left"); 
INSERT IGNORE INTO sensors (id, fieldID, type, locationOnField) values (5, 1,'Temperatur', "bottom right"); 

INSERT IGNORE INTO sensors (id, fieldID, type, locationOnField) values (6, 2,'Feuchtigkeitssensor', "middle"); 
INSERT IGNORE INTO sensors (id, fieldID, type, locationOnField) values (7, 2,'Feuchtigkeitssensor',  "top left"); 

INSERT IGNORE INTO sensors (id, fieldID, type, locationOnField) values (8, 3,'Luftqualitätssensor', "middle"); 


-- SENSORVALUES
CREATE TABLE IF NOT EXISTS sensorValues(
    id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    sensorId int NOT NULL,
    value varchar(10) NOT NULL,
    timestamp TIMESTAMP  NOT NULL,
    Foreign KEY (sensorId) REFERENCES sensors(id)
);

CREATE INDEX IF NOT EXISTS valueIndex ON sensorValues(id, timestamp);

INSERT IGNORE INTO sensorValues (id, sensorId, value, timestamp) values (1, 1, "12,5", now());
INSERT IGNORE INTO sensorValues (id, sensorId, value, timestamp) values (2, 2, "14,3", now());
INSERT IGNORE INTO sensorValues (id, sensorId, value, timestamp) values (3, 3, "14,7", now());
INSERT IGNORE INTO sensorValues (id, sensorId, value, timestamp) values (4, 4, "13,2", now());
INSERT IGNORE INTO sensorValues (id, sensorId, value, timestamp) values (5, 5, "14,5", now());

INSERT IGNORE INTO sensorValues (id, sensorId, value, timestamp) values (6, 6, "47,3%", now());
INSERT IGNORE INTO sensorValues (id, sensorId, value, timestamp) values (7, 7, "51,4%", now());

INSERT IGNORE INTO sensorValues (id, sensorId, value, timestamp) values (8, 8, "Gut", now());

-- SETTINGS
CREATE TABLE IF NOT EXISTS settings(
    id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    userID int NOT NULL,
    displayedUsername varchar(255) NOT NULL,
    primaryColor varchar(255) NOT NULL,
    secondaryColor varchar(255) NOT NULL,
    tertiaryColor varchar(255) NOT NULL,
    textColor varchar(255) NOT NULL,
    fontSize varchar(255) NOT NULL,
    animations boolean NOT NULL,
    Foreign KEY (userID) REFERENCES users(id)
);