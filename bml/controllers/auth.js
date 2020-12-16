const { querySingle } = require('../../dal/data-access');
const { response } = require('../../routes/auth');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    let usuario = null;
    const sqlParams = [{
        'name': 'email',
        'value': email
    }];

    usuario = await querySingle('stp_usuarios_login', sqlParams);
    if (!usuario) {
        res.json({
            status: false,
            message: 'Email no encontrado',
            data: null
        });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
        res.json({
            status: false,
            message: 'Contraseña incorrecta',
            data: null
        });
    }

    const token = await generateJWT(usuario.id);

    res.json({
        status: true,
        message: 'Acceso correcto',
        data: token
    });
}

const googleSignIn = async(req, res = response) => {
    const googleToken = req.body.token;
    let usuario = null;
    let sqlParams = null;

    try {
        const { name, email, picture } = await googleVerify(googleToken);
        sqlParams = [{
            'name': 'email',
            'value': email
        }];
        usuario = await querySingle('stp_usuarios_login', sqlParams);
        //verificasr si existe en BD

        if (!usuario) {
            //crear usuario
            sqlParams = [{
                    'name': 'nombre',
                    'value': name
                },
                {
                    'name': 'email',
                    'value': email
                },
                {
                    'name': 'password',
                    'value': ''
                },
                {
                    'name': 'imagen',
                    'value': picture
                },
                {
                    'name': 'local',
                    'value': 0
                },
                {
                    'name': 'google',
                    'value': 1
                }
            ];

            usuario = await querySingle('stp_usuarios_add', sqlParams);
        } else {
            //actualizar usuario
            sqlParams = [{
                    'name': 'idUsuario',
                    'value': usuario.idUsuario
                },
                {
                    'name': 'nombre',
                    'value': usuario.nombre,

                },
                {
                    'name': 'email',
                    'value': usuario.email
                },
                {
                    'name': 'password',
                    'value': usuario.password
                },
                {
                    'name': 'imagen',
                    'value': usuario.imagen
                },
            ];
            usuario = await querySingle('stp_usuarios_update', sqlParams);
        }
        const token = await generateJWT(usuario.idUsuario);
        console.log(token);
        console.log(usuario);

        res.json({
            status: true,
            message: 'Acceso por google correcto',
            data: token
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'Acceso por google incorrecto',
            data: err
        });
    }
}

const loginToken = async(req, res = response) => {
    const { email, token } = req.body;
    const sqlParams = [{
        'name': 'email',
        'value': email
    }, ];
    const usuario = await querySingle('stp_usuarios_login', sqlParams);
    if (usuario) {
        const token2 = await generateJWT(usuario.idUsuario);
        res.json({
            status: true,
            message: 'Acceso correcto',
            data: token2,
        });
    } else {
        res.json({
            status: false,
            message: 'error',
            data: null,
        });
    }

}

const restablecerPassword = async(req, res) => {
    const { email, Newpassword } = req.body;
    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(Newpassword, salt);
    const sqlParams = [{
        'name': 'email',
        'value': email
    }];
    let usuarios = await querySingle('stp_usuario_reset', sqlParams);
    if (usuarios) {
        //actualizar password
        const sqlParams2 = [{
                'name': 'idUsuario',
                'value': usuarios.idUsuario,
            },
            {
                'name': 'nombre',
                'value': usuarios.nombre,

            },
            {
                'name': 'email',
                'value': usuarios.email,
            },
            {
                'name': 'password',
                'value': newPassword,
            },
            {
                'name': 'imagen',
                'value': usuarios.imagen,
            },
        ];
        usuarios = await querySingle('stp_usuarios_update', sqlParams2);

        res.json({
            status: true,
            message: 'Password restablecido',
            data: usuarios
        });
    } else {
        res.json({
            status: false,
            message: 'No se encontro el email',
            data: null
        });
    }
}


module.exports = { login, googleSignIn, loginToken, restablecerPassword };