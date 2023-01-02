"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorsService = void 0;
const common_1 = require("@nestjs/common");
const create_sensor_dto_1 = require("./dto/create-sensor.dto");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
const prisma = new client_1.PrismaClient();
let SensorsService = class SensorsService {
    getSensorTypes() {
        let sensorsArr = [];
        for (let i = 0; i < Object.values(create_sensor_dto_1.SensorType).length; i++) {
            if (!(0, class_validator_1.isNumber)(Object.values(create_sensor_dto_1.SensorType)[i]))
                sensorsArr.push(Object.values(create_sensor_dto_1.SensorType)[i]);
        }
        return {
            sensorTypes: sensorsArr,
        };
    }
    findFieldById(id) {
        return prisma.field.findFirst({ where: { id } });
    }
    create(createSensorDto) {
        return prisma.sensor.create({ data: createSensorDto });
    }
    getCount() {
        return prisma.sensor.count();
    }
    findAllDetailed() {
        return prisma.sensor.findMany({
            select: {
                fieldId: true,
                type: true,
                sensorValues: {
                    select: {
                        timeStamp: true,
                        value: true,
                    },
                },
            },
        });
    }
    findAll() {
        return prisma.sensor.findMany();
    }
    findOne(id) {
        return prisma.sensor.findFirst({ where: { id } });
    }
    update(id, updateSensorDto) {
        return prisma.sensor.update({ where: { id }, data: updateSensorDto });
    }
    remove(id) {
        return prisma.sensor.delete({ where: { id } });
    }
};
SensorsService = __decorate([
    (0, common_1.Injectable)()
], SensorsService);
exports.SensorsService = SensorsService;
//# sourceMappingURL=sensors.service.js.map