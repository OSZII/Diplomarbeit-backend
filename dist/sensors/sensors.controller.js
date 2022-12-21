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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorsController = void 0;
const common_1 = require("@nestjs/common");
const sensors_service_1 = require("./sensors.service");
const create_sensor_dto_1 = require("./dto/create-sensor.dto");
const update_sensor_dto_1 = require("./dto/update-sensor.dto");
const swagger_1 = require("@nestjs/swagger");
const sensor_entity_1 = require("./entities/sensor.entity");
let SensorsController = class SensorsController {
    constructor(sensorsService) {
        this.sensorsService = sensorsService;
    }
    create(createSensorDto) {
        return this.sensorsService.create(createSensorDto);
    }
    findAll() {
        return this.sensorsService.findAll();
    }
    findOne(id) {
        return this.sensorsService.findOne(id);
    }
    update(id, updateSensorDto) {
        return this.sensorsService.update(id, updateSensorDto);
    }
    remove(id) {
        return this.sensorsService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({ type: sensor_entity_1.SensorEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sensor_dto_1.CreateSensorDto]),
    __metadata("design:returntype", void 0)
], SensorsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: sensor_entity_1.SensorEntity, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SensorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: sensor_entity_1.SensorEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SensorsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiCreatedResponse)({ type: sensor_entity_1.SensorEntity }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sensor_dto_1.UpdateSensorDto]),
    __metadata("design:returntype", void 0)
], SensorsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: sensor_entity_1.SensorEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SensorsController.prototype, "remove", null);
SensorsController = __decorate([
    (0, common_1.Controller)('sensors'),
    (0, swagger_1.ApiTags)('sensors'),
    __metadata("design:paramtypes", [sensors_service_1.SensorsService])
], SensorsController);
exports.SensorsController = SensorsController;
//# sourceMappingURL=sensors.controller.js.map