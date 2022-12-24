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
exports.SensorvaluesController = void 0;
const common_1 = require("@nestjs/common");
const sensorvalues_service_1 = require("./sensorvalues.service");
const create_sensorvalue_dto_1 = require("./dto/create-sensorvalue.dto");
const update_sensorvalue_dto_1 = require("./dto/update-sensorvalue.dto");
const swagger_1 = require("@nestjs/swagger");
const sensorvalue_entity_1 = require("./entities/sensorvalue.entity");
const zod_1 = require("zod");
const SensorValueZodObject = zod_1.z.object({
    value: zod_1.z.string(),
    timeStamp: zod_1.z.string(),
    sensorId: zod_1.z.string().length(36),
});
let SensorvaluesController = class SensorvaluesController {
    constructor(sensorvaluesService) {
        this.sensorvaluesService = sensorvaluesService;
    }
    async create(createSensorvalueDto) {
        let validation = zod_1.z
            .string()
            .length(36)
            .safeParse(createSensorvalueDto.sensorId);
        if (validation.success == false) {
            throw new common_1.HttpException({
                response: validation.error.issues,
                statusCode: common_1.HttpStatus.NOT_ACCEPTABLE,
            }, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        let messages = [];
        let validation2 = SensorValueZodObject.safeParse(createSensorvalueDto);
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
        let user = await this.sensorvaluesService.findSensorById(createSensorvalueDto.sensorId);
        if (!user)
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        return this.sensorvaluesService.create(createSensorvalueDto);
    }
    findAll() {
        return this.sensorvaluesService.findAll();
    }
    async findOne(id) {
        let validation = zod_1.z.string().length(36).safeParse(id);
        if (validation.success == false) {
            throw new common_1.HttpException({
                response: validation.error.issues,
                statusCode: common_1.HttpStatus.NOT_ACCEPTABLE,
            }, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        const sensorvalue = await this.sensorvaluesService.findOne(id);
        if (!sensorvalue) {
            throw new common_1.NotFoundException(`Sensorvalue with ${id} does not exist.`);
        }
        return sensorvalue;
    }
    update(id, updateSensorvalueDto) {
        let validation = zod_1.z.string().length(36).safeParse(id);
        if (validation.success == false) {
            throw new common_1.HttpException({
                response: validation.error.issues,
                statusCode: common_1.HttpStatus.NOT_ACCEPTABLE,
            }, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        return this.sensorvaluesService.update(id, updateSensorvalueDto);
    }
    async remove(id) {
        let sensorValue = await this.sensorvaluesService.findOne(id);
        if (!sensorValue) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: 'SensorValue with id: ' + id + ' not found!',
            });
        }
        return this.sensorvaluesService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({ type: sensorvalue_entity_1.SensorvalueEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sensorvalue_dto_1.CreateSensorvalueDto]),
    __metadata("design:returntype", Promise)
], SensorvaluesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: sensorvalue_entity_1.SensorvalueEntity, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SensorvaluesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: sensorvalue_entity_1.SensorvalueEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SensorvaluesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiCreatedResponse)({ type: sensorvalue_entity_1.SensorvalueEntity }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sensorvalue_dto_1.UpdateSensorvalueDto]),
    __metadata("design:returntype", void 0)
], SensorvaluesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: sensorvalue_entity_1.SensorvalueEntity }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SensorvaluesController.prototype, "remove", null);
SensorvaluesController = __decorate([
    (0, common_1.Controller)('sensorvalues'),
    (0, swagger_1.ApiTags)('sensorvalues'),
    __metadata("design:paramtypes", [sensorvalues_service_1.SensorvaluesService])
], SensorvaluesController);
exports.SensorvaluesController = SensorvaluesController;
//# sourceMappingURL=sensorvalues.controller.js.map