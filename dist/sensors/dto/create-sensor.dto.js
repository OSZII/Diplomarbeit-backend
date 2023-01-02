"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSensorDto = exports.SensorType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var SensorType;
(function (SensorType) {
    SensorType[SensorType["humidity"] = 0] = "humidity";
    SensorType[SensorType["temperature"] = 1] = "temperature";
    SensorType[SensorType["light"] = 2] = "light";
    SensorType[SensorType["carbon_dioxide"] = 3] = "carbon_dioxide";
    SensorType[SensorType["soil_moisture"] = 4] = "soil_moisture";
    SensorType[SensorType["soil_ph"] = 5] = "soil_ph";
    SensorType[SensorType["wind_speed_direction"] = 6] = "wind_speed_direction";
    SensorType[SensorType["precipitation"] = 7] = "precipitation";
})(SensorType = exports.SensorType || (exports.SensorType = {}));
class CreateSensorDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateSensorDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(SensorType),
    __metadata("design:type", String)
], CreateSensorDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateSensorDto.prototype, "fieldId", void 0);
exports.CreateSensorDto = CreateSensorDto;
//# sourceMappingURL=create-sensor.dto.js.map