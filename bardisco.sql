-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-10-2024 a las 19:27:01
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
-- Base de datos: `bardisco`
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
(1, 'Box VIP.', 10, 'Comprar 1 Wisky de 250'),
(2, 'Box Familiar', 6, 'Comprar 1 Ron de 150'),
(3, 'Box Amigos', 8, 'comprar 1 wisky y un valde de cerveza corona'),
(4, 'Box Parejas', 2, 'comprar un wisky'),
(5, 'Box Corporativo', 12, 'hacer un consumo de 500 en reserva'),
(6, 'Box Daw', 6, 'consumo de 400 soles');

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
(1, 'Bebidas Alcohólicas', 'Licores y tragos preparados'),
(2, 'Bebidas no Alcohólicas', 'Jugos y refrescos sin alcohol'),
(3, 'Comida', 'Aperitivos y platos principales'),
(4, 'Postres', 'Dulces y postres diversos'),
(5, 'Promociones Especiales', 'Promociones en bebidas y comidas');

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
(1, '12345678', 'Luis', 'Gómez', 'Av. Brasil 100', 'luis.gomez@mail.com', '987654320', '1990-05-22', 'masculino'),
(2, '23456789', 'Andrea', 'Salas', 'Calle Olmos 200', 'andrea.salas@mail.com', '987654321', '1985-10-12', 'femenino'),
(3, '34567890', 'José', 'Martínez', 'Jr. Amazonas 300', 'jose.martinez@mail.com', '987654322', '1995-07-30', 'masculino'),
(4, '45678901', 'Lucía', 'Cruz', 'Av. Bolívar 400', 'lucia.cruz@mail.com', '987654323', '1992-01-16', 'femenino'),
(5, '56789012', 'Miguel', 'Rojas', 'Jr. Junín 500', 'miguel.rojas@mail.com', '987654324', '1988-03-08', 'masculino');

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

--
-- Volcado de datos para la tabla `detallesboxes`
--

INSERT INTO `detallesboxes` (`id`, `id_box`, `id_producto`, `cantidad_minima`, `observaciones`) VALUES
(1, 1, 1, 2, 'Min. 2 botellas de Pisco Sour para Box VIP'),
(2, 2, 2, 4, 'Min. 4 bebidas para Box Familiar'),
(3, 3, 3, 6, 'Min. 6 hamburguesas para Box Amigos'),
(4, 4, 4, 2, 'Min. 2 botellas para Box Parejas'),
(5, 5, 5, 5, 'Min. 5 productos para Box Corporativo');

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

--
-- Volcado de datos para la tabla `detallesreservas`
--

