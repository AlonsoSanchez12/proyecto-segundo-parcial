//ruta api materia

const Router = require('express');
const { check } = require('express-validator');
const { getMaterias, getMateriasid, addMateria, updateMateria, deleteMateria } = require('../bml/controllers/materias');
const { validarCampos } = require('../bml/middlewares/validar-campos');

const router = Router();

router.get('/', getMaterias);
router.get('/:id', getMateriasid);
router.post('/', check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('horas', 'Las horas son requeridas').not().isEmpty(),
    check('horasp', 'Las horas p es requeridas').not().isEmpty(),
    check('horast', 'Las horas t son requeridas').not().isEmpty(),
    check('creditos', 'Los creditos son requeridos').not().isEmpty(), addMateria);
router.put('/:id', check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('horas', 'Las horas son requeridas').not().isEmpty(),
    check('horasp', 'Las horas p es requeridas').not().isEmpty(),
    check('horast', 'Las horas t son requeridas').not().isEmpty(),
    check('creditos', 'Los creditos son requeridos').not().isEmpty(), updateMateria);
router.delete('/:id', deleteMateria);



module.exports = router;