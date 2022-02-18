// CRUD fieldjs
const pool = require("../Database/database");

class User{

    #id;
    #username;
    #firstname;
    #lastname;
    #email;
    #password;
    #role;
    #authToken;

    // Create
    static async createUser(user){
        // TODO: authentifizieren
        // TODO: validieren
        let conn = await pool.getConnection();
        let sql = "INSERT INTO users (username, firstname, lastname, email, password, role, authToken) VALUES (?, ?, ?, ?, ?, ?, ?);";
        let result = await conn.query(sql, [user.username, user.firstname, user.lastname, user.email, user.password, user.role, user.authToken]);
        conn.release();
        return result;
    }

    static async createMultipleUsers(usersBody){
        // TODO: authentifizieren
        // TODO: validieren
        let users = usersBody.users;
        let results = [];
        for(let i = 0; i < users.length; i++){
            results.push(await this.createUser(users[i]));
        }
        return results
    }

    // Read
    static async getAll(){
        // TODO: authentifizieren
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM users;";
        // zu Field Objecten mappen mit ORM
        let results = await conn.query(sql);
        conn.end();
        return results;
    }

    static async getById(id){
        // TODO: authentifizieren
        let conn = await pool.getConnection();
        let sql = "SELECT * FROM users WHERE id = ?;";
        let result = await conn.query(sql, [id]);
        conn.end();
        return result;
    }

    static async getByName(name){
        // TODO: authentifizieren
        let conn = await pool.getConnection();
        let sql = `SELECT * FROM users WHERE username LIKE CONCAT('%', ?, '%') OR firstname LIKE CONCAT('%', ?, '%') OR lastname LIKE CONCAT('%', ?, '%');`;
        let results = await conn.query(sql, [name, name, name]);
        conn.end();
        return results;
    }
    // Update
    static async update(user){
        let conn = await pool.getConnection();
        let sql = "UPDATE users SET username = ?, firstname = ?, lastname = ?, email = ?, password = ?, role = ?, authToken = ? WHERE id = ?;";
        let result = await conn.query(sql, [user.username, user.firstname, user.lastname, user.email, user.password, user.role, user.authToken, user.id]);
        conn.end();
        return result;
    }

    // Delete
    static async deleteById(id){
        // TODO: authentifizieren
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

    static async deleteAll(){
        let conn = await pool.getConnection();
        let sql = "DELETE FROM users WHERE id;";
        let result = await conn.query(sql);
        conn.end();
        return result;
    }

    //#region Getter & Setter
    getId(){
        return this.#id;
    }

    setId(id){
        this.#id = id;
    }

    getUsername(){
        return this.#username;
    }

    setUsername(username){
        this.#username = username;
    }

    getFirstname(){
        return this.#firstname;
    }

    setFirstname(firstname){
        this.#firstname = firstname;
    }

    getLastname(){
        return this.#lastname;
    }

    setLastname(lastname){
        this.#lastname = lastname;
    }

    getEmail(){
        return this.#email;
    }

    setEmail(email){
        this.#email = email;
    }

    getPassword(){
        return this.#password;
    }

    setPassword(password){
        this.#password = password;
    }

    getRole(){
        return this.#role;
    }

    setRole(role){
        this.#role = role;
    }

    getAuthToken(){
        return this.#authToken;
    }

    setAuthToken(authToken){
        this.#authToken = authToken;
    }
    //#endregion

}

module.exports = User;