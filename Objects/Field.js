// CRUD fieldjs
const validator = require("./Validator");
const pool = require("../Database/database");

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
    static async update(field){
        let conn = await pool.getConnection();
        let sql = "UPDATE fields SET name = ?, area = ?, unit = ?, country = ?, federalState = ?, postalCode = ?, street = ?, latitude = ?, longitude = ?, description = ? WHERE id = ?;";
        let result = await conn.query(sql, [field.name, field.area, field.unit, field.country, field.federalState, field.postalCode, field.street, field.latitude, field.longitude, field.description, field.id]);
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

    // static async deleteAll(){
    //     let conn = await pool.getConnection();
    //     let sql = "DELETE FROM fields WHERE id > 3";
    //     let result = await conn.query(sql);
    //     conn.end();
    //     return result;
    // }

    //#region Getter & Setter
    // getId(){
    //     return this.#id;
    // }

    // setId(id){
    //     this.#id = id;
    // }

    // getName(){
    //     return this.#name;
    // }

    // setName(name){
    //     this.#name = name;
    // }

    // getArea(){
    //     return this.#area;
    // }

    // setArea(area){
    //     this.#area = area;
    // }

    // getUnit(){
    //     return this.#unit;
    // }

    // setUnit(unit){
    //     // check if unit is one of the following: "square meter", "hectar", "square kilometer", "square feet", "square yard", "acre"
    //     if(unit == "square meter" || unit == "hectar" || unit == "square kilometer" || unit == "square feet" || unit == "square yard" || unit == "acre") this.#unit = unit;
    //     else return false;
    // }

    // getCountry(){
    //     return this.#country;
    // }

    // setCountry(country){
    //     this.#country = country;
    // }

    // getFederalState(){
    //     return this.#federalState;
    // }

    // setFederalState(federalState){
    //     this.#federalState = federalState;
    // }

    // getLatitude(){
    //     return this.#latitude;
    // }

    // setLatitude(latitude){
    //     this.#latitude = latitude;
    // }

    // getLongitude(){
    //     return this.#longitude;
    // }

    // setLongitude(longitude){
    //     this.#longitude = longitude;
    // }

    // getDescription(){
    //     return this.#description;
    // }

    // setDescription(description){
    //     this.#description = description;
    // }
    
    //#endregion
}

module.exports = Field