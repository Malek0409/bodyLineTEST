CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(45) NOT NULL,
  lastName VARCHAR(45) DEFAULT NULL,
  email VARCHAR(45) NOT NULL,
  password VARCHAR(300) NOT NULL,
  picture LONGBLOB,
  type VARCHAR(10) DEFAULT 'USER',
  actif VARCHAR(10) DEFAULT 'ACTIF',
  PRIMARY KEY (id),
  UNIQUE KEY email_UNIQUE (email)
);

CREATE TABLE `content` (
  `id` int NOT NULL,
  `legal_notices` varchar(3000) DEFAULT NULL,
  `conditions_generales` varchar(3000) DEFAULT NULL,
  `privacy_policy` varchar(3000) DEFAULT NULL,
  `personal_data` varchar(3000) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `pictureProduct` (
  `id` int NOT NULL AUTO_INCREMENT,
  `picture` longblob NOT NULL,
  `productID` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productID_idx` (`productID`),
  CONSTRAINT `productID` FOREIGN KEY (`productID`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `currency` varchar(5) NOT NULL,
  `unitNumber` int DEFAULT NULL,
  `description` varchar(450) NOT NULL,
  `available` varchar(15) DEFAULT 'AVAILABLE',
  PRIMARY KEY (`id`),
  UNIQUE KEY `title_UNIQUE` (`title`)
)


CREATE TABLE `productByCategorie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typeMachine` varchar(45) NOT NULL,
  `productID_type` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productID_type_idx` (`productID_type`),
  CONSTRAINT `productID_type` FOREIGN KEY (`productID_type`) REFERENCES `product` (`id`)
)


CREATE TABLE `productByMuscle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nameMuscle` varchar(450) DEFAULT NULL,
  `productID_muscle` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productID_idx` (`productID_muscle`),
  CONSTRAINT `productID_muscle` FOREIGN KEY (`productID_muscle`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)


