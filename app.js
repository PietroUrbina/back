import express from "express"
import cors from 'cors'

//importamos la BD
import db from "./database/db.js";

//importamos nuestros enrutadorers
import UsuariosRoutes from "./routes/usuariosRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";

const app = express()
app.use(cors())
app.use(express.json())
app.use('/usuarios', UsuariosRoutes)
app.use('/clientes', clientesRoutes)  

try {
    await db.authenticate()
    console.log('conexion a la base de datos exitosa')
} catch (error) {
    console.log(`El error de conexion es:${error}`)
}

  /**  app.get('/', (req, res) => {
        res.send('HOLA MUNDO')
    })*/ 

app.listen(8000, ()=>{
    console.log('Servidor corriendo en http://localhost:8000/');   
})