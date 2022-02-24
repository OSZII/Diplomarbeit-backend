const sensorValue = require("../../Objects/SensorValue");

describe('Get SensorValue', () => { 

    test("getAll() und checkt die länge", async () => {
        let returnedSensorValue = await sensorValue.getAll();
        expect(returnedSensorValue.length).toBe(8);
    });

    test("getById(3) und schaut ob die ID 3 ist", async () => {
        let returnedSensorValue = await sensorValue.getById(3);
        expect(returnedSensorValue[0].id).toBe(3);
    });

});

describe('Post SensorValue', () => { 

    test("Erstellt einen SensorValue und testet ob die affectedRows = 1", async () => {
        let result = await sensorValue.createSensorValue({
            "sensorId": 1,
            "value": "19,3",
            "timestamp": "2022-02-17 17:08:00"
        })
        expect(result.affectedRows).toBe(1);
    });

    test("Erstellt zwei SensorsValue und schaut in den zurückgegebenen Objekten nach, ob die affected rows in summe 2 ergeben, da 2 SensorValues erstellt werden", async () => {
        let result = await sensorValue.createMultipleSensorValues(
            [{
                "sensorId": 1,
                "value": "19,5",
                "timestamp": "2022-02-17 17:16:00"
            },
            {
                "sensorId": 1,
                "value": "19,7",
                "timestamp": "2022-02-17 17:23:00"
            }   
        ]
    )
        expect(result[0].affectedRows + result[1].affectedRows).toBe(2);
    });

});

describe("Update SensorValue", () => {

    test("SensorValue wert ändern", async () => {
        let returnedSensorValue = await sensorValue.getById(1);
        returnedSensorValue = returnedSensorValue[0];
        returnedSensorValue.value = 15;
        let result = await sensorValue.update(returnedSensorValue);
        expect(result.affectedRows).toBe(1);
    })
})

describe('Delete SensorValue', () => {
    
    test("deleteById(4) und schaut beim rückgabewert auf affectedRows und schaut ob 1", async () => {
        let result = await sensorValue.deleteById(10);
        expect(result.affectedRows).toBe(1)
    })

    test("deleteAll()", async () => {
        await sensorValue.deleteAll();
        let result = await sensorValue.getAll();
        expect(result.length).toBe(0);
    })

});
