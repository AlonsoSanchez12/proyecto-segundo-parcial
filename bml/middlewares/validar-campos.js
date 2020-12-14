const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty) {
        return res.status(400).json({
            status: false,
            message: 'Error en la validacion de campos',
            data: errores.mappend()
        });
    }
    next();
}

module.exports = {
    validarCampos
}