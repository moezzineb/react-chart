CREATE DATABASE `react_charts`;
USE `react_charts`;
CREATE TABLE `charts` (
	`chart_id` INT(11) NOT NULL AUTO_INCREMENT,
	`category` VARCHAR(255) NULL,
	`type` VARCHAR(255) NULL,
	`data` LONGTEXT NULL,
	`title` VARCHAR(255) NULL,
	`axex` VARCHAR(255) NULL,
	`axey` VARCHAR(255) NULL,
	PRIMARY KEY (`chart_id`)
);