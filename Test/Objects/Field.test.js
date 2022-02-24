const field = require("../../Objects/Field");

describe("Get Field", () => {
  test("getAll() und checkt die länge", async () => {
    let returnedField = await field.getAll();
    expect(returnedField.length).toBe(3);
  });

  test("getById(3) und schaut ob die ID 3 ist", async () => {
    let returnedField = await field.getById(3);
    expect(returnedField[0].id).toBe(3);
  });

  test("getByName('teil') Checkt ob er den Field mit dem namen oszi findet", async () => {
    let returnedField = await field.getByName("teil");
    expect(returnedField[0].name).toBe("Landteil");
  });
});

describe("Post Field", () => {
  test("Erstellt ein Field und testet ob die affectedRows = 1", async () => {
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

  test("Erstellt zwei Fields und schaut in den zurückgegebenen Objekten nach, ob die affected rows in summe 2 ergeben, da 2 Fields erstellt werden", async () => {
    let result = await field.createMultipleFields([
      {
        name: "Obertauern 11",
        area: "50",
        unit: "square meter",
        country: "AT",
        federalState: "Tirol",
        postalCode: "6020",
        street: "Olypiastraße 9",
        latitude: -1,
        longitude: -1,
        description: "Feld im Obertauern 11",
      },
      {
        name: "Obertauern 12",
        area: "50",
        unit: "square meter",
        country: "AT",
        federalState: "Tirol",
        postalCode: "6020",
        street: "Olypiastraße 9",
        latitude: -1,
        longitude: -1,
        description: "Feld im Obertauern 12",
      },
    ]);
    expect(result[0].affectedRows + result[1].affectedRows).toBe(2);
  });
});

describe("Update Field", () => {
  test("Umändern des name des Felds mit der id 1 in TrueffelLand", async () => {
    let returnedField = await field.getById(1);
    returnedField = returnedField[0];
    returnedField.name = "Truefelland";
    let result = await field.update(returnedField);
    expect(result.affectedRows).toBe(1);
  });
});

describe("Delete Field", () => {
  test("deleteById(4) und schaut beim rückgabewert auf affectedRows und schaut ob 1", async () => {
    // 4 weil die anderen Felder haben sensoren dran und diese müssen davor gelöscht werden
    let result = await field.deleteById(4);
    expect(result.affectedRows).toBe(1);
  });
});
