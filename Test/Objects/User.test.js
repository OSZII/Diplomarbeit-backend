const user = require("../../Objects/User");

describe('Get User', () => { 

    test("getAll() und checkt die länge", async () => {
        let returnedUser = await user.getAll();
        expect(returnedUser.length).toBe(105);
    });

    test("getUserById(2) und schaut ob die ID 2 ist", async () => {
        let returnedUser = await user.getById(2);
        expect(returnedUser[0].id).toBe(2);
    });

    test("getUserByName('oszi') Checkt ob er den user mit dem namen oszi findet", async () => {
        let returnedUser = await user.getByName("oszi");
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

    test("Erstellt zwei User und schaut in den zurückgegebenen Objekten nach, ob die affected rows in summe 2 ergeben, da 2 user erstellt werden", async () => {
        let result = await user.createMultipleUsers(
            [{
                "username": "TestUser3",
                "firstname": "Test3",
                "lastname": "User3",
                "email": "TestmailUser3@gmail.com",
                "password": "password",
                "role": "user",
                "authToken": "null"
            },
            {
                "username": "TestUser2",
                "firstname": "Test2",
                "lastname": "User2",
                "email": "TestmailUser2@gmail.com",
                "password": "password",
                "role": "user",
                "authToken": "null"
            }   
        ]
    )
        expect(result[0].affectedRows + result[1].affectedRows).toBe(2);
    });

});

describe("Update User", () => {

    test("Umändern des Usernames in Klausi3", async () => {
        let returnedUser = await user.getByName("klausi");
        returnedUser = returnedUser[0];
        returnedUser.username = "Klausi3";
        let result = await user.update(returnedUser);
        expect(result.affectedRows).toBe(1);
    })
})

describe('Delete User', () => {
    
    test("deleteUserById(7) und schaut beim rückgabewert auf affectedRows und schaut ob 1", async () => {
        let result = await user.deleteById(7);
        expect(result.affectedRows).toBe(1)
    })

    test("deleteByEmail('ipsum.dolor.sit@yahoo.us') schaut bei Rückgabewert ob affectedRows = 1", async () => {
        let result = await user.deleteByEmail("ipsum.dolor.sit@yahoo.us");
        expect(result.affectedRows).toBe(1)
    })

    // test("deleteAll() schaut danach ob die getAll() länge 0 ist", async () => {
    //     await user.deleteAll();
    //     let result = await user.getAll();
    //     expect(result.length).toBe(0);
    // })

});
