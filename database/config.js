const conString = {
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    server: process.env.SERVER_DB,
    database: process.env.DATABASE_DB,
    options: {
        encrypt: true,
        database: process.env.DATABASE_DB
    }
};

module.exports = conString;