const field = require("../../Objects/Field");

describe("Get Field", () => {
    test("getAll() und checkt die länge", async() => {
        let condition = false;
        let returnedField = await field.getAll();
        if (returnedField.length > 1 && returnedField[0].hasOwnProperty("name")) condition = true;
        else condition = false;
        expect(condition).toBe(true);
    });

    test("getById(3) und schaut ob die ID 3 ist", async() => {
        let returnedField = await field.getById(3);
        expect(returnedField[0].id).toBe(3);
    });

    test("getByName('Feld 1') Checkt ob ein Feld mit dem Namen Feld 1 gefunden wird", async() => {
        let searchString = "Feld 1";
        let returnedField = await field.getByName(searchString);
        expect(returnedField[0].name.includes(searchString)).toBeTruthy();
    });
});

describe("Post Field", () => {
    test("Erstellt ein Field und testet ob die affectedRows = 1", async() => {
        let result = await field.createField({
            name: "Obertauern 10",
            area: "50",
            unit: "square meter",
            country: "AT",
            federalState: "Tirol",
            postalCode: "6020",
            street: "Olypiastraße 9",
            latitude: -1,
            longitude: -1,
            description: "Feld im Obertauern 10",
        });
        expect(result.affectedRows).toBe(1);
    });
});

describe("Update Field", () => {
    test("Umändern des name des Felds mit der id 1 in TrueffelLand", async() => {
        let returnedField = await field.getById(1);
        returnedField = returnedField[0];
        returnedField.name = "Truefelland";
        let result = await field.update(returnedField);
        expect(result.affectedRows).toBe(1);
    });
});

describe("Delete Field", () => {
    test("deleteById(4) und schaut beim rückgabewert auf affectedRows und schaut ob 1", async() => {
        let result = await field.deleteById(4);
        expect(result.affectedRows).toBe(1);
    });
});