const sensorValue = require("../../Objects/SensorValue");

describe('Get SensorValue', () => { 

    test("getAll() und checkt die länge", async () => {
        let returnedSensorValue = await sensorValue.getAll();
        expect(returnedSensorValue.length > 1 && returnedSensorValue[0].hasOwnProperty("timestamp")).toBeTruthy();
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

});

describe("Update SensorValue", () => {

    test("SensorValue wert ändern", async () => {
        let returnedSensorValue = await sensorValue.getById(1);
        returnedSensorValue = returnedSensorValue[0];
        returnedSensorValue.value = 15;
        let result = await sensorValue.update(returnedSensorValue, 1);
        expect(result.affectedRows).toBe(1);
    })
})

describe('Delete SensorValue', () => {
    
    test("deleteById(4) und schaut beim rückgabewert auf affectedRows und schaut ob 1", async () => {
        let resultFromCreated = await sensorValue.createSensorValue({
            "sensorId": 1,
            "value": "19,3",
            "timestamp": "2022-02-17 17:08:00"
        })
        let result = await sensorValue.deleteById(resultFromCreated.insertId);
        expect(result.affectedRows).toBe(1)
    })

    // test("deleteAll()", async () => {
    //     await sensorValue.deleteAll();
    //     let result = await sensorValue.getAll();
    //     expect(result.length).toBe(0);
    // })

});
