const pool = require("../Database/database");

class SensorValue {
  #id;
  #sensorId;
  #value;
  #timestamp;

    // Create
    static async createSensorValue(sensorValue){
        // TODO: authentifizieren
        // TODO: validieren
        let conn = await pool.getConnection();
        let sql = "INSERT INTO sensorValues (sensorId, value, timestamp) VALUES (?, ?, ?);";
        let result = await conn.query(sql, [sensorValue.sensorId, sensorValue.value, sensorValue.timestamp]);
        conn.end();
        return result;
    }

    static async createMultipleSensorValues(sensorValuesBody){
        // TODO: authentifizieren
        // TODO: validieren
        let sensorValues = sensorValuesBody.sensorValues;
        let results = [];
        for(let i = 0; i < sensorValues.length; i++){
            results.push(await this.createSensorValue(sensorValues[i]));
        }
        return results
    }

    // Read
    static async getAll(){
        // TODO: authentifizieren
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM sensorValues;";
        let results = await conn.query(sql);
        conn.end();
        return results;
    }

    static async getById(id){
        // TODO: authentifizieren
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM sensorValues WHERE id = ?;";
        let result = await conn.query(sql, [id]);
        conn.end();
        return result;
    }

    static async getByTimeStampRange(startTimeStamp, endTimeStamp){
        // TODO: authentifizieren
        let conn = await pool.getConnection();
        let sql = `SELECT * FROM sensorValues WHERE timestamp >= ? and timestamp <= ?;`;
        let results = await conn.query(sql, [startTimeStamp, endTimeStamp]);
        conn.end();
        return results;
    }

    // Update
    static async update(sensorValue){
        // TODO: authentifizieren
        // validate if fields are set correct
        let conn = await pool.getConnection();
        let sql = "UPDATE sensorValues SET sensorId = ?, value = ?, timestamp = ? WHERE id = ?;";
        let result = await conn.query(sql, [sensorValue.sensorId, sensorValue.value, sensorValue.timestamp, sensorValue.id]);
        conn.end();
        return result;
    }

    // Delete
    static async deleteById(id){
        // TODO: authentifizieren
        let conn = await pool.getConnection();
        let sql = "DELETE FROM sensorValues WHERE id = ?;";
        let result = await conn.query(sql, [id])
        conn.end();
        return result;
    }

    static async deleteBySensorId(sensorId){
        // TODO: authentifizieren
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