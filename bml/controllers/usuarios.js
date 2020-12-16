const { query, querySingle, execute } = require('../../dal/data-access');
const bcrypt = require('bcryptjs');


//Obtener usuarios
const getUsuarios = async(req, res) => {
    let usuarios = await query('stp_usuarios_getall');
    if (usuarios) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: usuarios
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
const getUsuariosid = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idUsuario',
        'value': id
    }];
    let usuarios = await query('stp_usuarios_getbyid', sqlParams);
    if (usuarios) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: usuarios
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al consultar los usuarios',
            data: null
        });
    }

}

//Agregar usuarios

const addUsuario = async(req, res) => {
    const { nombre, email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(password, salt);
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'email',
            'value': email
        },
        {
            'name': 'password',
            'value': newPassword
        },
        {
            'name': 'imagen',
            'value': null
        },
        {
            'name': 'local',
            'value': 1
        },
        {
            'name': 'google',
            'value': 0
        }
    ];

    rowsAffected = await querySingle('stp_usuarios_add', sqlParams);
    console.log(rowsAffected);
    if (rowsAffected) {
        res.json({
            status: true,
            message: 'Usuario agregado exitosamente',
            data: rowsAffected
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al agregar el Usuario',
            data: 0
        });
    }
}

//Actualizar usuario
const updateUsuario = async(req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;
    const sqlParams = [{
            'name': 'idUsuario',
            'value': id
        },
        {
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'email',
            'value': email
        },
        {
            'name': 'password',
            'value': password
        },
        {
            'name': 'imagen',
            'value': ""
        },
    ];

    let rowsAffected = await execute('stp_usuarios_update', sqlParams);

    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Usuario actualizado exitosamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al actualizar el usuario',
            data: 0
        });
    }
}

//Borrar alumno
const deleteUsuario = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idUsuario',
        'value': id
    }];

    let rowsAffected = await execute('stp_usuarios_delete', sqlParams);
    if (rowsAffected) {
        res.json({
            status: true,
            message: 'Usuario eliminado exitosamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al eliminar el usuario',
            data: 0
        });
    }
}

//reset usuario
const cambiarPassword = async(req, res) => {
    const { email, password } = req.body;
    const sqlParam = [{
        'name': 'email',
        'value': email
    }]
    let usuario = await querySingle('stp_usuarios_login', sqlParam)
    if (usuario) {
        const salt = bcrypt.genSaltSync();
        const newPassword = bcrypt.hashSync(password, salt);
        const sqlParams = [{
                'name': 'email',
                'value': email
            },
            {
                'name': 'password',
                'value': newPassword
            }
        ]

        let rowsAffected = await execute('stp_usuarios_reset', sqlParams);
        if (rowsAffected != 0) {
            res.json({
                status: true,
                message: 'Password updated successfully',
                data: 1
            });
        } else {
            res.json({
                status: false,
                message: 'An error occurred while updating the password',
                data: 0
            });
        }
    } else {
        res.json({
            status: false,
            message: 'There is no user with that email',
            data: null
        })
    }

}





module.exports = { getUsuarios, getUsuariosid, addUsuario, updateUsuario, deleteUsuario, cambiarPassword };