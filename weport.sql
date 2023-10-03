-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3310
-- Tiempo de generación: 03-10-2023 a las 23:01:06
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `weport`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `id_status`
--

CREATE TABLE `id_status` (
  `id` int(100) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `id_status`
--

INSERT INTO `id_status` (`id`, `status`) VALUES
(1, 'activo'),
(2, 'eliminado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_admin`
--

CREATE TABLE `user_admin` (
  `id` int(100) NOT NULL,
  `type_id` int(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_admin`
--

INSERT INTO `user_admin` (`id`, `type_id`, `email`, `password`) VALUES
(1, 1, 'test@hotmail.com', '$2b$12$1kJWY0r2XimS0KG83EVlqOYglPcu2QXT9G1EUBEReM.5z/9ejcMc.'),
(2, 1, 'test02@hotmail.com', '$2b$12$MoQFPfUuCheX3uHCM44T.etle.JIwJ2SCw4IcGIkhbGXm5kdNwxoi'),
(3, 1, 'aram@hotmail.com', '$2b$12$pnZB4lagXDnZK2ejio1kae7IGOKgtGDdI9nvu6GMx60dLjdwzYmnW'),
(4, 1, 'arammm@hotmail.com', '$2b$12$G6.oWHBu9oT60XXt5tHMOevosCX9F2o82M1Ruhqgzu.dJrgWWmxDa'),
(5, 1, 'haram@hotmail.com', '$2b$12$3XUoTRNmHjung3MSsWQxNeFkHErYOq/oGVygkX46hixE8Aa6tNjPS'),
(6, 1, 'haram_test01@hotmail.com', '$2b$12$6jsseocw46lvrWlpLhBVbORR0u2HL1YgDefz8u/npm.50FSpBIX1.'),
(7, 1, 'nuevo@hotmail.com', '$2b$12$nJT.W0lQ7oVxCDzEj2z57.ROAsbwPFDVf9kBZJxKZufZl543AMQfi'),
(8, 1, 'aaaaaram@hotmail.com', '$2b$12$KifjN6M2f8lJxpIZLXJ73ulWHIHXXzWoLaGbE2DxaU/8u4If0NjzC');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_info`
--

CREATE TABLE `user_info` (
  `id` int(100) NOT NULL,
  `type_id` int(100) DEFAULT NULL,
  `status` int(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `tipo_sangre` varchar(100) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fecha_nacimiento` varchar(100) NOT NULL,
  `nombre_contacto_emergencia` varchar(100) NOT NULL,
  `telefono_contacto_emergencia` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_info`
--

INSERT INTO `user_info` (`id`, `type_id`, `status`, `nombre`, `apellidos`, `telefono`, `tipo_sangre`, `direccion`, `email`, `fecha_nacimiento`, `nombre_contacto_emergencia`, `telefono_contacto_emergencia`) VALUES
(4, 1, 2, 'Aram Wenceslao', 'Espinosa Maldonado', '5626654621', 'B-', 'Calle Lago de Chapultepec 23', 'aramespinosaaa@gmail.com', '1997-10-11', 'Paty Maldonado Ramirez', '5542424242'),
(5, 1, 2, 'test', 'Maldonado', '5567676767', 'A+', 'Calle Lago de San Cristobal', 'fiweha3271@mustbeit.com', '1998-03-10', 'Test Test', '5512121212'),
(6, 1, 2, 'Gerardo', 'Lopez Perez', '5589899889', 'B+', 'Calle Lago de Chapultepec 23', 'gera@gmail.com', '1995-01-11', 'Luisa Lopez Perez', '5542424256'),
(7, 1, 2, 'Luisa', 'Ramos García', '5521212121', 'A+', 'Ecatepec de Morelos, Llano de loas Baéz', 'luuram@hotmail.com', '1995-07-12', 'Luisa Lopez Perez', '5589898989'),
(8, 1, 1, 'Maria', 'Garcia Guillen', '5543434343', 'A-', 'Calle Lago de San Cristobal', 'mary_1234@gmail.com', '2000-10-12', 'Test Test', '5589898989');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_role`
--

CREATE TABLE `user_role` (
  `id` int(100) NOT NULL,
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_role`
--

INSERT INTO `user_role` (`id`, `type`) VALUES
(1, 'Administrador'),
(2, 'Empleado');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `id_status`
--
ALTER TABLE `id_status`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_admin`
--
ALTER TABLE `user_admin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indices de la tabla `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`),
  ADD KEY `status` (`status`);

--
-- Indices de la tabla `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `user_admin`
--
ALTER TABLE `user_admin`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `user_info`
--
ALTER TABLE `user_info`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `user_admin`
--
ALTER TABLE `user_admin`
  ADD CONSTRAINT `user_admin_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `id_status` (`id`);

--
-- Filtros para la tabla `user_info`
--
ALTER TABLE `user_info`
  ADD CONSTRAINT `user_info_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `user_role` (`id`),
  ADD CONSTRAINT `user_info_ibfk_2` FOREIGN KEY (`status`) REFERENCES `id_status` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
