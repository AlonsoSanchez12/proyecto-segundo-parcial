const { query, querySingle, execute } = require('../../dal/data-access');

//Obtener usuarios
const getAlumnos = async(req, res) => {
    let alumnos = await query('stp_alumnos_getall');
    if (alumnos) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: alumnos
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al consultar los usuarios',
            data: null
        });
    }
}

//Obtener usuarios por id
const getAlumnosid = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idAlumno',
        'value': id
    }];
    let alumnos = await query('stp_alumnos_getbyid', sqlParams);
    if (alumnos) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: alumnos
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al consultar los usuarios',
            data: null
        });
    }

}

//Agregar alumnos

const addAlumno = async(req, res) => {
    const { nombre, edad, sexo, semestre, carrera } = req.body;
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'sexo',
            'value': sexo
        },
        {
            'name': 'semestre',
            'value': semestre
        },
        {
            'name': 'carrera',
            'value': carrera
        }
    ];

    let rowsAffected = await execute('stp_alumnos_add', sqlParams);

    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Alumno agregado exitosamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al agregar el alumno',
            data: 0
        });
    }
}

//Actualizar alumno
const updateAlumno = async(req, res) => {
    const { id } = req.params;
    const { nombre, edad, sexo, semestre, carrera } = req.body;
    const sqlParams = [{
            'name': 'idAlumno',
            'value': id
        },
        {
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'sexo',
            'value': sexo
        },
        {
            'name': 'semestre',
            'value': semestre
        },
        {
            'name': 'carrera',
            'value': carrera
        }
    ];

    let rowsAffected = await execute('stp_alumnos_update', sqlParams);

    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Alumno actualizado exitosamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al actualizar el alumno',
            data: 0
        });
    }
}

//Borrar alumno
const deleteAlumno = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idAlumno',
        'value': id
    }];

    let rowsAffected = await execute('stp_alumnos_delete', sqlParams);
    if (rowsAffected) {
        res.json({
            status: true,
            message: 'Alumno eliminado exitosamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al eliminar el alumno',
            data: 0
        });
    }
}

module.exports = { getAlumnos, getAlumnosid, addAlumno, updateAlumno, deleteAlumno };