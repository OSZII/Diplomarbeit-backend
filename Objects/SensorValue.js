const pool = require("../Database/database");
const Help = require("../Helper/Helper");

class SensorValue {
  #id;
  #sensorId;
  #value;
  #timestamp;

    // Create
    static async createSensorValue(sensorValue){
        let conn = await pool.getConnection();
        let sql = "INSERT INTO sensorValues (sensorId, value, timestamp) VALUES (?, ?, ?);";
        let result = await conn.query(sql, [sensorValue.sensorId, sensorValue.value, sensorValue.timestamp]);
        conn.end();
        return result;
    }

    static async createMultipleSensorValues(sensorValues){
        let results = [];
        for(let i = 0; i < sensorValues.length; i++){
            results.push(await this.createSensorValue(sensorValues[i]));
        }
        return results
    }

    // Read
    static async getAll(){
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM sensorValues;";
        let results = await conn.query(sql);
        conn.end();
        return results;
    }

    static async getById(id){
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM sensorValues WHERE id = ?;";
        let result = await conn.query(sql, [id]);
        conn.end();
        return result;
    }

    static async getByTimeStampRange(startTimeStamp, endTimeStamp){
        let conn = await pool.getConnection();
        let sql = `SELECT * FROM sensorValues WHERE timestamp >= ? and timestamp <= ?;`;
        let results = await conn.query(sql, [startTimeStamp, endTimeStamp]);
        conn.end();
        return results;
    }

    static async getAllByField(){
        let conn = await pool.getConnection();
        let sql = "SELECT f.id as 'fieldId', s.id as 'sensorId', sv.value, sv.timestamp FROM fields f LEFT JOIN sensors s ON(f.id = s.fieldId) LEFT JOIN sensorValues sv ON (s.id = sv.sensorId)";
        let results = await conn.query(sql);
        conn.end();
        return results;
    }

    // Update
    static async update(sensorValue, id){
        let conn = await pool.getConnection();
        let sql = "UPDATE sensorValues SET sensorId = ?, value = ?, timestamp = ? WHERE id = ?;";
        let result = await conn.query(sql, [sensorValue.sensorId, sensorValue.value, sensorValue.timestamp, id]);
        conn.end();
        return result;
    }

    // Delete
    static async deleteById(id){
        let conn = await pool.getConnection();
        let sql = "DELETE FROM sensorValues WHERE id = ?;";
        let result = await conn.query(sql, [id])
        conn.end();
        return result;
    }

    static async deleteBySensorId(sensorId){
        let conn = await pool.getConnection();
        let sql = "DELETE FROM sensorValues WHERE sensorId = ?;";
        let result = await conn.query(sql, [sensorId]);
        conn.end();
        return result;
    }

    static async deleteAll(){
        let conn = await pool.getConnection();
        let sql = "DELETE FROM sensorValues WHERE id;";
        let result = await conn.query(sql);
        conn.end();
        return result;
    }

}

module.exports = SensorValue;