DROP DATABASE IF EXISTS bfriend_database;
CREATE DATABASE bfriend_database;

USE bfriend_database;

DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `Address`;
DROP TABLE IF EXISTS `City`;
DROP TABLE IF EXISTS `Gender`;
DROP TABLE IF EXISTS `Role`;
DROP TABLE IF EXISTS `Subscription`;
DROP TABLE IF EXISTS `UserHobbies`;
DROP TABLE IF EXISTS `Hobbies`;
DROP TABLE IF EXISTS `Payment`;
DROP TABLE IF EXISTS `UserImages`;
DROP TABLE IF EXISTS `UserMatches`;
DROP TABLE IF EXISTS `UserMessages`;
DROP TABLE IF EXISTS `UserNotifications`;

CREATE TABLE `Users` (
	`ID` INTEGER AUTO_INCREMENT, PRIMARY KEY (ID),
    `prename` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `addressID` INTEGER NOT NULL,
    `genderID` INTEGER NOT NULL,
    `roleID` INTEGER NOT NULL,
    `subscriptionID` INTEGER NOT NULL,
    `paymentID` INTEGER NOT NULL,
    `locked` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `Address` (
    `ID` INTEGER AUTO_INCREMENT, PRIMARY KEY (ID),
    `street` VARCHAR(255) NOT NULL,
    `houseNumber` VARCHAR(255) NOT NULL,
    `cityID` INTEGER NOT NULL,
    `country` VARCHAR(255) NOT NULL
);

CREATE TABLE `City` (
    `ID` INTEGER AUTO_INCREMENT, PRIMARY KEY (ID),
    `name` VARCHAR(255) NOT NULL,
    `zip` VARCHAR(255) NOT NULL
);

CREATE TABLE `Gender` (
    `ID` INTEGER AUTO_INCREMENT, PRIMARY KEY (ID),
    `name` VARCHAR(255) NOT NULL
);

CREATE TABLE `Role` (
    `ID` INTEGER AUTO_INCREMENT, PRIMARY KEY (ID),
    `name` VARCHAR(255) NOT NULL
);

CREATE TABLE `Subscription` (
    `ID` INTEGER AUTO_INCREMENT, PRIMARY KEY (ID),
    `name` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10,2) NOT NULL
);

CREATE TABLE `UserHobbies` (
    `ID` INTEGER AUTO_INCREMENT, PRIMARY KEY (ID),
    `userID` INTEGER NOT NULL,
    `hobbyID` INTEGER NOT NULL
);

CREATE TABLE `Hobbies` (
    `ID` INTEGER AUTO_INCREMENT, PRIMARY KEY (ID),
    `name` VARCHAR(255) NOT NULL
);

CREATE TABLE `Payment` (
    `ID` INTEGER AUTO_INCREMENT, PRIMARY KEY (ID),
    `prename` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `iban` VARCHAR(255) NOT NULL,
    `bic` VARCHAR(255) NOT NULL
);

CREATE TABLE `UserImages` (
    `ID` INTEGER AUTO_INCREMENT, PRIMARY KEY (ID),
    `userID` INTEGER NOT NULL,
    `image` VARCHAR(255) NOT NULL
);

CREATE TABLE `UserMatches` (
    `ID` INTEGER AUTO_INCREMENT, PRIMARY KEY (ID),
    `userID` INTEGER NOT NULL,
    `matchID` INTEGER NOT NULL
);

