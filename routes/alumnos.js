//ruta api/alumnos

const Router = require('express');
const { check } = require('express-validator');
const { getAlumnos, getAlumnosid, addAlumno, updateAlumno, deleteAlumno } = require('../bml/controllers/alumnos');
const { validarCampos } = require('../bml/middlewares/validar-campos');

const router = Router();

router.get('/', getAlumnos);
router.get('/:id', getAlumnosid);
router.post('/', check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('edad', 'La edad es requerida').not().isEmpty(),
    check('sexo', 'El sexo es requerido').not().isEmpty(),
    check('semestre', 'El semestre es requerido').not().isEmpty(),
    check('carrera', 'La carrera es requerida').not().isEmpty(), addAlumno);

router.put('/:id', check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('edad', 'La edad es requerida').not().isEmpty(),
    check('sexo', 'El sexo es requerido').not().isEmpty(),
    check('semestre', 'El semestre es requerido').not().isEmpty(),
    check('carrera', 'La carrera es requerida').not().isEmpty(), updateAlumno);

router.delete('/:id', deleteAlumno);



module.exports = router;