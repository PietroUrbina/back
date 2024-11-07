-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-11-2024 a las 13:53:30
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
-- Estructura de tabla para la tabla `boxs`
--

CREATE TABLE `boxs` (
  `id` int(11) NOT NULL,
  `nombre_box` varchar(50) NOT NULL,
  `capacidad` int(11) NOT NULL,
  `requisitos` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `boxs`
--

INSERT INTO `boxs` (`id`, `nombre_box`, `capacidad`, `requisitos`) VALUES
(10, 'Box VIP', 6, 'Ser cliente VIP'),
(11, 'Box Golden', 8, 'Hacer un consumo de /S400'),
(12, 'Box Personalizado', 12, 'Comprar Whiskys 2 Gold Label');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre_categoria` varchar(100) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre_categoria`, `descripcion`) VALUES
(7, 'Bebidas', 'Bebidas como Agua, gaseosa, etc'),
(8, 'Bebidas Alcoholicas', 'Ron, Whisky, cerveza,etc'),
(9, 'Preparados', 'Tragos preparados'),
(10, 'Golosinas', 'Snacks, caramelos, chicles, etc');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `telefono` varchar(9) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `sexo` enum('masculino','femenino','otro') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `dni`, `nombre`, `apellido`, `direccion`, `email`, `telefono`, `fecha_nacimiento`, `sexo`) VALUES
(6, '45161620', 'LUIS ELMER', 'VIERA FLORES', 'Jr.Miraflores Mz:A Lt:64', 'LuisViera@gmail.com', '961077401', '1985-06-02', 'masculino'),
(7, '60855620', 'DURGA MARIA', 'SULLCA ALATA', 'Av.Los Mangos 369', 'Sulcamaria@gmail.com', '960499563', '2000-10-25', 'femenino'),
(8, '40459562', 'JANETH', 'HUAMANTALLA USCAMAYTA', 'Jr. Rosales 569', 'JanethH@gmail.com', '961555678', '1989-11-20', 'femenino'),
(9, '60885621', 'PIETRO MARSEL', 'URBINA PALA', 'Av.Manantay Mz:C Lt_09', 'urbinapala2005@gmail.com', '960495403', '2005-04-20', 'masculino'),
(10, '45162004', 'SIDALIA MALU', 'PALA GRANDEZ', 'Av.Manantay Mz:C Lt:09', 'sidaliamalupala@gmail.com', '921966171', '1989-03-16', 'femenino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleboxs`
--

CREATE TABLE `detalleboxs` (
  `id` int(11) NOT NULL,
  `id_box` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad_minima` int(11) DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallereservas`
--

CREATE TABLE `detallereservas` (
  `id` int(11) NOT NULL,
  `id_reserva` int(11) DEFAULT NULL,
  `id_box` int(11) DEFAULT NULL,
  `disponibilidad` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallesboxes`
--

CREATE TABLE `detallesboxes` (
  `id` int(11) NOT NULL,
  `id_box` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad_minima` int(11) NOT NULL,
  `observaciones` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallesreservas`
--

CREATE TABLE `detallesreservas` (
  `id` int(11) NOT NULL,
  `id_reserva` int(11) DEFAULT NULL,
  `id_box` int(11) DEFAULT NULL,
  `disponibilidad` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleventas`
--

CREATE TABLE `detalleventas` (
  `id` int(11) NOT NULL,
  `id_venta` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalleventas`
--

INSERT INTO `detalleventas` (`id`, `id_venta`, `id_producto`, `cantidad`, `subtotal`) VALUES
(2, 30, 15, 1, 4.00),
(3, 31, 13, 1, 150.00),
(4, 32, 11, 6, 60.00),
(5, 33, 14, 2, 3.00),
(6, 33, 15, 2, 8.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `nombre_empleado` varchar(100) NOT NULL,
  `apellido_empleado` varchar(100) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fecha_contratacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `dni`, `nombre_empleado`, `apellido_empleado`, `direccion`, `telefono`, `email`, `fecha_contratacion`) VALUES
(10, '79625674', 'JAMIN MANASSES', 'QUISPE MONTELUIS', 'Jr. Santa Ana Mz:09 Lt:03.', '957656455', 'jaminM@hotmail.com', '2024-10-25'),
(11, '73139528', 'LUZ CLARA', 'PEREZ LOZANO', 'Jr.Los Tulipanes 154', '930565554', 'lclarap@gmail.com', '2024-10-25'),
(12, '60885621', 'PIETRO MARSEL', 'URBINA PALA', 'Av.Manantay Mz:C Lt:09', '960495403', 'urbinapala2005@gmail.com', '2024-10-25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventarios`
--

CREATE TABLE `inventarios` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `unidad_medida` varchar(50) DEFAULT NULL,
  `tipo_movimiento` enum('Entrada','Salida') NOT NULL,
  `fecha_movimiento` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventarios`
--

INSERT INTO `inventarios` (`id`, `id_producto`, `stock`, `precio`, `unidad_medida`, `tipo_movimiento`, `fecha_movimiento`) VALUES
(39, 12, 66, 5.00, 'UND', 'Entrada', '2024-10-25'),
(40, 13, 17, 150.00, 'UND', 'Entrada', '2024-10-25'),
(41, 14, 7, 1.50, 'UND', 'Entrada', '2024-10-25'),
(42, 15, 102, 4.00, 'UND', 'Entrada', '2024-10-31'),
(43, 11, 174, 10.00, 'UND', 'Entrada', '2024-10-31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `costo` decimal(10,2) NOT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `imagen` text DEFAULT NULL,
  `estado` varchar(10) DEFAULT 'inactivo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `id_categoria`, `costo`, `fecha_vencimiento`, `imagen`, `estado`) VALUES
(11, 'Cerveza San Juan', 'San Juan Botella 355ml', 8, 4.50, '2025-10-25', 'https://www.sanjuan.com.pe/sites/g/files/wnfebl3991/files/styles/product_card_and_list/public/users/user1386/SJ_WEB_BOTELLA.png?itok=Pl6JDGnk', 'activo'),
(12, 'San Juan en lata', 'San Juan Lata 355ml', 8, 4.00, '2025-11-20', 'https://www.sanjuan.com.pe/sites/g/files/wnfebl3991/files/styles/product_card_and_list/public/users/user1386/SJ_LATA.png?itok=yWve7Ybx', 'activo'),
(13, 'Whisky Black Label', 'Whisky JOHNNIE WALKER Black Label Botella 750ml', 8, 100.00, '2034-10-11', 'data:image/jpeg;base64,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', 'activo'),
(14, 'Agua Cielo', 'Agua Cielo 750ml', 7, 0.90, '2025-10-25', 'https://group-ism.com/wp-content/uploads/2023/07/cielo-sin-gas2.png', 'activo'),
(15, 'Coca Cola', 'Gaseosa Coca Cola de 750ml', 7, 2.50, NULL, 'data:image/jpeg;base64,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', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promociones`
--

CREATE TABLE `promociones` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `descuento` decimal(5,2) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promocionesclientes`
--

CREATE TABLE `promocionesclientes` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_promocion` int(11) DEFAULT NULL,
  `fecha_aplicacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promociones_clientes`
--

CREATE TABLE `promociones_clientes` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_promocion` int(11) DEFAULT NULL,
  `fecha_aplicacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `fecha_reserva` datetime NOT NULL,
  `num_personas` int(11) NOT NULL,
  `estado` enum('Pendiente','Confirmada','Cancelada','Expirada') NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol` enum('Administrador','Cajero','Mozo') NOT NULL,
  `id_empleado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre_usuario`, `contrasena`, `rol`, `id_empleado`) VALUES
(16, 'PietroUrbina', '$2a$10$fmb3RKWYJqTHrpajLqY4u.Ork5Gz4EXbE2101457XsFCCMelfQt5q', 'Administrador', 12),
(18, 'Jamin Quispe', '$2a$10$liREpFj7r1tKnNYdYTdoROceDNhUstLQDLTKMMkL2aI45oxfeGKm6', 'Cajero', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `metodo_pago` enum('Efectivo','Tarjeta','Yape','Plin') NOT NULL,
  `imagen_evidencia` longblob DEFAULT NULL,
  `numero_operacion` varchar(255) DEFAULT NULL,
  `tipo_comprobante` enum('Boleta','Factura') NOT NULL,
  `fecha_emision` datetime NOT NULL,
  `estado` enum('Emitido','Cancelado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `id_usuario`, `id_cliente`, `total`, `metodo_pago`, `imagen_evidencia`, `numero_operacion`, `tipo_comprobante`, `fecha_emision`, `estado`) VALUES
(30, 16, 9, 4.00, 'Efectivo', NULL, NULL, 'Boleta', '2024-11-07 03:57:41', 'Emitido'),
(31, 16, 8, 150.00, 'Efectivo', NULL, NULL, 'Boleta', '2024-11-07 05:42:36', 'Emitido'),
(32, 18, 6, 60.00, 'Efectivo', NULL, NULL, 'Factura', '2024-11-07 05:43:42', 'Emitido'),
(33, 18, 6, 11.00, 'Efectivo', NULL, NULL, 'Boleta', '2024-11-07 06:45:43', 'Emitido');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `boxs`
--
ALTER TABLE `boxs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalleboxs`
--
ALTER TABLE `detalleboxs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detallereservas`
--
ALTER TABLE `detallereservas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detallesboxes`
--
ALTER TABLE `detallesboxes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_box` (`id_box`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `detallesreservas`
--
ALTER TABLE `detallesreservas`
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
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `promociones`
--
ALTER TABLE `promociones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `promocionesclientes`
--
ALTER TABLE `promocionesclientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_promocion` (`id_promocion`);

--
-- Indices de la tabla `promociones_clientes`
--
ALTER TABLE `promociones_clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_empleado` (`id_empleado`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `boxs`
--
ALTER TABLE `boxs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `detalleboxs`
--
ALTER TABLE `detalleboxs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detallereservas`
--
ALTER TABLE `detallereservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detallesboxes`
--
ALTER TABLE `detallesboxes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `detallesreservas`
--
ALTER TABLE `detallesreservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `detalleventas`
--
ALTER TABLE `detalleventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `inventarios`
--
ALTER TABLE `inventarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `promociones`
--
ALTER TABLE `promociones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `promocionesclientes`
--
ALTER TABLE `promocionesclientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `promociones_clientes`
--
ALTER TABLE `promociones_clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detallesboxes`
--
ALTER TABLE `detallesboxes`
  ADD CONSTRAINT `detallesboxes_ibfk_1` FOREIGN KEY (`id_box`) REFERENCES `boxs` (`id`),
  ADD CONSTRAINT `detallesboxes_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `detallesreservas`
--
ALTER TABLE `detallesreservas`
  ADD CONSTRAINT `detallesreservas_ibfk_1` FOREIGN KEY (`id_reserva`) REFERENCES `reservas` (`id`),
  ADD CONSTRAINT `detallesreservas_ibfk_2` FOREIGN KEY (`id_box`) REFERENCES `boxs` (`id`);

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
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`);

--
-- Filtros para la tabla `promocionesclientes`
--
ALTER TABLE `promocionesclientes`
  ADD CONSTRAINT `promocionesclientes_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `promocionesclientes_ibfk_2` FOREIGN KEY (`id_promocion`) REFERENCES `promociones` (`id`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
