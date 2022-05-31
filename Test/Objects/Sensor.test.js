const sensor = require("../../Objects/Sensor");

describe('Get Sensor', () => { 
    test("getAll() und checkt die länge", async () => {
        let returnedSensor = await sensor.getAll();
        expect(returnedSensor.length > 1 && returnedSensor[0].hasOwnProperty("fieldId")).toBeTruthy();
    });
    test("getById(3) und schaut ob die ID 3 ist", async () => {
        let returnedSensor = await sensor.getById(3);
        expect(returnedSensor[0].id).toBe(3);
    });
});

describe('Post Sensor', () => { 
    test("Erstellt einen Sensor und testet ob die affectedRows = 1", async () => {
        let result = await sensor.createSensor({
            "fieldId": 3,
            "type": "Helligkeit",
            "locationOnField": "left"
        })
        expect(result.affectedRows).toBe(1);
    });
});

describe("Update Sensor", () => {
    test("Sensor 1 von Feld 1 auf Feld 3 zuwewisen", async () => {
        let returnedSensor = await sensor.getById(1);
        returnedSensor = returnedSensor[0];
        returnedSensor.fieldId = 3;
        let result = await sensor.update(returnedSensor, 1);
        expect(result.affectedRows).toBe(1);
    })
})

describe('Delete Sensor', () => {
    test("deleteById(4) und schaut beim rückgabewert auf affectedRows und schaut ob 1", async () => {
        // 4 weil die anderen Felder haben sensoren dran und diese müssen davor gelöscht werden
        let result = await sensor.deleteById(4);
        expect(result.affectedRows).toBe(1)
    })
});
