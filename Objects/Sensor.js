const pool = require("../Database/database");

class Sensor{
    static async createSensor(sensor){
        let conn = await pool.getConnection();
        let sql = "INSERT INTO sensors (fieldId, type, locationOnField) VALUES (?, ?, ?);";
        let result = await conn.query(sql, [sensor.fieldId, sensor.type, sensor.locationOnField]);
        conn.end();
        return result;
    }

    static async getAll(){
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM sensors;";
        let results = await conn.query(sql);
        conn.end();
        return results;
    }

    static async getById(id){
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM sensors WHERE id = ?;";
        let result = await conn.query(sql, [id]);
        conn.end();
        return result;
    }

    static async getByFieldId(fieldId){
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM sensors WHERE fieldId = ?;";
        let result = await conn.query(sql, [fieldId]);
        conn.end();
        return result;
    }

    static async getByType(type){
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM sensors WHERE type LIKE CONCAT('%', ?, '%');";
        let result = await conn.query(sql, [type]);
        conn.end();
        return result;
    }

    static async update(sensor){
        let conn = await pool.getConnection();
        let sql = "UPDATE sensors SET fieldId = ?, type = ?, locationOnField = ? WHERE id = ?;";
        let result = await conn.query(sql, [sensor.fieldId, sensor.type, sensor.locationOnField, sensor.id]);
        conn.end();
        return result;
    }

    static async deleteById(id){
        let conn = await pool.getConnection();
        let sql = "DELETE FROM sensors WHERE id = ?;";
        let result = await conn.query(sql, [id]);
        conn.end();
        return result;
    }
}

module.exports = Sensor;
