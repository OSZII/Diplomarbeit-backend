const user = require("../../Objects/User");

describe('Get User', () => { 
    test("getAll() und checkt die länge", async () => {
        let returnedUser = await user.getAll();
        expect(returnedUser.length > 1 && returnedUser[0].hasOwnProperty("username")).toBeTruthy();
    });
    test("getUserById(2) und schaut ob die ID 2 ist", async () => {
        let returnedUser = await user.getById(2);
        expect(returnedUser[0].id).toBe(2);
    });
    test("getUserByName('oszi') Checkt ob er den user mit dem namen oszi findet", async () => {
        let returnedUser = await user.getByUsername("oszi");
        expect(returnedUser[0].username).toBe("oszi");
    })
    test("getUserByEmail('klausi@gmail.com') Checkt ob er den user mit der email klausi@gmail.com findet", async () => {
        let returnedUser = await user.getByEmail("klausi@gmail.com");
        expect(returnedUser[0].id).toBe(3);
    })
});

describe('Post User', () => { 
    test("Erstellt einen User und testet ob die ", async () => {
        let result = await user.createUser({
            "username": "TestUser",
            "firstname": "Test",
            "lastname": "User",
            "email": "TestmailUser@gmail.com",
            "password": "password",
            "role": "user",
            "authToken": "null"
        })
        expect(result.affectedRows).toBe(1);
    });
});

describe("Update User", () => {
    test("Umändern des Usernames in Klausi3", async () => {
        let returnedUser = await user.getByName("klausi");
        returnedUser = returnedUser[0];
        returnedUser.username = "Klausi3";
        let result = await user.update(returnedUser, returnedUser.id);
        expect(result.affectedRows).toBe(1);
    })
})

describe('Delete User', () => {
    test("deleteUserById(7) und schaut beim rückgabewert auf affectedRows und schaut ob 1", async () => {
        let resultCreated = await user.createUser({
            "username": "TestUser1234",
            "firstname": "Test",
            "lastname": "User",
            "email": "TestmailUser1234@gmail.com",
            "password": "password",
            "role": "user",
            "authToken": "null"
        })
        let result = await user.deleteById(resultCreated.insertId);
        expect(result.affectedRows).toBe(1)
    })
});
