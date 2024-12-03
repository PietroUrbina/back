import empresasModel from "../models/empresasModel.js"; // Importa el modelo de empresas

//**Métodos para el CRUD */

// Mostrar todas las empresas
export const getAllEmpresas = async (req, res) => {
    try {
        const empresas = await empresasModel.findAll();
        res.json(empresas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mostrar una empresa por ID
export const getEmpresa = async (req, res) => {
    try {
        const empresa = await empresasModel.findOne({
            where: { id: req.params.id }
        });
        if (!empresa) {
            return res.status(404).json({ message: "Empresa no encontrada" });
        }
        res.json(empresa);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una empresa
export const createEmpresa = async (req, res) => {
    const { ruc, razon_social, direccion, estado, tipo_contribuyente } = req.body;

    try {
        const empresa = await empresasModel.create({ ruc, razon_social, direccion, estado, tipo_contribuyente });
        res.json({
            message: "¡Empresa creada correctamente!",
            empresa
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una empresa
export const updateEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await empresasModel.update(req.body, {
            where: { id }
        });

        if (updated === 0) {
            return res.status(404).json({ message: "Empresa no encontrada para actualizar" });
        }

        res.json({
            message: "¡Empresa actualizada correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una empresa
export const deleteEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await empresasModel.destroy({
            where: { id }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: "Empresa no encontrada para eliminar" });
        }

        res.json({
            message: "¡Empresa eliminada correctamente!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