INSERT INTO `detallesreservas` (`id`, `id_reserva`, `id_box`, `disponibilidad`) VALUES
(1, 1, 1, 1),
(2, 2, 2, 1),
(3, 3, 3, 0),
(4, 4, 4, 1),
(5, 5, 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallesventas`
--

CREATE TABLE `detallesventas` (
  `id` int(11) NOT NULL,
  `id_venta` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detallesventas`
--

INSERT INTO `detallesventas` (`id`, `id_venta`, `id_producto`, `cantidad`, `precio_unitario`) VALUES
(1, 1, 1, 2, 15.50),
(2, 2, 3, 1, 20.00),
(3, 3, 4, 2, 12.00),
(4, 4, 2, 4, 5.00),
(5, 5, 5, 4, 25.00);

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
(2, '0', 'María López', '0', 'Av. Grau 456', '987654322', 'maria.lopez@bardisco.com', '2021-12-10'),
(3, '0', 'Carlos Sánchez', '0', 'Jr. Puno 789', '987654323', 'carlos.sanchez@bardisco.com', '2020-06-20'),
(4, '0', 'Ana Gutiérrez', '0', 'Calle Arequipa 101', '987654324', 'ana.gutierrez@bardisco.com', '2023-03-05'),
(5, '0', 'Pedro Torres', '0', 'Av. Tacna 202', '987654325', 'pedro.torres@bardisco.com', '2021-07-14'),
(6, '12345678', 'Pietro Urbina', '0', 'Av.Manantay Mz:C lt:09', '96049543', 'urbinapala2005@gmai.com', '2024-10-10'),
(9, '60885621', 'PIETRO MARSEL', 'URBINA PALA', 'Av.Manantay Mz:C Lt:09', '960495403', 'urbinapala2005@gmail.com', '2024-10-22');

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
(1, 1, 100, 21.00, 'botella', 'Entrada', '2023-12-20'),
(2, 2, 200, 5.00, 'botella', 'Entrada', '2023-12-01'),
(3, 3, 50, 25.00, 'unidad', 'Entrada', '2023-12-01'),
(27, 5, 5, 20.00, 'combo', 'Entrada', '2024-10-20'),
(28, 4, 15, 15.00, 'unidad', 'Entrada', '2024-10-20'),
(37, 6, 50, 90.00, 'botella', 'Entrada', '2024-10-22');

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
(1, 'Pisco Sour', 'Trago típico peruano con pisco, limón y clara de huevo', 1, 15.50, '2024-06-30', 'https://licoreriamrwalker.pe/wp-content/uploads/2024/02/Receta-Pisco-Sour.png', 'activo'),
(2, 'Coca Cola', 'Bebida gaseosa refrescante', 2, 3.00, '2024-01-15', 'https://lh5.googleusercontent.com/proxy/p_Fk2JBb05FGA16yw14WCaFa5Lq8_I-5QOOh__EtMJUgAbGRRC2-H5MycCfvd1-6nt5NLClri9J7LWR6Zl_R6kc_bnSLNtzBiduu_Q', 'activo'),
(3, 'Hamburguesa', 'Hamburguesa de carne con papas fritas', 3, 20.00, '2024-07-01', 'https://d31npzejelj8v1.cloudfront.net/media/recipemanager/recipe/1687289598_doble-carne.jpg', 'activo'),
(4, 'Cheesecake', 'Postre a base de queso crema y fresa', 4, 12.00, '2024-08-12', 'https://www.splenda.com/wp-content/themes/bistrotheme/assets/recipe-images/strawberry-topped-cheesecake.jpg', 'activo'),
(5, 'Combo Especial', 'Promoción especial con comida y bebida', 5, 26.00, '2024-12-01', 'https://lahorape09e13.zapwp.com/wp-content/uploads/2024/09/pilsen-pizza-hut.webp', 'activo'),
(6, 'Red Label-Johnnie Walker', 'Whisky Johnnie Walker Red Label 750ml', 1, 65.00, '2050-02-20', 'data:image/jpeg;base64,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', 'activo'),
(10, 'San Juan lata', 'San Juan en lata 355ml', 1, 4.00, '2024-10-22', 'data:image/jpeg;base64,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', 'inactivo');

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

--
-- Volcado de datos para la tabla `promociones`
--

INSERT INTO `promociones` (`id`, `descripcion`, `descuento`, `fecha_inicio`, `fecha_fin`) VALUES
(1, 'Promoción 2x1 en tragos', 50.00, '2023-10-01', '2023-10-31'),
(2, 'Descuento 20% en postres', 20.00, '2023-11-01', '2023-11-15'),
(3, 'Happy Hour: 3 cervezas x 20 soles', 33.33, '2023-09-01', '2023-09-30'),
(4, 'Comida + Bebida a 25 soles', 40.00, '2023-08-01', '2023-08-31'),
(5, 'Promoción de bienvenida: 10% descuento', 10.00, '2023-12-01', '2023-12-31');

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

--
-- Volcado de datos para la tabla `promocionesclientes`
--

INSERT INTO `promocionesclientes` (`id`, `id_cliente`, `id_promocion`, `fecha_aplicacion`) VALUES
(1, 1, 1, '2024-01-10'),
(2, 2, 2, '2024-01-11'),
(3, 3, 3, '2024-01-12'),
(4, 4, 4, '2024-01-13'),
(5, 5, 5, '2024-01-14');

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

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `id_cliente`, `fecha_reserva`, `num_personas`, `estado`, `id_usuario`, `fecha_creacion`) VALUES
(1, 1, '2024-01-20 20:00:00', 5, 'Confirmada', 1, '2024-10-07 21:42:19'),
(2, 2, '2024-01-21 21:00:00', 2, 'Pendiente', 2, '2024-10-07 21:42:19'),
(3, 3, '2024-01-22 19:00:00', 8, 'Cancelada', 3, '2024-10-07 21:42:19'),
(4, 4, '2024-01-23 18:30:00', 10, 'Expirada', 4, '2024-10-07 21:42:19'),
(5, 5, '2024-01-24 22:00:00', 3, 'Confirmada', 5, '2024-10-07 21:42:19');

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
(1, 'LordTotal', '1234', 'Administrador', 3),
(2, 'cajero1', 'abcd', 'Cajero', 2),
(3, 'mozo1', 'pass', 'Mozo', 3),
(4, 'cajero2', 'xyz', 'Cajero', 4),
(5, 'mozo2', '7890', 'Mozo', 5),
(6, 'piurbina', '$2a$10$C1RkYhM7Eavy9LwDJ9olMeg3gNGwg3hvw8CWNJa5sFoIg8FcbU05i', 'Administrador', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `metodo_pago` enum('Efectivo','Tarjeta','Yape','Plin') NOT NULL,
  `comprobante` varchar(255) DEFAULT NULL,
  `tipo_comprobante` enum('Boleta','Factura') NOT NULL,
  `fecha_emision` date NOT NULL,
  `estado` enum('Emitido','Cancelado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `id_usuario`, `id_cliente`, `total`, `metodo_pago`, `comprobante`, `tipo_comprobante`, `fecha_emision`, `estado`) VALUES
(1, 1, 1, 45.50, 'Tarjeta', 'B001-0001', 'Boleta', '2024-01-15', 'Emitido'),
(2, 2, 2, 50.00, 'Efectivo', 'B001-0002', 'Boleta', '2024-01-16', 'Emitido'),
(3, 3, 3, 35.00, 'Yape', 'F001-0001', 'Factura', '2024-01-17', 'Emitido'),
(4, 4, 4, 20.00, 'Plin', 'B001-0003', 'Boleta', '2024-01-18', 'Cancelado'),
(5, 5, 5, 100.00, 'Tarjeta', 'F001-0002', 'Factura', '2024-01-19', 'Emitido');

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
-- Indices de la tabla `detallesventas`
--
ALTER TABLE `detallesventas`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
-- AUTO_INCREMENT de la tabla `detallesventas`
--
ALTER TABLE `detallesventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `inventarios`
--
ALTER TABLE `inventarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
-- Filtros para la tabla `detallesventas`
--
ALTER TABLE `detallesventas`
  ADD CONSTRAINT `detallesventas_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id`),
  ADD CONSTRAINT `detallesventas_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

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
