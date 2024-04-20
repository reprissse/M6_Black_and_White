// Importamos express
import express from 'express';

// Importamos el router
import router from './routes/router.js';

// Creamos la app
const app = express ();

// Definimos el puerto
const PORT = process.env.PORT || 3008;

// Servimos archivos estáticos
app.use(express.static('assets'))

// Usamos el router
app.use('/', router);

// Iniciamos el servidor
app.listen(PORT, () => {
    // Mensaje de inicio
    console.log(`Servidor en http://localhost:${PORT}`);
});

