import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// importar la base de datos
import db from "./database/db.js";

// Importar todos los modelos individuales
import "./models/productosModel.js";
import "./models/inventariosModel.js";
import "./models/usuariosModel.js";
import "./models/clientesModel.js";
import "./models/empleadosModel.js";
import "./models/ventasModel.js";
import "./models/detalleVentasModel.js";

// Importar relaciones entre modelos (debe ir después de los modelos)
import './models/relations.js';

// Configuración de la aplicación
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Configuración de __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir imágenes desde la carpeta 'public/images'
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Importar rutas y configurar la aplicación
import UsuariosRoutes from "./routes/usuariosRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import empresasRoutes from "./routes/empleadosRoutes.js";
import inventariosRoutes from "./routes/inventariosRoutes.js";
import kardexRoutes from "./routes/kardexRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";
import categoriasRoutes from "./routes/categoriasRoutes.js";
import promocionesRoutes from "./routes/promocionesRoutes.js";
import promocionesClientesRoutes from "./routes/promocionesClientesRoutes.js";
import reservasRoutes from "./routes/reservasRoutes.js";
import detalleReservasRoutes from "./routes/detalleReservasRoutes.js";
import ventasRoutes from "./routes/ventasRoutes.js";
import detalleVentasRoutes from "./routes/detalleVentasRoutes.js";
import empleadosRoutes from "./routes/empleadosRoutes.js";
import boxRoutes from "./routes/boxRoutes.js";
import detalleBoxRoutes from "./routes/detalleBoxRoutes.js";

// Rutas de la aplicación
app.use('/usuarios', UsuariosRoutes);
app.use('/clientes', clientesRoutes);
app.use('/empresas', empresasRoutes);
app.use('/inventarios', inventariosRoutes);
app.use('/kardex', kardexRoutes);
app.use('/productos', productosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/promociones', promocionesRoutes);
app.use('/promocionesClientes', promocionesClientesRoutes);
app.use('/reservas', reservasRoutes);
app.use('/detalleReservas', detalleReservasRoutes);
app.use('/ventas', ventasRoutes);
app.use('/detalleVentas', detalleVentasRoutes);
app.use('/empleados', empleadosRoutes);
app.use('/box', boxRoutes);
app.use('/detallebox', detalleBoxRoutes);

// Conectar a la base de datos
try {
    await db.authenticate();
    console.log('Conexión a la base de datos exitosa');
} catch (error) {
    console.log(`Error de conexión: ${error}`);
}

app.listen(8000, () => {
    console.log('Servidor corriendo en http://localhost:8000/');
});
