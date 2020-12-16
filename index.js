require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: true
}));
app.use(express.json());

//Rutas
app.use('/api/alumnos', require('./routes/alumnos'));
app.use('/api/usuario', require('./routes/usuarios'));
app.use('/api/materias', require('./routes/materias'));
app.use('/api/docentes', require('./routes/docentes'));
app.use('/api/auth', require('./routes/auth'));


app.listen(process.env.PORT);