create database members;

CREATE TABLE `members`.`members` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `role` VARCHAR(45) NULL,
  `roleid` VARCHAR(10) NULL,
  `bgcolor` VARCHAR(45) NULL,
  `status` VARCHAR(100) NULL,
  `statusid` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE members
ADD CONSTRAINT unique_email UNIQUE (email);
Delete from members where id = 2;