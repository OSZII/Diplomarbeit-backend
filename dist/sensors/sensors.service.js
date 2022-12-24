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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let SensorsService = class SensorsService {
    findFieldById(id) {
        return prisma.field.findFirst({ where: { id } });
    }
    create(createSensorDto) {
        return prisma.sensor.create({ data: createSensorDto });
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