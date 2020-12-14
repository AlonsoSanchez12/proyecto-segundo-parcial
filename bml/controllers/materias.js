const { query, querySingle, execute } = require('../../dal/data-access');

//Obtener materia
const getMaterias = async(req, res) => {
    let materia = await query('stp_materias_getall');
    if (materia) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: materia
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al consultar las materias',
            data: null
        });
    }
}

//Obtener usuarios por id
const getMateriasid = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idMateria',
        'value': id
    }];
    let materia = await query('stp_materias_getbyid', sqlParams);
    if (materia) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: materia
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al consultar las materias',
            data: null
        });
    }

}

//Agregar materias

const addMateria = async(req, res) => {
    const { nombre, horas, horasp, horast, creditos } = req.body;
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'horas',
            'value': horas
        },
        {
            'name': 'horasp',
            'value': horasp
        },
        {
            'name': 'horast',
            'value': horast
        },
        {
            'name': 'creditos',
            'value': creditos
        }
    ];

    let materia = await execute('stp_materias_add', sqlParams);

    if (materia != 0) {
        res.json({
            status: true,
            message: 'Materia agregada exitosamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al agregar el materia',
            data: 0
        });
    }
}

//Actualizar materia
const updateMateria = async(req, res) => {
    const idMateria = req.params.id;
    const { nombre, horas, horasp, horast, creditos } = req.body;
    const sqlParams = [{
            'name': 'idMateria',
            'value': idMateria
        },
        {
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'horas',
            'value': horas
        },
        {
            'name': 'horasp',
            'value': horasp
        },
        {
            'name': 'horast',
            'value': horast
        },
        {
            'name': 'creditos',
            'value': creditos
        }
    ];

    let materia = await execute('stp_materias_update', sqlParams);

    if (materia != 0) {
        res.json({
            status: true,
            message: 'Materia actualizado exitosamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al actualizar la materia',
            data: 0
        });
    }
}

//Borrar materia
const deleteMateria = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idMateria',
        'value': id
    }];

    let rowsAffected = await execute('stp_materias_delete', sqlParams);
    if (rowsAffected) {
        res.json({
            status: true,
            message: 'MAteria eliminada exitosamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al eliminar la materia',
            data: 0
        });
    }
}


module.exports = { getMaterias, getMateriasid, addMateria, updateMateria, deleteMateria };