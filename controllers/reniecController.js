import axios from 'axios';

const obtenerDatosPersona = async (req, res) => {
    const { dni } = req.body;

    try {
        const response = await axios.get(`https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.API_RENIEC_TOKEN}`
            }
        });

        // Depuración: imprime la respuesta completa de la API
        console.log("Datos recibidos de la API:", response.data);
        
        if (response.data && Object.keys(response.data).length > 0) {
            // Combinar nombres y apellidos en campos únicos
            const nombreCompleto = `${response.data.nombres} ${response.data.apellidoPaterno} ${response.data.apellidoMaterno}`;

            res.json({
                nombreCompleto: nombreCompleto,
                tipoDocumento: response.data.tipoDocumento,
                numeroDocumento: response.data.numeroDocumento,
                digitoVerificador: response.data.digitoVerificador
            });
        } else {
            res.status(404).json({ error: "No se encontraron datos para el DNI proporcionado." });
        }
    } catch (error) {
        console.error('Error al llamar a la API de la RENIEC:', error);
        res.status(500).json({ error: 'Error al obtener los datos del cliente' });
    }
};
const obtenerDatosEmpresa = async (req, res) => {
    const { ruc } = req.body;

    try {
        const response = await axios.get(`https://api.apis.net.pe/v2/sunat/ruc/full?numero=${ruc}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.API_RENIEC_TOKEN}`
            }
        });

        console.log("Datos recibidos de la API:", response.data);

        if (response.data && Object.keys(response.data).length > 0) {
            res.json({
                razonSocial: response.data.razonSocial,
                nombreComercial: response.data.nombreComercial,
                estado: response.data.estado,
                direccion: response.data.direccion,
                telefono: response.data.telefono,
                tipoContribuyente: response.data.tipo,
                numeroDocumento: response.data.numeroDocumento
            });
        } else {
            res.status(404).json({ error: "No se encontraron datos para el RUC proporcionado." });
        }
    } catch (error) {
        console.error('Error al llamar a la API de RUC:', error);
        res.status(500).json({ error: 'Error al obtener los datos del cliente' });
    }
};

export { obtenerDatosPersona, obtenerDatosEmpresa };