"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorvaluesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let SensorvaluesService = class SensorvaluesService {
    sensorValuesBySensorId(id) {
        return prisma.sensorValue.findMany({ where: { sensorId: id } });
    }
    findSensorById(id) {
        return prisma.sensor.findFirst({ where: { id } });
    }
    create(createSensorvalueDto) {
        return prisma.sensorValue.create({ data: createSensorvalueDto });
    }
    findAll() {
        return prisma.sensorValue.findMany();
    }
    findOne(id) {
        return prisma.sensorValue.findFirst({ where: { id } });
    }
    update(id, updateSensorvalueDto) {
        return prisma.sensorValue.update({
            where: { id },
            data: updateSensorvalueDto,
        });
    }
    remove(id) {
        return prisma.sensorValue.delete({ where: { id } });
    }
};
SensorvaluesService = __decorate([
    (0, common_1.Injectable)()
], SensorvaluesService);
exports.SensorvaluesService = SensorvaluesService;
//# sourceMappingURL=sensorvalues.service.js.map