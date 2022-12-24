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
const zod_1 = require("zod");
const SensorZodObject = zod_1.z.object({
    type: zod_1.z.string(),
    fieldId: zod_1.z.string().length(36),
});
let SensorsController = class SensorsController {
    constructor(sensorsService) {
        this.sensorsService = sensorsService;
    }
    async create(createSensorDto) {
        let validation = zod_1.z.string().length(36).safeParse(createSensorDto.fieldId);
        if (validation.success == false) {
            throw new common_1.HttpException({
                response: validation.error.issues,
                statusCode: common_1.HttpStatus.NOT_ACCEPTABLE,
            }, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        let messages = [];
        let validation2 = SensorZodObject.safeParse(createSensorDto);
        if (validation2.success == false) {
            let issues = validation2.error.issues;
            for (let i = 0; i < issues.length; i++) {
                messages.push('' +
                    issues[i].message +
                    ' Error on property:' +
                    issues[i].path[0] +
                    '');
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.NOT_ACCEPTABLE, response: messages }, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        let field = await this.sensorsService.findFieldById(createSensorDto.fieldId);
        if (!field)
            throw new common_1.HttpException('Sensor not found', common_1.HttpStatus.NOT_FOUND);
        return this.sensorsService.create(createSensorDto);
    }
    findAll() {
        return this.sensorsService.findAll();
    }
    async findOne(id) {
        let validation = zod_1.z.string().length(36).safeParse(id);
        if (validation.success == false) {
            throw new common_1.HttpException({
                response: validation.error.issues,
                statusCode: common_1.HttpStatus.NOT_ACCEPTABLE,
            }, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        const sensor = await this.sensorsService.findOne(id);
        if (!sensor) {
            throw new common_1.NotFoundException(`Sensor with ${id} does not exist.`);
        }
        return sensor;
    }
    update(id, updateSensorDto) {
        let validation = zod_1.z.string().length(36).safeParse(id);
        if (validation.success == false) {
            throw new common_1.HttpException({
                response: validation.error.issues,
                statusCode: common_1.HttpStatus.NOT_ACCEPTABLE,
            }, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        return this.sensorsService.update(id, updateSensorDto);
    }
    remove(id) {
        let validation = zod_1.z.string().length(36).safeParse(id);
        if (validation.success == false) {
            throw new common_1.HttpException({
                response: validation.error.issues,
                statusCode: common_1.HttpStatus.NOT_ACCEPTABLE,
            }, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        return this.sensorsService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({ type: sensor_entity_1.SensorEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sensor_dto_1.CreateSensorDto]),
    __metadata("design:returntype", Promise)
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
    __metadata("design:returntype", Promise)
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