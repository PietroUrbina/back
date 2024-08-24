-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-08-2024 a las 21:13:18
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `discobar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `box`
--

CREATE TABLE `box` (
  `id` int(11) NOT NULL,
  `nombre_box` varchar(50) NOT NULL,
  `capacidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `box`
--

INSERT INTO `box` (`id`, `nombre_box`, `capacidad`) VALUES
(1, 'Box A', 4),
(2, 'Box B', 6),
(3, 'Box C', 8),
(4, 'Box D', 10),
(5, 'Box E', 12),
(6, 'Box F', 4),
(7, 'Box G', 6),
(8, 'Box H', 8),
(9, 'Box I', 10),
(10, 'Box J', 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `fecha_nacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `apellido`, `dni`, `email`, `telefono`, `direccion`, `fecha_nacimiento`) VALUES
(1, 'Carlos', 'Gómez', '12345678', 'carlos.gomez@example.com', '987654321', 'Av. Siempre Viva 123', '1990-05-15'),
(2, 'María', 'Pérez', '87654321', 'maria.perez@example.com', '987654322', 'Calle Falsa 456', '1985-07-20'),
(3, 'Juan', 'Ramírez', '11223344', 'juan.ramirez@example.com', '987654323', 'Av. Los Laureles 789', '1992-03-12'),
(4, 'Lucía', 'Fernández', '55667788', 'lucia.fernandez@example.com', '987654324', 'Jr. Las Rosas 101', '1988-11-09'),
(5, 'Pedro', 'Martínez', '33445566', 'pedro.martinez@example.com', '987654325', 'Calle Los Pinos 202', '1995-01-25'),
(6, 'Ana', 'Torres', '22334455', 'ana.torres@example.com', '987654326', 'Av. Las Palmeras 303', '1991-08-30'),
(7, 'Luis', 'Rojas', '44556677', 'luis.rojas@example.com', '987654327', 'Jr. Los Olivos 404', '1993-04-18'),
(8, 'Sofía', 'Vargas', '66778899', 'sofia.vargas@example.com', '987654328', 'Av. Las Flores 505', '1996-02-14'),
(9, 'Andrés', 'Jiménez', '77889900', 'andres.jimenez@example.com', '987654329', 'Calle Las Amapolas 606', '1989-12-01'),
(10, 'Elena', 'López', '88990011', 'elena.lopez@example.com', '987654330', 'Av. Los Tulipanes 707', '1994-06-05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallereservas`
--

CREATE TABLE `detallereservas` (
  `id` int(11) NOT NULL,
  `id_reserva` int(11) NOT NULL,
  `id_box` int(11) NOT NULL,
  `disponibilidad` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detallereservas`
--

INSERT INTO `detallereservas` (`id`, `id_reserva`, `id_box`, `disponibilidad`) VALUES
(1, 1, 1, 1),
(2, 2, 2, 1),
(3, 3, 3, 0),
(4, 4, 4, 1),
(5, 5, 5, 1),
(6, 6, 6, 0),
(7, 7, 7, 1),
(8, 8, 8, 1),
(9, 9, 9, 1),
(10, 10, 10, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleventas`
--

CREATE TABLE `detalleventas` (
  `id` int(11) NOT NULL,
  `id_venta` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalleventas`
--

INSERT INTO `detalleventas` (`id`, `id_venta`, `id_producto`, `cantidad`, `precio_unitario`) VALUES
(1, 1, 1, 10, 6.50),
(2, 2, 2, 2, 45.00),
(3, 3, 3, 1, 70.00),
(4, 4, 4, 1, 150.00),
(5, 5, 5, 10, 3.00),
(6, 6, 6, 2, 65.00),
(7, 7, 7, 1, 50.00),
(8, 8, 8, 5, 2.00),
(9, 9, 9, 4, 8.00),
(10, 10, 10, 2, 6.50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventarios`
--

CREATE TABLE `inventarios` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_entrada` date NOT NULL,
  `fecha_salida` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventarios`
--

INSERT INTO `inventarios` (`id`, `id_producto`, `cantidad`, `fecha_entrada`, `fecha_salida`) VALUES
(1, 1, 50, '2024-08-01', NULL),
(2, 2, 20, '2024-08-05', NULL),
(3, 3, 15, '2024-08-08', NULL),
(4, 4, 10, '2024-08-10', NULL),
(5, 5, 5, '2024-08-15', NULL),
(6, 6, 100, '2024-08-01', NULL),
(7, 7, 25, '2024-08-12', NULL),
(8, 8, 10, '2024-08-18', NULL),
(9, 9, 30, '2024-08-20', NULL),
(10, 10, 40, '2024-08-22', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `fecha_vencimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `stock`, `fecha_vencimiento`) VALUES
(1, 'Cerveza Cristal', 6.50, 100, '2024-12-31'),
(2, 'Ron Cartavio', 45.00, 50, '2025-05-15'),
(3, 'Vodka Absolut', 70.00, 30, '2025-09-20'),
(4, 'Whisky Johnnie Walker', 150.00, 20, '2026-01-01'),
(5, 'Tequila Jose Cuervo', 80.00, 25, '2025-07-30'),
(6, 'Gaseosa Coca-Cola', 3.00, 200, '2024-11-15'),
(7, 'Ginebra Beefeater', 65.00, 40, '2025-10-10'),
(8, 'Pisco Quebranta', 50.00, 35, '2025-03-25'),
(9, 'Agua Mineral San Luis', 2.00, 150, '2024-12-01'),
(10, 'Energizante Red Bull', 8.00, 80, '2025-04-20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promociones`
--

CREATE TABLE `promociones` (
  `id` int(11) NOT NULL,
  `nombre_promocion` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `descuento` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promociones_clientes`
--

CREATE TABLE `promociones_clientes` (
  `id` int(11) NOT NULL,
  `id_promocion` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha_aplicacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha_reserva` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `estado` enum('pendiente','confirmada','cancelada') DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `id_cliente`, `fecha_reserva`, `hora_inicio`, `hora_fin`, `estado`) VALUES
(1, 1, '2024-09-01', '20:00:00', '23:00:00', 'confirmada'),
(2, 2, '2024-09-02', '21:00:00', '00:00:00', 'pendiente'),
(3, 3, '2024-09-03', '22:00:00', '01:00:00', 'cancelada'),
(4, 4, '2024-09-04', '19:00:00', '22:00:00', 'confirmada'),
(5, 5, '2024-09-05', '20:30:00', '23:30:00', 'pendiente'),
(6, 6, '2024-09-06', '21:30:00', '00:30:00', 'cancelada'),
(7, 7, '2024-09-07', '22:30:00', '01:30:00', 'confirmada'),
(8, 8, '2024-09-08', '19:30:00', '22:30:00', 'pendiente'),
(9, 9, '2024-09-09', '20:00:00', '23:00:00', 'confirmada'),
(10, 10, '2024-09-10', '21:00:00', '00:00:00', 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol` enum('administrador','cajero','mozo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre_usuario`, `contrasena`, `rol`) VALUES
(1, 'admin01', 'password123', 'administrador'),
(2, 'cajero01', 'cajero123', 'cajero'),
(3, 'mozo01', 'mozo123', 'mozo'),
(4, 'admin02', 'securepass', 'administrador'),
(5, 'cajero02', 'cajero321', 'cajero'),
(6, 'mozo02', 'mozo321', 'mozo'),
(7, 'admin03', 'pass456', 'administrador'),
(8, 'cajero03', 'cajero456', 'cajero'),
(9, 'mozo03', 'mozo456', 'mozo'),
(10, 'admin04', 'adminpass789', 'administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha_venta` date NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `metodo_pago` enum('efectivo','tarjeta','yape','plin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `id_cliente`, `fecha_venta`, `total`, `metodo_pago`) VALUES
(1, 1, '2024-08-01', 150.00, 'efectivo'),
(2, 2, '2024-08-02', 200.00, 'tarjeta'),
(3, 3, '2024-08-03', 250.00, 'yape'),
(4, 4, '2024-08-04', 300.00, 'plin'),
(5, 5, '2024-08-05', 100.00, 'efectivo'),
(6, 6, '2024-08-06', 180.00, 'tarjeta'),
(7, 7, '2024-08-07', 220.00, 'yape'),
(8, 8, '2024-08-08', 270.00, 'plin'),
(9, 9, '2024-08-09', 320.00, 'efectivo'),
(10, 10, '2024-08-10', 90.00, 'tarjeta');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `box`
--
ALTER TABLE `box`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- Indices de la tabla `detallereservas`
--
ALTER TABLE `detallereservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_reserva` (`id_reserva`),
  ADD KEY `id_box` (`id_box`);

--
-- Indices de la tabla `detalleventas`
--
ALTER TABLE `detalleventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_venta` (`id_venta`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `inventarios`
--
ALTER TABLE `inventarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `promociones`
--
ALTER TABLE `promociones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `promociones_clientes`
--
ALTER TABLE `promociones_clientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_promocion` (`id_promocion`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `box`
--
ALTER TABLE `box`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `detallereservas`
--
ALTER TABLE `detallereservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `detalleventas`
--
ALTER TABLE `detalleventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `inventarios`
--
ALTER TABLE `inventarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `promociones`
--
ALTER TABLE `promociones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `promociones_clientes`
--
ALTER TABLE `promociones_clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detallereservas`
--
ALTER TABLE `detallereservas`
  ADD CONSTRAINT `detallereservas_ibfk_1` FOREIGN KEY (`id_reserva`) REFERENCES `reservas` (`id`),
  ADD CONSTRAINT `detallereservas_ibfk_2` FOREIGN KEY (`id_box`) REFERENCES `box` (`id`);

--
-- Filtros para la tabla `detalleventas`
--
ALTER TABLE `detalleventas`
  ADD CONSTRAINT `detalleventas_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id`),
  ADD CONSTRAINT `detalleventas_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `inventarios`
--
ALTER TABLE `inventarios`
  ADD CONSTRAINT `inventarios_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `promociones_clientes`
--
ALTER TABLE `promociones_clientes`
  ADD CONSTRAINT `promociones_clientes_ibfk_1` FOREIGN KEY (`id_promocion`) REFERENCES `promociones` (`id`),
  ADD CONSTRAINT `promociones_clientes_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
