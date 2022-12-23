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
exports.FieldsController = void 0;
const common_1 = require("@nestjs/common");
const fields_service_1 = require("./fields.service");
const create_field_dto_1 = require("./dto/create-field.dto");
const update_field_dto_1 = require("./dto/update-field.dto");
const swagger_1 = require("@nestjs/swagger");
const field_entity_1 = require("./entities/field.entity");
const zod_1 = require("zod");
const FieldZodObject = zod_1.z.object({
    name: zod_1.z.string(),
    area: zod_1.z.number(),
    unit: zod_1.z.enum(['sqm', 'sqkm', 'hectar', 'ar', 'acre']),
    latitude: zod_1.z.number(),
    longitude: zod_1.z.number(),
    description: zod_1.z.string(),
    userId: zod_1.z.string().length(36),
});
let FieldsController = class FieldsController {
    constructor(fieldsService) {
        this.fieldsService = fieldsService;
    }
    async create(createFieldDto) {
        let messages = [];
        let validation = FieldZodObject.safeParse(createFieldDto);
        if (validation.success == false) {
            let issues = validation.error.issues;
            for (let i = 0; i < issues.length; i++) {
                messages.push('' +
                    issues[i].message +
                    ' Error on property:' +
                    issues[i].path[0] +
                    '');
            }
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.NOT_ACCEPTABLE, response: messages }, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        let user = await this.fieldsService.findUserById(createFieldDto.userId);
        if (!user)
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        return await this.fieldsService.create(createFieldDto);
    }
    findAll() {
        return this.fieldsService.findAll();
    }
    async findOne(id) {
        let validation = zod_1.z.string().length(36).safeParse(id);
        if (validation.success == false) {
            throw new common_1.HttpException({
                response: validation.error.issues,
                statusCode: common_1.HttpStatus.NOT_ACCEPTABLE,
            }, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        const field = await this.fieldsService.findOne(id);
        if (!field) {
            throw new common_1.NotFoundException(`Field with ${id} does not exist.`);
        }
        return field;
    }
    update(id, updateFieldDto) {
        return this.fieldsService.update(id, updateFieldDto);
    }
    remove(id) {
        return this.fieldsService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({ type: field_entity_1.FieldEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_field_dto_1.CreateFieldDto]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: field_entity_1.FieldEntity, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FieldsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: field_entity_1.FieldEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FieldsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiCreatedResponse)({ type: field_entity_1.FieldEntity }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_field_dto_1.UpdateFieldDto]),
    __metadata("design:returntype", void 0)
], FieldsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: field_entity_1.FieldEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FieldsController.prototype, "remove", null);
FieldsController = __decorate([
    (0, common_1.Controller)('fields'),
    (0, swagger_1.ApiTags)('fields'),
    __metadata("design:paramtypes", [fields_service_1.FieldsService])
], FieldsController);
exports.FieldsController = FieldsController;
//# sourceMappingURL=fields.controller.js.map