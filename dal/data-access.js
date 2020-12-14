const sql = require('mssql');
const conString = require('./config');

//Query Selects GetAll
const query = async(stpName, sqlParams) => {
    const pool = await sql.connect(conString);
    const req = await pool.request();
    if (typeof sqlParams !== 'undefined') {
        sqlParams.forEach((param) => {
            req.input(param.name, param.value);
        });
    }
    const resp = await req.execute(stpName);
    return resp.recordset;
}

//QuerySingle Getby regresa un objeto
const querySingle = async(stpName, sqlParams) => {
    const pool = await sql.connect(conString);
    const req = await pool.request();
    if (typeof sqlParams !== 'undefined') {
        sqlParams.forEach((param) => {
            req.input(param.name, param.value);
        });
    }
    const resp = await req.execute(stpName);
    return resp.recordset[0];
}

//Execute consultas 
const execute = async(stpName, sqlParams) => {
    const pool = await sql.connect(conString);
    const req = await pool.request();
    if (typeof sqlParams !== 'undefined') {
        sqlParams.forEach((param) => {
            req.input(param.name, param.value);
        });
    }
    const resp = await req.execute(stpName);
    return resp.rowsAffected;
}

module.exports = {
    query,
    querySingle,
    execute
}