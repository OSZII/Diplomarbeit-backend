"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsService = void 0;
const common_1 = require("@nestjs/common");
const create_field_dto_1 = require("./dto/create-field.dto");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
const prisma = new client_1.PrismaClient();
let FieldsService = class FieldsService {
    getUnits() {
        let unitsArr = [];
        for (let i = 0; i < Object.values(create_field_dto_1.unit).length; i++) {
            if (!(0, class_validator_1.isNumber)(Object.values(create_field_dto_1.unit)[i]))
                unitsArr.push(Object.values(create_field_dto_1.unit)[i]);
        }
        return {
            units: unitsArr,
        };
    }
    findAllDetailed() {
        return prisma.field.findMany({
            select: {
                id: true,
                name: true,
                area: true,
                unit: true,
                latitude: true,
                longitude: true,
                description: true,
                sensors: {
                    select: {
                        id: true,
                        type: true,
                        sensorValues: {
                            select: {
                                id: true,
                                value: true,
                                timeStamp: true,
                            },
                        },
                    },
                },
            },
        });
    }
    getCount() {
        return prisma.field.count();
    }
    create(createFieldDto) {
        return prisma.field.create({ data: createFieldDto });
    }
    findAll() {
        return prisma.field.findMany();
    }
    findOne(id) {
        return prisma.field.findFirst({ where: { id } });
    }
    findUserById(id) {
        return prisma.user.findFirst({ where: { id } });
    }
    update(id, updateFieldDto) {
        return prisma.field.update({ where: { id }, data: updateFieldDto });
    }
    remove(id) {
        return prisma.field.delete({ where: { id } });
    }
};
FieldsService = __decorate([
    (0, common_1.Injectable)()
], FieldsService);
exports.FieldsService = FieldsService;
//# sourceMappingURL=fields.service.js.map