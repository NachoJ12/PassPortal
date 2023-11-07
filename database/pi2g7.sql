-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema PI2G7
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema PI2G7
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `PI2G7` DEFAULT CHARACTER SET utf8 ;
USE `PI2G7` ;

-- -----------------------------------------------------
-- Table `PI2G7`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PI2G7`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PI2G7`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PI2G7`.`user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `last_pass_reset` TIMESTAMP NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `enabled` BIT(1) NULL,
  `role_id` INT NOT NULL DEFAULT 1,
  `keycloak_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_role1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `PI2G7`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PI2G7`.`artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PI2G7`.`artist` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PI2G7`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PI2G7`.`address` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `country` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PI2G7`.`venue`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PI2G7`.`venue` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `capacity` BIGINT NULL,
  `image` VARCHAR(300) NULL,
  `address_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_venue_address1_idx` (`address_id` ASC) VISIBLE,
  CONSTRAINT `fk_venue_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `PI2G7`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PI2G7`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PI2G7`.`category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `image` VARCHAR(300) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PI2G7`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PI2G7`.`event` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `date` DATE NOT NULL,
  `time` TIME NULL,
  `description` VARCHAR(150) NULL,
  `stock` BIGINT NULL,
  `image` VARCHAR(300) NULL,
  `venue_id` BIGINT NOT NULL,
  `artist_id` BIGINT NOT NULL,
  `category_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_event_artist1_idx` (`artist_id` ASC) VISIBLE,
  INDEX `fk_event_venue1_idx` (`venue_id` ASC) VISIBLE,
  INDEX `fk_event_category1_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_event_artist1`
    FOREIGN KEY (`artist_id`)
    REFERENCES `PI2G7`.`artist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_venue1`
    FOREIGN KEY (`venue_id`)
    REFERENCES `PI2G7`.`venue` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `PI2G7`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PI2G7`.`ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PI2G7`.`ticket` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `price` DECIMAL(10,2) NULL,
  `event_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ticket_event1_idx` (`event_id` ASC) VISIBLE,
  CONSTRAINT `fk_ticket_event1`
    FOREIGN KEY (`event_id`)
    REFERENCES `PI2G7`.`event` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PI2G7`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PI2G7`.`order` (
  `id` BIGINT NOT NULL,
  `total_price` DECIMAL(10,2) NULL,
  `order_datetime` DATETIME NULL,
  `delivery_address` VARCHAR(45) NULL,
  `user_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_orderDetails_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_orderDetails_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `PI2G7`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PI2G7`.`ticket_order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PI2G7`.`ticket_order` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `orderDetails_id` BIGINT NOT NULL,
  `ticket_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_orderDetails1_idx` (`orderDetails_id` ASC) VISIBLE,
  INDEX `fk_order_ticket1_idx` (`ticket_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_orderDetails1`
    FOREIGN KEY (`orderDetails_id`)
    REFERENCES `PI2G7`.`order` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_ticket1`
    FOREIGN KEY (`ticket_id`)
    REFERENCES `PI2G7`.`ticket` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
