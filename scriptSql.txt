
DROP TABLE IF EXISTS locality CASCADE;

-- Table Locality
CREATE TABLE locality (
    locality_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    city varchar(100) NOT NULL,
    country varchar(100) NOT NULL,
    postal_code varchar(20) NOT NULL,
    street_name varchar(255) NOT NULL
);

-- Insert into locality
INSERT INTO locality (city, country, postal_code, street_name)
VALUES ('Namur', 'Belgium', '5000', 'Rue de Fer'),
       ('Namur', 'Belgium', '5000', 'Rue Godefroid');

DROP TABLE IF EXISTS parking CASCADE;

-- Table Parking
CREATE TABLE parking (
    parking_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(255) NOT NULL,
    coordinates varchar(255) UNIQUE NOT NULL,
    places integer NOT NULL CHECK (places >= 0),
    telephone varchar(20) UNIQUE,
    opening time NOT NULL,
    place_width decimal NOT NULL CHECK (place_width >= 0),
    fk_locality integer REFERENCES locality(locality_id) ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE
);

-- Insert into parking, referencing the inserted locality
INSERT INTO parking (name, coordinates, places, telephone, opening, place_width, fk_locality)
VALUES ('Parking de l''Hôtel de ville','50.4661,4.8664', 100, '081123456', '07:00:00', 2.5, 
        (SELECT locality_id FROM locality WHERE city = 'Namur' AND street_name = 'Rue de Fer' LIMIT 1)),
       ('Parking de la Gare','50.4700,4.8650', 200, '081123457', '07:00:00', 2.5, 
        (SELECT locality_id FROM locality WHERE city = 'Namur' AND street_name = 'Rue de Fer' LIMIT 1)),
       ('Parking du Théâtre','50.4667,4.8680', 80, '081123458', '07:00:00', 2.5, 
        (SELECT locality_id FROM locality WHERE city = 'Namur' AND street_name = 'Rue Godefroid' LIMIT 1)),
       ('Parking de la Place d''Armes','50.4675,4.8672', 150, '081123459', '07:00:00', 2.5, 
        (SELECT locality_id FROM locality WHERE city = 'Namur' AND street_name = 'Rue Godefroid' LIMIT 1));

DROP TABLE IF EXISTS place CASCADE;

-- Table Place
CREATE TABLE place (
    place_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    arrival_time timestamp NOT NULL,
	departure_time timestamp NOT NULL,
    fk_parking integer REFERENCES parking(parking_id) ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE
);

-- Insert into place, referencing the inserted parking
INSERT INTO place (arrival_time, departure_time, fk_parking)
VALUES (NOW(), NOW() + INTERVAL '2 hours',
    (SELECT parking_id FROM parking WHERE coordinates = '50.4661,4.8664' LIMIT 1)),
       (NOW(), NOW() + INTERVAL '3 hours',
    (SELECT parking_id FROM parking WHERE coordinates = '50.4661,4.8664' LIMIT 1)),
       (NOW(), NOW() + INTERVAL '1 hours',
    (SELECT parking_id FROM parking WHERE coordinates = '50.4700,4.8650' LIMIT 1)),
       (NOW(), NOW() + INTERVAL '1 hours',
    (SELECT parking_id FROM parking WHERE coordinates = '50.4700,4.8650' LIMIT 1));

DROP TABLE IF EXISTS "user" CASCADE;

-- Table User
CREATE TABLE "user" (
    user_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(100) NOT NULL,
    firstname varchar(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    username varchar(100) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE NOT NULL

);

INSERT INTO "user" (name, firstname, date_of_birth, username, password, isAdmin)
VALUES ('Paulus', 'Robin', '2002-12-12', 'Sneeks', '$argon2id$v=19$m=65536,t=3,p=4$wYFFJf4nQfu8VZPR4Ba4lw$frNp7N+EnhjUBvQpXEsysU9gg7CtTH8Rq/v8xqm32cs', false), --password
       ('Dupont', 'Jean', '1990-05-15', 'JeanDup', '$argon2id$v=19$m=65536,t=3,p=4$wYFFJf4nQfu8VZPR4Ba4lw$frNp7N+EnhjUBvQpXEsysU9gg7CtTH8Rq/v8xqm32cs', false), --password
       ('Hirwa', 'Bienvenu', '1998-01-02','dupont','$argon2id$v=19$m=65536,t=3,p=4$wYFFJf4nQfu8VZPR4Ba4lw$frNp7N+EnhjUBvQpXEsysU9gg7CtTH8Rq/v8xqm32cs',true);

DROP TABLE IF EXISTS car CASCADE;

-- Table Car
CREATE TABLE car (
    car_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    license_plate varchar(50) UNIQUE NOT NULL,
    model varchar(100) NOT NULL,
    fk_user integer REFERENCES "user"(user_id) ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE
);

-- Insert into car, referencing an existing user
INSERT INTO car (license_plate, model, fk_user)
VALUES ('1-NAM-123', 'Toyota Yaris', (SELECT user_id FROM "user" WHERE username = 'Sneeks' LIMIT 1)),
       ('1-NAM-456', 'Honda Civic', (SELECT user_id FROM "user" WHERE username = 'Sneeks' LIMIT 1)),
       ('1-NAM-789', 'Ford Fiesta', (SELECT user_id FROM "user" WHERE username = 'JeanDup' LIMIT 1)),
       ('1-NAM-101', 'Nissan Qashqai', (SELECT user_id FROM "user" WHERE username = 'JeanDup' LIMIT 1));
