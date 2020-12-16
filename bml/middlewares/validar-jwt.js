const jwt = require('jsonwebtoken');
const { generateJWT } = require('../helpers/jwt')

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            status: false,
            message: 'No hay token en la petición',
            data: null,
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        next();
    } catch (error) {
        return res.json({
            status: false,
            message: 'Token no valido',
            data: null,
        });
    }
}

const renewJWT = async(req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.json({
            status: false,
            message: 'No hay token',
            data: null
        });
    }
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        const newtoken = await generateJWT(id);
        return res.json({
            status: true,
            message: 'El Token es valido',
            data: newtoken
        });
        next();
    } catch (error) {
        return res.json({
            status: false,
            message: 'Invalid token',
            data: null
        });
    }
}

module.exports = {
    validarJWT,
    renewJWT,
}