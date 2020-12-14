//ruta api usuarios

const Router = require('express');
const { check } = require('express-validator');
const { getUsuarios, getUsuariosid, addUsuario, updateUsuario, deleteUsuario } = require('../bml/controllers/usuarios');
const { validarCampos } = require('../bml/middlewares/validar-campos');

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuariosid);
router.post('/', check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email es requerida').not().isEmpty(),
    check('password', 'La password es requerida').not().isEmpty(), addUsuario);
router.put('/:id', check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email es requerida').not().isEmpty(),
    check('password', 'La password es requerida').not().isEmpty(), updateUsuario);

router.delete('/:id', deleteUsuario);


module.exports = router;