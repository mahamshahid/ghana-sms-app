-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2017 at 04:25 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ghana`
--

-- --------------------------------------------------------

--
-- Table structure for table `dispatch_status`
--

CREATE TABLE `dispatch_status` (
  `dispatch_status_id` int(11) NOT NULL,
  `dispatch_status_name` varchar(45) NOT NULL,
  `created_on` datetime NOT NULL,
  `last_update` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dispatch_status`
--

INSERT INTO `dispatch_status` (`dispatch_status_id`, `dispatch_status_name`, `created_on`, `last_update`) VALUES
(1, 'sent', '2017-06-01 00:00:00', '2017-06-01 00:00:00'),
(2, 'received', '2017-05-31 00:00:00', '2017-05-31 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `event_title` text NOT NULL,
  `event_excerpt` text NOT NULL,
  `event_body` text NOT NULL,
  `event_type` int(11) NOT NULL COMMENT '0 for events, 1 for news',
  `last_update` datetime NOT NULL,
  `created_on` datetime NOT NULL,
  `dispatch_status_id` int(11) NOT NULL,
  `event_user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `event_title`, `event_excerpt`, `event_body`, `event_type`, `last_update`, `created_on`, `dispatch_status_id`, `event_user_id`) VALUES
(1, 'Launch Event for SMS App', 'An event is planned to launch the SMS App for Ghana trainees on 5th June, 16:00 Local Time at Venue XYZ', 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum', 0, '2017-06-01 13:03:00', '2017-05-31 07:00:00', 1, 1234567890000),
(2, 'Workshop to be held for training of Ghana trainees', 'Venue: xyz\r\nTime: xyz', 'new test body', 0, '2017-06-01 00:00:00', '2017-05-31 00:00:00', 2, 1234567890000);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `login_id` int(11) NOT NULL,
  `cnic` bigint(20) NOT NULL,
  `current_session_id` text,
  `last_login` datetime NOT NULL,
  `last_update` datetime NOT NULL,
  `created_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`login_id`, `cnic`, `current_session_id`, `last_login`, `last_update`, `created_on`) VALUES
(1, 1234567890000, '10', '2017-05-30 20:43:37', '2017-05-30 20:43:37', '2017-05-30 00:00:00'),
(4, 1234, NULL, '2017-06-03 21:23:14', '2017-06-03 21:23:14', '2017-06-03 21:23:14');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `sender_user_id` bigint(20) NOT NULL,
  `receiver_user_id` bigint(20) NOT NULL,
  `message_type_id` int(11) NOT NULL,
  `message_subtype_id` int(11) NOT NULL,
  `message_category` text,
  `message_body` blob,
  `sent_at` datetime DEFAULT NULL,
  `received_at` datetime DEFAULT NULL,
  `delete_status` tinyint(1) DEFAULT NULL,
  `message_status_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`message_id`, `sender_user_id`, `receiver_user_id`, `message_type_id`, `message_subtype_id`, `message_category`, `message_body`, `sent_at`, `received_at`, `delete_status`, `message_status_id`) VALUES
(1, 123456789000, 1234567890000, 1, 1, 'Technical Assistance', 0x546563686e6963616c20417373697374616e63652052657175697265640d0a0d0a48656c6c6f2074686572652e2049276d20776f726b696e67206f6e20612070726f6a6563742e206e65656420736f6d6520616476696365206f6e2069742e2063616e20796f752068656c703f, '2017-05-30 00:00:00', '2017-05-30 00:00:00', NULL, 1),
(2, 1234567890000, 123456789000, 1, 1, 'Uncategorized', 0x48656c6c6f20576f726c6421, '2017-05-30 00:00:00', NULL, NULL, 1),
(3, 123456789000, 1234567890000, 1, 1, 'dsfsfdsfdf', 0x546563686e6963616c20417373697374616e63652052657175697265640d0a0d0a48656c6c6f2074686572652e2049276d20776f726b696e67206f6e20612070726f6a6563742e206e65656420736f6d6520616476696365206f6e2069742e2063616e20796f752068656c703f, '2017-06-01 00:00:00', '2017-06-01 00:00:00', NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `message_status`
--

CREATE TABLE `message_status` (
  `message_status_id` int(11) NOT NULL,
  `message_status_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `message_status`
--

