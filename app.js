import express from 'express';
import { obtenerPuntajes } from './obtenerPuntuacion.js';
import cors from 'cors';

const app = express();
const port = 4202;

app.use(cors({
  origin: 'http://localhost:3000'
})); // Allow specific origin

app.get('/', (req, res) => {
    res.send('Ejecutando microservicio 2!');
});

app.get('/obtenerPuntaje/:id', async (req, res) => {
    const id = req.params.id;
    const puntaje = await obtenerPuntajes(id);
    res.json({
        nombre: puntaje.nombre,
        puntuacion: puntaje.puntuacion
    });
});

app.listen(port, () => {
    console.log(`Microservicio 2 escuchando en http://localhost:${port}`);
});
