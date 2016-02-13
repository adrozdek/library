-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Czas wygenerowania: 13 Lut 2016, 19:06
-- Wersja serwera: 5.5.44-0ubuntu0.14.04.1
-- Wersja PHP: 5.5.9-1ubuntu4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Baza danych: `Books`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Books`
--

CREATE TABLE IF NOT EXISTS `Books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8_polish_ci NOT NULL,
  `author` varchar(70) COLLATE utf8_polish_ci NOT NULL,
  `description` varchar(500) COLLATE utf8_polish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=29 ;

--
-- Zrzut danych tabeli `Books`
--

INSERT INTO `Books` (`id`, `title`, `author`, `description`) VALUES
(2, 'Aniol Stroz', 'Nicholas Sparks', 'Julie zostaje wdowa w wieku dwudziestu pieciu lat'),
(3, 'Amerykanskie dziewczyny szukaja szczescia', 'Adriana Trigiani', 'Julie '),
(4, 'Duma i uprzedzenie', 'Jane Austen', 'w dorobku tej angielskiej pisarki.'),
(5, 'Kalejdoskop', 'Danielle Steel', 'Ta przepe'),
(17, 'Ofiara', 'John Caldon', 'ofiara losu'),
(18, 'Wezuwiusz', 'Eryk Lato', 'wulkany i wulkany'),
(25, 'Oaza', 'Ozzy Erbson', 'oaza spokoju');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
