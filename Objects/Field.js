// CRUD fieldjs
const validator = require("./Validator");
const pool = require("../Database/database");
const Help = require("../Helper/Helper");

class Field{

    // Create
    static async createField(field){
        let conn = await pool.getConnection();
        let sql = "INSERT INTO fields (name, area, unit, country, federalState, postalCode, street, latitude, longitude, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        let result = await conn.query(sql, [field.name, field.area, field.unit, field.country, field.federalState, field.postalCode, field.street, field.latitude, field.longitude, field.description]);
        conn.end();
        return result;
    }

    static async createMultipleFields(fields){
        let results = [];
        for(let i = 0; i < fields.length; i++){
            results.push(await this.createField(fields[i]));
        }
        return results
    }

    // Read
    static async getAll(){
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM fields;";
        // zu Field Objecten mappen mit ORM
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
        // "%?%" macht hier schwierigkeiten deshalb muss man des mit mysql CONCAT manuell
        // machen
        let sql = `SELECT * FROM fields WHERE name LIKE CONCAT('%', ?, '%');`;
        let results = await conn.query(sql, [name]);
        conn.end();
        return results;
    }
    // Update
    static async update(field, id){
        let conn = await pool.getConnection();
        let sql = "UPDATE fields SET name = ?, area = ?, unit = ?, country = ?, federalState = ?, postalCode = ?, street = ?, latitude = ?, longitude = ?, description = ? WHERE id = ?;";
        let result = await conn.query(sql, [field.name, field.area, field.unit, field.country, field.federalState, field.postalCode, field.street, field.latitude, field.longitude, field.description, id]);
        conn.end();
        return result;
    }

    // Delete
    static async deleteById(id){
        let conn = await pool.getConnection();
        let sql = "DELETE FROM fields WHERE id = ?;";
        let result = await conn.query(sql, [id]);
        conn.end();
        return result;
    }

}

module.exports = Field