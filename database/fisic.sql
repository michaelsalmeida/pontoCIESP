-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema pontoCIESP
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pontoCIESP
-- -----------------------------------------------------
DROP database IF exists `pontoCIESP`;
CREATE SCHEMA IF NOT EXISTS `pontoCIESP` DEFAULT CHARACTER SET utf8 ;
USE `pontoCIESP` ;

-- -----------------------------------------------------
-- Table `pontoCIESP`.`funcionarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pontoCIESP`.`funcionarios` (
  `registro` INT(10) NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `sobrenome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(256) NOT NULL,
  `senha` VARCHAR(256) NOT NULL,
  `tipo` ENUM('funcionario', 'administrador'),
  PRIMARY KEY (`registro`))
ENGINE = InnoDB;

select * from funcionarios;

-- -----------------------------------------------------
-- Table `pontoCIESP`.`cargaHoraria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pontoCIESP`.`cargaHoraria` (
  `idCargaHoraria` INT NOT NULL AUTO_INCREMENT,
  `data` DATE NOT NULL,
  `entrada` TIME NOT NULL,
  `saida` TIME NOT NULL,
  `idaIntervalo` TIME NOT NULL,
  `voltaIntervalo` TIME NOT NULL,
  `motivo` LONGTEXT NULL,
  `fk_idRegistro` INT(10) NOT NULL,
  PRIMARY KEY (`idCargaHoraria`),
  INDEX `fk_cargaHoraria_funcionarios_idx` (`fk_idRegistro` ASC),
  CONSTRAINT `fk_cargaHoraria_funcionarios`
    FOREIGN KEY (`fk_idRegistro`)
    REFERENCES `pontoCIESP`.`funcionarios` (`registro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pontoCIESP`.`bancoDeHoras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pontoCIESP`.`bancoDeHoras` (
  `idBancoDeHoras` INT NOT NULL AUTO_INCREMENT,
  `horasAcumuladas` TIME NOT NULL,
  `horasDevendo` TIME NOT NULL,
  `fk_idRegistro` INT(10) NOT NULL,
  PRIMARY KEY (`idBancoDeHoras`),
  INDEX `fk_bancoDeHoras_funcionarios1_idx` (`fk_idRegistro` ASC),
  CONSTRAINT `fk_bancoDeHoras_funcionarios1`
    FOREIGN KEY (`fk_idRegistro`)
    REFERENCES `pontoCIESP`.`funcionarios` (`registro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
