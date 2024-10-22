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
            const nombreCompleto = `${response.data.nombres}`;
            const apellidosCompletos = `${response.data.apellidoPaterno} ${response.data.apellidoMaterno}`;

            res.json({
                nombreCompleto: nombreCompleto,
                apellidosCompletos: apellidosCompletos,
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

export { obtenerDatosPersona };