INSERT INTO `message_status` (`message_status_id`, `message_status_name`) VALUES
(1, 'sent'),
(2, 'received');

-- --------------------------------------------------------

--
-- Table structure for table `message_subtype`
--

CREATE TABLE `message_subtype` (
  `message_subtype_id` int(11) NOT NULL,
  `message_subtype_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `message_subtype`
--

INSERT INTO `message_subtype` (`message_subtype_id`, `message_subtype_name`) VALUES
(1, 'unread'),
(2, 'read');

-- --------------------------------------------------------

--
-- Table structure for table `message_type`
--

CREATE TABLE `message_type` (
  `message_type_id` int(11) NOT NULL,
  `message_type_name` varchar(45) NOT NULL,
  `created_on` datetime NOT NULL,
  `last_update` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `message_type`
--

INSERT INTO `message_type` (`message_type_id`, `message_type_name`, `created_on`, `last_update`) VALUES
(1, 'inbox', '2017-05-30 00:00:00', '2017-05-30 00:00:00'),
(2, 'outbox', '2017-05-30 01:12:00', '2017-05-30 01:12:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `cnic` bigint(20) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `phone_number` mediumtext NOT NULL,
  `email` text NOT NULL,
  `last_update` datetime NOT NULL,
  `created_on` datetime NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`cnic`, `full_name`, `date_of_birth`, `phone_number`, `email`, `last_update`, `created_on`, `password`, `user_type`) VALUES
(2, 'hello', '1997-05-24', '1122345', 'haha@gmail.com', '2017-05-30 00:00:00', '2017-05-30 00:00:00', '5d41402abc4b2a76b9719d911017c592', 0),
(1234, 'ms', '1993-12-01', '1234567', 'test@gmail.com', '2017-05-31 00:00:00', '2017-05-31 00:00:00', 'qwerty123', 1),
(123456789000, 'Test Subject', '2005-05-29', '+92-300-1234567', 'testsubject@gmail.com', '2017-05-29 21:25:00', '2017-05-29 21:00:00', '3fc0a7acf087f549ac2b266baf94b8b1', 0),
(1234567890000, 'Web Operator', '2000-07-07', '+92-314-7779852', 'web.operator@gmail.com', '2017-05-30 00:00:00', '2017-05-30 00:00:00', '3fc0a7acf087f549ac2b266baf94b8b1', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dispatch_status`
--
ALTER TABLE `dispatch_status`
  ADD PRIMARY KEY (`dispatch_status_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `dispatch_status_idx` (`dispatch_status_id`),
  ADD KEY `event_user_idx` (`event_user_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`login_id`),
  ADD KEY `users_login_idx` (`cnic`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `message_type_idx` (`message_type_id`),
  ADD KEY `message_subtype_idx` (`message_subtype_id`),
  ADD KEY `message_status_idx` (`message_status_id`),
  ADD KEY `sender_user_idx` (`sender_user_id`),
  ADD KEY `receiver_details_user_idx` (`receiver_user_id`);

--
-- Indexes for table `message_status`
--
ALTER TABLE `message_status`
  ADD PRIMARY KEY (`message_status_id`);

--
-- Indexes for table `message_subtype`
--
ALTER TABLE `message_subtype`
  ADD PRIMARY KEY (`message_subtype_id`);

--
-- Indexes for table `message_type`
--
ALTER TABLE `message_type`
  ADD PRIMARY KEY (`message_type_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`cnic`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `dispatch_status` FOREIGN KEY (`dispatch_status_id`) REFERENCES `dispatch_status` (`dispatch_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `event_user` FOREIGN KEY (`event_user_id`) REFERENCES `login` (`cnic`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `users_login` FOREIGN KEY (`cnic`) REFERENCES `users` (`cnic`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `message_status` FOREIGN KEY (`message_status_id`) REFERENCES `message_status` (`message_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `message_subtype` FOREIGN KEY (`message_subtype_id`) REFERENCES `message_subtype` (`message_subtype_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `message_type` FOREIGN KEY (`message_type_id`) REFERENCES `message_type` (`message_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `receiver_details_user` FOREIGN KEY (`receiver_user_id`) REFERENCES `users` (`cnic`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `sender_details_user` FOREIGN KEY (`sender_user_id`) REFERENCES `users` (`cnic`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
