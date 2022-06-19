// CRUD fieldjs
const pool = require("../Database/database");

class User{

    static async createUser(user){
        let conn = await pool.getConnection();
        let sql = "INSERT INTO users (username, firstname, lastname, email, password, role, authToken) VALUES (?, ?, ?, ?, ?, ?, ?);";
        let result = await conn.query(sql, [user.username, user.firstname, user.lastname, user.email, user.password, user.role, user.authToken]);
        conn.release();
        return result;
    }

    static async getAll(){
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM users;";
        let results = await conn.query(sql);
        conn.end();
        return results;
    }

    static async getById(id){
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM users WHERE id = ?;";
        let result = await conn.query(sql, [id]);
        conn.end();
        return result;
    }

    static async getByName(name){
        let conn = await pool.getConnection();
        let sql = `SELECT * FROM users WHERE username LIKE CONCAT('%', ?, '%') OR firstname LIKE CONCAT('%', ?, '%') OR lastname LIKE CONCAT('%', ?, '%')`;
        let results = await conn.query(sql, [name, name, name]);
        conn.end();
        return results;
    }

    static async getByUsername(username){
        let conn = await pool.getConnection();
        let sql = `SELECT * FROM users WHERE username LIKE CONCAT('%', ?, '%')`;
        let results = await conn.query(sql, [username]);
        conn.end();
        return results;
    }

    static async getByEmail(email){
        let conn = await pool.getConnection();
        let sql = `SELECT * FROM users WHERE email Like CONCAT('%', ?, '%')`;
        let results = await conn.query(sql, [email]);
        conn.end();
        return results;
    }

    static async update(user){
        let conn = await pool.getConnection();
        let sql = "UPDATE users SET username = ?, firstname = ?, lastname = ?, email = ?, password = ?, role = ?, authToken = ? WHERE id = ?;";
        let result = await conn.query(sql, [user.username, user.firstname, user.lastname, user.email, user.password, user.role, user.authToken, user.id]);
        conn.end();
        return result;
    }

    static async deleteById(id){
        let conn = await pool.getConnection();
        let sql = "DELETE FROM users WHERE id = ?;";
        let result = await conn.query(sql, [id])
        conn.end();
        return result;
    }

    static async deleteByEmail(email){
        let conn = await pool.getConnection();
        let sql = "DELETE FROM users WHERE email = ?;";
        let result = await conn.query(sql, [email]);
        conn.end();
        return result;
    }

}

module.exports = User;