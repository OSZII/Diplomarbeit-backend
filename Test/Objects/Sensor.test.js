const sensor = require("../../Objects/Sensor");

describe('Get Sensor', () => { 

    test("getAll() und checkt die länge", async () => {
        let returnedSensor = await sensor.getAll();
        expect(returnedSensor.length).toBe(8);
    });

    test("getById(3) und schaut ob die ID 3 ist", async () => {
        let returnedSensor = await sensor.getById(3);
        expect(returnedSensor[0].id).toBe(3);
    });

});

describe('Post Sensor', () => { 

    test("Erstellt einen Sensor und testet ob die affectedRows = 1", async () => {
        let result = await sensor.createSensor({
            "fieldID": 3,
            "type": "Helligkeit",
            "locationOnField": "left"
        })
        expect(result.affectedRows).toBe(1);
    });

    test("Erstellt zwei Sensors und schaut in den zurückgegebenen Objekten nach, ob die affected rows in summe 2 ergeben, da 2 Sensors erstellt werden", async () => {
        let result = await sensor.createMultipleSensors({
            "sensors" : [{
                "fieldID": 3,
                "type": "Helligkeit",
                "locationOnField": "right"
            },
            {
                "fieldID": 3,
                "type": "Helligkeit",
                "locationOnField": "top middle"
            }   
        ]
    })
        expect(result[0].affectedRows + result[1].affectedRows).toBe(2);
    });

});

describe("Update Sensor", () => {

    test("Sensor 1 von Feld 1 auf Feld 3 zuwewisen", async () => {
        let returnedSensor = await sensor.getById(1);
        returnedSensor = returnedSensor[0];
        returnedSensor.id = 3;
        let result = await sensor.update(returnedSensor);
        expect(result.affectedRows).toBe(1);
    })
})

describe('Delete Field', () => {
    
    test("deleteById(4) und schaut beim rückgabewert auf affectedRows und schaut ob 1", async () => {
        // 4 weil die anderen Felder haben sensoren dran und diese müssen davor gelöscht werden
        let result = await sensor.deleteById(10);
        expect(result.affectedRows).toBe(1)
    })

});
