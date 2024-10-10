//importamos el Modelo
import categoriasModel from "../models/categoriasModel.js"

//**Metodos para el CRUD */

//Mostrar todos las categorias
export const getAllCategorias = async(req, res) => {
    try{
    const categoria = await categoriasModel.findAll()
        res.json(categoria)
    } catch (error) {
        res.json( {message: error.message})
    }

}
//Mostrar una categoria
export const getCategoria = async (req, res)=> {
    try {
        const categoria = await categoriasModel.findOne({
            where:{ 
                id:req.params.id
            }
        });
        res.json(categoria);
        
    } catch (error) {
        res.json( {message: error.message})
    }
}
//crear una categoria
export const createCategoria = async (req, res) => {
    const { nombre_categoria, descripcion} = req.body;
    
    try {
        await categoriasModel.create({ nombre_categoria, descripcion });
        res.json({
            message: "¡Categoria creado correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//actualizar una Categoria
export const updateCategoria = async (req, res) =>{
    try {
        await categoriasModel.update(req.body,{
            where:{id: req.params.id}
        })
        res.json({
            "message":"¡Categoria actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}
//eliminar una Categoria
export const deleteCategoria = async (req, res) =>{
    try {
        await categoriasModel.destroy({
            where:{ id: req.params.id }
        })
        res.json({
            "message":"Categoria eliminado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}