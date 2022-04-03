const pool = require("../Database/database");
const Help = require("../Helper/Helper");

class Plants{

    #id;
    #type; // fruit/vegetables/fungi
    #growtime;

    // Create
    //standard
    static async createSensor(sensor){
        // TODO: authentifizieren
        // TODO: validieren
        // Check first if fieldId exists
        let conn = await pool.getConnection();
        let sql = "INSERT INTO sensors (fieldId, type, locationOnField) VALUES (?, ?, ?);";
        let result = await conn.query(sql, [sensor.fieldID, sensor.type, sensor.locationOnField]);
        conn.end();
        return result;
    }

    //standard
    static async createMultipleSensors(sensors){
        // TODO: authentifizieren
        // TODO: validieren
        let results = [];
        for(let i = 0; i < sensors.length; i++){
            results.push(await this.createSensor(sensors[i]));
        }
        return results
    }

    // Read
    //standard
    static async getAll(){
        // TODO: authentifizieren
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM sensors;";
        let results = await conn.query(sql);
        conn.end();
        return results;
    }

    //standard
    static async getById(id){
        // TODO: authentifizieren
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM sensors WHERE id = ?;";
        let result = await conn.query(sql, [id]);
        conn.end();
        return result;
    }

    static async getByType(type){
        // TODO: authentifizieren
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM sensors WHERE type LIKE CONCAT('%', ?, '%');";
        let result = await conn.query(sql, [type]);
        conn.end();
        return result;
    }

    // Update
    static async update(sensor){
        // Check first if fieldId Exists
        let conn = await pool.getConnection();
        let sql = "UPDATE sensors SET fieldId = ?, type = ?, locationOnField = ? WHERE id = ?;";
        let result = await conn.query(sql, [sensor.fieldID, sensor.type, sensor.locationOnField, sensor.id]);
        conn.end();
        return result;
    }

    // Delete
    static async deleteById(id){
        // TODO: authentifizieren
        let conn = await pool.getConnection();
        let sql = "DELETE FROM sensors WHERE id = ?;";
        let result = await conn.query(sql, [id]);
        conn.end();
        return result;
    }

    static async deleteAll(){
        let conn = await pool.getConnection();
        let sql = "DELETE FROM sensors WHERE id > 3";
        let result = await conn.query(sql);
        conn.end();
        return result;
    }

    //#region Getter and Setter

    getId(){
        return this.#id;
    }

    setId(id){
        this.#id = id;
    }

    getFieldId(){
        return this.#fieldId;
    }

    setFieldId(fieldId){
        // Check first if FieldId exists
        this.#fieldId = fieldId;
    }

    getType(){
        return this.#type;
    }

    setType(type){
        this.#type = type;
    }

    getLocationOnField(){
        return this.#locationOnField;
    }

    setLocationOnField(locationOnField){
        this.#locationOnField = locationOnField;
    }

    //#endregion

}

module.exports = Sensor;
