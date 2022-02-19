Passwörter die an die API geschickt werden vorher mit react-bcrypt verschlüsselt. Also vor dem verschicken mit Post gehashed

TODO:
    Fehlermeldungen fixen,
    bei res.send das ganze Objekt zurückgeben concat req.body + imported oder so
    überall das object zurückgeben
    update implementieren

    DELETEALL IMPLEMENTIERUNG
        - Beim Löschen vom Feld sollen die Sensoren auf FieldId 0 gestellt werden sozusagen das Lager
        - Dort kann man die Sensoren dann löschen.
        - Wenn man einen Sensor löscht, dann sollen die SensorValues (davor soll abgefragt werden ob die sensorValues exportiert in z.B. .sql oder .csv werden) gelöscht werden
        - User-Klasse implementieren

Bei Eingabe vom Land überprüfen ob Länge = 2 ISO-2 Standard oder so

Validierung bei den Routes nicht bei den Objects
Bei users vermeiden von unique error, wenn jemand die gleiche EMAIL 2 mal schickt
