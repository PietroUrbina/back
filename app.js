import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';

//importamos la BD
import db from "./database/db.js";

//importamos nuestros enrutadorers
import UsuariosRoutes from "./routes/usuariosRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import boxRoutes from "./routes/boxRoutes.js";
import inventariosRoutes from "./routes/inventariosRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";
import promocionesRoutes from "./routes/promocionesRoutes.js";
import reservasRoutes from "./routes/reservasRoutes.js";
import promocionesClientesRoutes from "./routes/promocionesClientesRoutes.js";
import detalleReservasRoutes from "./routes/detalleReservasRoutes.js";
import ventasRoutes from "./routes/ventasRoutes.js";
import detalleVentasRoutes from "./routes/detalleVentasRoutes.js";


dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())
app.use('/usuarios', UsuariosRoutes)
app.use('/clientes', clientesRoutes)
app.use('/inventarios', inventariosRoutes)
app.use('/productos', productosRoutes)
app.use('/promociones', promocionesRoutes)
app.use('/promocionesClientes', promocionesClientesRoutes)
app.use('/reservas', reservasRoutes)
app.use('/detalleReservas', detalleReservasRoutes)
app.use('/ventas', ventasRoutes)
app.use('/detalleVentas', detalleVentasRoutes)
app.use('/box', boxRoutes)
 

try {
    await db.authenticate()
    console.log('conexion a la base de datos exitosa')
} catch (error) {
    console.log(`El error de conexion es:${error}`)
}

app.listen(8000, ()=>{
    console.log('Servidor corriendo en http://localhost:8000/')  
})