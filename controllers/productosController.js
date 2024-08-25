//importamos el Modelo
import productosModel from "../models/productosModel.js";

//**Metodos para el CRUD */

//Mostrar todos los Productos
export const getAllProductos = async(req, res) => {
    try{
    const productos = await productosModel.findAll()
        res.json(productos)
    } catch (error) {
        res.json( {message: error.message})
    }

}
//Mostrar un Producto
export const getProducto = async (req, res)=> {
    try {
        const producto = await productosModel.findAll({
            where:{ 
                id:req.params.id
            }
        });
        res.json(producto);
        
    } catch (error) {
        res.json( {message: error.message})
    }
}
//crear un Producto
export const createProducto  = async (req, res) => {
    const { nombre, precio, stock, fecha_vencimiento } = req.body;

    try {
        await productosModel.create({ nombre, precio, stock, fecha_vencimiento });
        res.json({
            message: "Producto creado correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//actualizar un Producto
export const updateProducto = async (req, res) =>{
    try {
        await productosModel.update(req.body,{
            where:{id: req.params.id}
        })
        res.json({
            "message":"Producto actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}
//eliminar un Producto
export const deleteProducto = async (req, res) =>{
    try {
        await productosModel.destroy({
            where:{ id: req.params.id }
        })
        res.json({
            "message":"Producto eliminado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}