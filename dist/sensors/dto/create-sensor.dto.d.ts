export declare enum SensorType {
    'humidity' = 0,
    'temperature' = 1,
    'light' = 2,
    'carbon_dioxide' = 3,
    'soil_moisture' = 4,
    'soil_ph' = 5,
    'wind_speed_direction' = 6,
    'precipitation' = 7
}
export declare class CreateSensorDto {
    id: string;
    type: string;
    fieldId: string;
}
