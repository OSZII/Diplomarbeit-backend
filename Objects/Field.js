const pool = require("../Database/database");

class Field{

    static async createField(field){
        let conn = await pool.getConnection();
        let sql = "INSERT INTO fields (name, area, unit, country, federalState, postalCode, street, latitude, longitude, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        let result = await conn.query(sql, [field.name, field.area, field.unit, field.country, field.federalState, field.postalCode, field.street, field.latitude, field.longitude, field.description]);
        conn.end();
        return result;
    }

    static async getAll(){
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM fields;";
        let results = await conn.query(sql);
        conn.end();
        return results;
    }

    static async getById(id){
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM fields WHERE id = ?;";
        let result = await conn.query(sql, [id]);
        conn.end();
        return result;
    }

    static async getByName(name){
        let conn = await pool.getConnection();
        let sql = `SELECT * FROM fields WHERE name LIKE CONCAT('%', ?, '%');`;
        let results = await conn.query(sql, [name]);
        conn.end();
        return results;
    }

    static async update(field, id){
        let conn = await pool.getConnection();
        let sql = "UPDATE fields SET name = ?, area = ?, unit = ?, country = ?, federalState = ?, postalCode = ?, street = ?, latitude = ?, longitude = ?, description = ? WHERE id = ?;";
        let result = await conn.query(sql, [field.name, field.area, field.unit, field.country, field.federalState, field.postalCode, field.street, field.latitude, field.longitude, field.description, id]);
        conn.end();
        return result;
    }

    static async deleteById(id){
        let conn = await pool.getConnection();
        let sql = "DELETE FROM fields WHERE id = ?;";
        let result = await conn.query(sql, [id]);
        conn.end();
        return result;
    }
}

module.exports = Field