const { query, querySingle, execute } = require('../../dal/data-access');


//Obtener docente
const getDocentes = async(req, res) => {
    let docente = await query('stp_docentes_getall');
    if (docente) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: docente
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al consultar los docentes',
            data: null
        });
    }
}

//Obtener usuarios por id
const getDocentesid = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idDocente',
        'value': id
    }];
    let docente = await query('stp_docentes_getbyid', sqlParams);
    if (docente) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: docente
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al consultar las materias',
            data: null
        });
    }
}

//Agregar docentes

const addDocente = async(req, res) => {
    const { nombre, edad, titulo, tipo } = req.body;
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'titulo',
            'value': titulo
        },
        {
            'name': 'tipo',
            'value': tipo
        }
    ];

    let materia = await execute('stp_docentes_add', sqlParams);

    if (materia != 0) {
        res.json({
            status: true,
            message: 'Docente agregado exitosamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al agregar el docente',
            data: 0
        });
    }
}

//Actualizar docente
const updateDocente = async(req, res) => {
    const idDocente = req.params.id;
    const { nombre, edad, titulo, tipo } = req.body;
    const sqlParams = [{
            'name': 'idDocente',
            'value': idDocente
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
            'name': 'titulo',
            'value': titulo
        },
        {
            'name': 'tipo',
            'value': tipo
        }
    ];

    let materia = await execute('stp_docentes_update', sqlParams);

    if (materia != 0) {
        res.json({
            status: true,
            message: 'Docente actualizado exitosamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al actualizar el docente',
            data: 0
        });
    }
}

//Borrar materia
const deleteDocente = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idDocente',
        'value': id
    }];

    let rowsAffected = await execute('stp_docentes_delete', sqlParams);
    if (rowsAffected) {
        res.json({
            status: true,
            message: 'Docente eliminado exitosamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al eliminar el docente',
            data: 0
        });
    }
}


module.exports = { getDocentes, getDocentesid, addDocente, updateDocente, deleteDocente };