-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-10-2024 a las 07:37:38
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
(1, 'Box VIP', 10, 'Comprar 1 Wisky de 250'),
(2, 'Box Familiar', 6, 'Comprar 1 Ron de 150'),
(3, 'Box Amigos', 8, 'comprar 1 wisky y un valde de cerveza corona'),
(4, 'Box Parejas', 2, 'comprar un wisky'),
(5, 'Box Corporativo', 12, 'hacer un consumo de 500 en reserva');

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
  `nombre_empleado` varchar(100) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fecha_contratacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `nombre_empleado`, `direccion`, `telefono`, `email`, `fecha_contratacion`) VALUES
(1, 'Juan Pérez', 'Calle Lima 123', '987654321', 'juan.perez@bardisco.com', '2022-01-15'),
(2, 'María López', 'Av. Grau 456', '987654322', 'maria.lopez@bardisco.com', '2021-12-10'),
(3, 'Carlos Sánchez', 'Jr. Puno 789', '987654323', 'carlos.sanchez@bardisco.com', '2020-06-20'),
(4, 'Ana Gutiérrez', 'Calle Arequipa 101', '987654324', 'ana.gutierrez@bardisco.com', '2023-03-05'),
(5, 'Pedro Torres', 'Av. Tacna 202', '987654325', 'pedro.torres@bardisco.com', '2021-07-14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventarios`
--

CREATE TABLE `inventarios` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `tipo_movimiento` enum('Entrada','Salida') NOT NULL,
  `stock` int(11) NOT NULL,
  `unidad_medida` varchar(50) DEFAULT NULL,
  `fecha_movimiento` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventarios`
--

INSERT INTO `inventarios` (`id`, `id_producto`, `tipo_movimiento`, `stock`, `unidad_medida`, `fecha_movimiento`) VALUES
(1, 1, 'Entrada', 100, 'botella', '2023-12-01 15:00:00'),
(2, 2, 'Entrada', 200, 'botella', '2023-12-01 16:00:00'),
(3, 3, 'Entrada', 50, 'unidad', '2023-12-01 17:00:00'),
(4, 4, 'Salida', 30, 'unidad', '2023-12-01 18:00:00'),
(5, 5, 'Entrada', 70, 'combo', '2023-12-01 19:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `imagen` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `id_categoria`, `precio`, `fecha_vencimiento`, `imagen`) VALUES
(1, 'Pisco Sour', 'Trago típico peruano con pisco, limón y clara de huevo', 1, 15.50, '2024-06-30', 'https://licoreriamrwalker.pe/wp-content/uploads/2024/02/Receta-Pisco-Sour.png'),
(2, 'Coca Cola', 'Bebida gaseosa refrescante', 2, 5.00, '2024-01-15', 'https://lh5.googleusercontent.com/proxy/p_Fk2JBb05FGA16yw14WCaFa5Lq8_I-5QOOh__EtMJUgAbGRRC2-H5MycCfvd1-6nt5NLClri9J7LWR6Zl_R6kc_bnSLNtzBiduu_Q'),
(3, 'Hamburguesa', 'Hamburguesa de carne con papas fritas', 3, 20.00, '2024-07-01', 'https://d31npzejelj8v1.cloudfront.net/media/recipemanager/recipe/1687289598_doble-carne.jpg'),
(4, 'Cheesecake', 'Postre a base de queso crema y fresa', 4, 12.00, '2024-08-12', 'https://www.splenda.com/wp-content/themes/bistrotheme/assets/recipe-images/strawberry-topped-cheesecake.jpg'),
(5, 'Combo Especial', 'Promoción especial con comida y bebida', 5, 25.00, '2024-12-01', 'https://lahorape09e13.zapwp.com/wp-content/uploads/2024/09/pilsen-pizza-hut.webp');

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
(1, 'admin', '1234', 'Administrador', 3),
(2, 'cajero1', 'abcd', 'Cajero', 2),
(3, 'mozo1', 'pass', 'Mozo', 3),
(4, 'cajero2', 'xyz', 'Cajero', 4),
(5, 'mozo2', '7890', 'Mozo', 5);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `inventarios`
--
ALTER TABLE `inventarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
