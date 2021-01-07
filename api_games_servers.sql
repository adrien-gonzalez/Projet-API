-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 05 jan. 2021 à 13:56
-- Version du serveur :  5.7.31
-- Version de PHP : 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `api_games_servers`
--
CREATE DATABASE IF NOT EXISTS `api_games_servers` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `api_games_servers`;

-- --------------------------------------------------------

--
-- Structure de la table `avis`
--

DROP TABLE IF EXISTS `avis`;
CREATE TABLE IF NOT EXISTS `avis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_fk` int(11) NOT NULL,
  `servers_fk` int(11) NOT NULL,
  `comment` text NOT NULL,
  `score` int(11) DEFAULT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `servers_fk` (`servers_fk`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `games`
--

DROP TABLE IF EXISTS `games`;
CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `games`
--

INSERT INTO `games` (`id`, `name`, `image`, `logo`, `description`) VALUES
(1, 'Minecraft', 'minecraft.png', 'minecraft-logo.png', 'Jeu cool'),
(2, 'Hytale', 'hytale.png', 'hytale-logo.png', 'Jeu cool');

-- --------------------------------------------------------

--
-- Structure de la table `games_tags`
--

DROP TABLE IF EXISTS `games_tags`;
CREATE TABLE IF NOT EXISTS `games_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `games_fk` int(11) NOT NULL,
  `tags_fk` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `games_fk` (`games_fk`),
  KEY `tags_fk` (`tags_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `image_servers`
--

DROP TABLE IF EXISTS `image_servers`;
CREATE TABLE IF NOT EXISTS `image_servers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `servers_fk` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `servers_fk` (`servers_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `servers`
--

DROP TABLE IF EXISTS `servers`;
CREATE TABLE IF NOT EXISTS `servers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `discord` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `port` varchar(255) NOT NULL,
  `games_fk` int(11) NOT NULL,
  `description` text NOT NULL,
  `users_fk` int(11) NOT NULL,
  `miniature` varchar(255) NOT NULL,
  `vote` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `games_fk` (`games_fk`),
  KEY `users_fk` (`users_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `servers`
--

INSERT INTO `servers` (`id`, `name`, `website`, `discord`, `ip`, `port`, `games_fk`, `description`, `users_fk`, `miniature`, `vote`) VALUES
(3, 'test', '', '', '', '', 1, 'test', 1, 'test.png', 0),
(4, 'One Piece Minecraft', 'Serveur trop cool', 'test', 'play.onepiece.fr', '25565', 2, 'test', 1, '', 0),
(5, 'test', '', '', '', '', 1, 'test', 3, 'test.png', 0);

-- --------------------------------------------------------

--
-- Structure de la table `servers_tags`
--

DROP TABLE IF EXISTS `servers_tags`;
CREATE TABLE IF NOT EXISTS `servers_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `servers_fk` int(11) NOT NULL,
  `tags_fk` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `servers_fk` (`servers_fk`),
  KEY `tags_fk` (`tags_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `picture_profil` varchar(255) NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `date_token` datetime DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `login`, `email`, `password`, `picture_profil`, `reset_token`, `date_token`, `enabled`) VALUES