CREATE TABLE `UserMessages` (
    `ID` INTEGER AUTO_INCREMENT, PRIMARY KEY (ID),
    `userID` INTEGER NOT NULL,
    `senderID` INTEGER NOT NULL,
    `message` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `UserNotifications` (
    `ID` INTEGER AUTO_INCREMENT, PRIMARY KEY (ID),
    `userID` INTEGER NOT NULL,
    `message` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `Users` ADD FOREIGN KEY (`addressID`) REFERENCES `Address`(`ID`);
ALTER TABLE `Users` ADD FOREIGN KEY (`genderID`) REFERENCES `Gender`(`ID`);
ALTER TABLE `Users` ADD FOREIGN KEY (`roleID`) REFERENCES `Role`(`ID`);
ALTER TABLE `Users` ADD FOREIGN KEY (`subscriptionID`) REFERENCES `Subscription`(`ID`);
ALTER TABLE `Users` ADD FOREIGN KEY (`paymentID`) REFERENCES `Payment`(`ID`);

ALTER TABLE `UserHobbies` ADD FOREIGN KEY (`userID`) REFERENCES `Users`(`ID`);
ALTER TABLE `UserHobbies` ADD FOREIGN KEY (`hobbyID`) REFERENCES `Hobbies`(`ID`);

ALTER TABLE `UserImages` ADD FOREIGN KEY (`userID`) REFERENCES `Users`(`ID`);

ALTER TABLE `UserMatches` ADD FOREIGN KEY (`userID`) REFERENCES `Users`(`ID`);
ALTER TABLE `UserMatches` ADD FOREIGN KEY (`matchID`) REFERENCES `Users`(`ID`);

ALTER TABLE `UserMessages` ADD FOREIGN KEY (`userID`) REFERENCES `Users`(`ID`);
ALTER TABLE `UserMessages` ADD FOREIGN KEY (`senderID`) REFERENCES `Users`(`ID`);

ALTER TABLE `UserNotifications` ADD FOREIGN KEY (`userID`) REFERENCES `Users`(`ID`);

ALTER TABLE `Address` ADD FOREIGN KEY (`cityID`) REFERENCES `City`(`ID`);

INSERT INTO `Gender` (`name`) VALUES ("Mann"), ("Frau"), ("Kampf Hubschrauber");

INSERT INTO `Role` (`name`) VALUES ("User"), ("Admin");

INSERT INTO `Subscription` (`name`, `price`) VALUES ("Free", 0.00), ("Premium", 9.99);

INSERT INTO `Hobbies` (`name`) VALUES ("Sport"), ("Kochen"), ("Lesen"), ("Reisen"), ("Musik"), ("Kunst"), ("Tiere"), ("Garten"), ("Fotografie"), ("Handwerk"), ("Technik"), ("Gesundheit"), ("Essen"), ("Trinken"), ("Kino"), ("Theater"), ("Tanzen"), ("Schwimmen"), ("Wandern"), ("Fahrrad"), ("Motorrad"), ("Auto"), ("Fliegen"), ("Boot"), ("Angeln"), ("Jagen"), ("Schießen"), ("Klettern"), ("Tauchen"), ("Skifahren"), ("Snowboard"), ("Surfen"), ("Segeln"), ("Kajak"), ("Kanu"), ("Rudern"), ("Tennis"), ("Golf"), ("Fußball"), ("Basketball"), ("Volleyball"), ("Handball"), ("Tischtennis"), ("Badminton"), ("Bowling"), ("Billard"), ("Dart"), ("Schach"), ("Poker"), ("Bridge"), ("Backgammon"), ("Brettspiele"), ("Kartenspiele"), ("Computerspiele"), ("Konsolenspiele"), ("Handyspiele"), ("Online Spiele"), ("Social Media"), ("Blogging"), ("Vlogging"), ("Podcasting"), ("Streaming"), ("Fernsehen"), ("Radio"), ("Musikinstrumente"), ("Gesang"), ("Tanz"), ("Theater"), ("Kunst"), ("Malen"), ("Zeichnen"), ("Basteln"), ("Modellbau"), ("Nähen"), ("Stricken"), ("Häkeln"), ("Kochen"), ("Backen"), ("Grillen"), ("Barbecue"), ("Essen"), ("Trinken"), ("Cocktails"), ("Wein"), ("Bier"), ("Whisky"), ("Rum"), ("Gin"), ("Wodka");

INSERT INTO `City` (`name`, `zip`) VALUES ("Musterstadt", "1234");

INSERT INTO `Payment` (`prename`, `name`, `iban`, `bic`) VALUES ("Max", "Mustermann", "CH1234567890123456789", "CHAS1234");

INSERT INTO `Address` (`street`, `houseNumber`, `cityID`, `country`) VALUES ("Musterstrasse", "1", 1, "Schweiz");

INSERT INTO `Users` (`prename`, `name`, `email`, `password`, `addressID`, `genderID`, `roleID`, `subscriptionID`, `paymentID`) VALUES ("Max", "Mustermann", "max@muster.ch", "1234", 1, 1, 1, 1, 1);

INSERT INTO `UserHobbies` (`userID`, `hobbyID`) VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6);

INSERT INTO `UserImages` (`userID`, `image`) VALUES (1, "max.jpg");