// Importamos los módulos necesarios
import express from 'express';
import Jimp from 'jimp';
import { v4 as uuidv4} from "uuid";
import path from 'path';

// Definimos el directorio actual
const __dirname = import.meta.dirname;

// Creamos un nuevo router
const router = express.Router();

// Ruta para la página principal
router.get('/', (req, res) => {
    // Enviamos el archivo index.html
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Ruta para cargar y procesar la imagen
router.get('/cargar', async(req, res) => {
    // Generamos un nombre único para la imagen
    const nombreImagen = `img${uuidv4().slice(0, 6)}.jpg`;

    // Obtenemos la URL de la imagen de la consulta
    const {img} = req.query;

    // Leemos la imagen con Jimp
    const imgJimp = await Jimp.read(img);

    // Procesamos la imagen: la redimensionamos, la convertimos a escala de grises y la guardamos
    await imgJimp
        .resize(350, Jimp.AUTO)
        .grayscale()
        .writeAsync(`assets/img/${nombreImagen}`);

    // Enviamos la imagen procesada como respuesta
    res.sendFile(path.join(__dirname, `../assets/img/${nombreImagen}`));
});

// Exportamos el router
export default router;