(11, 'plap', 'petra61@lindgren.net', '$2y$10$tHQOhX5J/crv5Qhv/0KHrOibB1nMmiLSDxn906mpLQXKqbr4fQsyu', 'test.png', NULL, NULL, 0),
(13, 'mhills', 'viola.little@hotmail.com', '$2y$10$wihgFSIRTzmVMlAmt4iQl.p/5GzTUZf63weR6VYqgejRNEhCji6QS', 'test.png', NULL, NULL, 0),
(14, 'buster46', 'tiana10@hotmail.com', '$2y$10$E1ZU9Lg1EIXXFR51ZBLncuMorzWVg0prZgwcn0zZxqMt3i4fF82ue', 'test.png', NULL, NULL, 0),
(15, 'elna89', 'frederik05@bernhard.net', '$2y$10$Ld.QH6SsJ5N3pvbDDFVfyu/veGw8t4CJ8BOlh9w8jw2hnWYxmpUE2', 'test.png', NULL, NULL, 0),
(16, 'kamron18', 'emacejkovic@yahoo.com', '$2y$10$.kBSIWOC16b4wZUOH10IAuiSR/1/Mv4GxXYC6GKoPiuARnWnDgXZC', 'test.png', NULL, NULL, 0),
(17, 'beatty.deion', 'friesen.deondre@gibson.net', '$2y$10$g6h/Z6XnbjInxtts9uMEzeez6bJQsn2C2iZ.bFjl.e8srNcNvptH.', 'test.png', NULL, NULL, 0),
(18, 'addison.howell', 'jalyn36@jakubowski.org', '$2y$10$imQtU/Y.QfweI7kKeuuWz.GWrvCN6SVHRQOmpQJR9OLrrccsxZnrq', 'test.png', NULL, NULL, 0),
(19, 'xmckenzie', 'jesse55@robel.biz', '$2y$10$XAkK2oZ01pP0qq1j4pIzsOEJlofa10VbB7VsHZVsOeuAKtkibbsLi', 'test.png', NULL, NULL, 0),
(20, 'edward19', 'nienow.rickie@gislason.com', '$2y$10$lwm8E3f7lFFFbJN71gzPnOLoe7u4azVu2epMYlrp3hJ5nRlbBxMGC', 'test.png', NULL, NULL, 0),
(21, 'dickinson.broderick', 'corkery.lilliana@hotmail.com', '$2y$10$U7YxY5PEn3clvR6e42eotOD9FPV4UFsWZBNHZbgpNLBNGAEGPBMoC', 'test.png', NULL, NULL, 0),
(22, 'kaylah16', 'kwindler@gmail.com', '$2y$10$vtme5HmPuakt89YdA7uuMuynhEjjWfExyqkP8PJOxMNBK5Iz8XIue', 'test.png', NULL, NULL, 0),
(23, 'rickey46', 'hlind@hotmail.com', '$2y$10$vkD/f6yQbFE9QOpKaIoCpuu4H8oj9GP4FViXa6gYWTgGCVoWaGBUO', 'test.png', NULL, NULL, 0),
(24, 'kihn.samanta', 'rfarrell@kautzer.org', '$2y$10$ShjzxzG.dFTXD2aS7MZUt.Hgc1XTnVIg0oNC.l94XxPLDBRDRTto6', 'test.png', NULL, NULL, 0),
(25, 'grimes.tanya', 'karina.goldner@yahoo.com', '$2y$10$i44JTUi8oUdyMD4B8DFOXevChD03Y1.iB96s1o0oNEztFmFDI1Tpi', 'test.png', NULL, NULL, 0),
(26, 'uwitting', 'satterfield.sydney@waters.com', '$2y$10$JYkCJWi..eGiKc8Fj4G8.eJkNPW9iZJlsTkS0XUvBxwPiNdQF9EqS', 'test.png', NULL, NULL, 0),
(27, 'bergstrom.kelly', 'cassidy07@rohan.org', '$2y$10$3kjwpV4jMokbJRVUy075key/YOA71xs0m0LGH2f/4SrTuIxTx1t3m', 'test.png', NULL, NULL, 0),
(28, 'roberts.braulio', 'israel48@gmail.com', '$2y$10$KR9YzIWUlm/DuIhblaZkpezrDQ74l/VuAxgcPJ1OPiJLEWlSwcTHW', 'test.png', NULL, NULL, 0),
(29, 'arielle76', 'estella.wintheiser@yahoo.com', '$2y$10$lT9Rvo998e39bWYcDjTQPulJ.nVkmTMmNSrNLHwCFZKi7xchF/qRa', 'test.png', NULL, NULL, 0),
(30, 'lila32', 'ggoyette@hotmail.com', '$2y$10$3yktJaID0q0LJ3Pa/Exrbu8aAKLgMbPkLJKGcKPxOJ/7YK.71nJ2q', 'test.png', NULL, NULL, 0),
(31, 'testtest', 'test@gmail.com', '$2y$10$g0zR3I1zWKew/bIM8QuVkOVNN5qqLhEx0HVuqT2G3x.Ru50ZbCMgy', 'default.png', NULL, NULL, 0),
(32, 'testtest2', 'test2@gmail.com', '$2y$12$INk0mT3Ghz.uOpoh16O4k.Rd0tsHm1mzrWgPOdUESXIXq6mRAMPe6', 'default.png', NULL, NULL, 0),
(33, 'testtest3', 'test3@gmail.com', '$2y$12$NapMO1X3PKDJiwXB42FFIegksU95OAHH8K76wMEHjCiGuumGDU2FW', 'default.png', NULL, NULL, 0),
(34, 'testtest4', 'test4@gmail.com', '$2y$12$rAnfJj87TZribkZQdMkUDurge1KcWUhUDTzoggaviU48cMF2V6dNG', 'default.png', NULL, NULL, 0),
(35, 'testtest5', 'test5@gmail.com', '$2y$12$hIbcgw/.6IiwCUsjKUNSm.mH4Kp5HrKKrCJbXGqyuVkj/7MHbH5o2', 'default.png', NULL, NULL, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
