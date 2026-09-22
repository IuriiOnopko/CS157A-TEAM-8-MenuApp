CREATE SCHEMA IF NOT EXISTS `MenuMap` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `MenuMap`;

-- Temp strcuture, in the future will need to move the cuisine outside and add a many-many relationship --
CREATE TABLE `MenuMap`.`restaurants` (
  `restaurant_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `description` TEXT NULL,
  `primary_cuisine` TEXT NULL,
  `phone` VARCHAR(30) NULL,
  `street_address` VARCHAR(255) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(50) NOT NULL,
  `postal_code` VARCHAR(20) NOT NULL,
  `coordinates` POINT NOT NULL,
  `price_level` TINYINT(1) NULL,
  `is_active` TINYINT NOT NULL,
  `is_open` TINYINT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`restaurant_id`));
