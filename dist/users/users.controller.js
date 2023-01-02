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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./entities/user.entity");
const bcrypt_1 = require("bcrypt");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        if (createUserDto.id) {
            let userById = await this.usersService.findOne(createUserDto.id);
            if (userById) {
                throw new common_1.BadRequestException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'User with id: ' + createUserDto.id + ' already exists!',
                });
            }
        }
        let userByEmail = await this.usersService.findByEmail(createUserDto.email);
        let userByUsername = await this.usersService.findByUsername(createUserDto.username);
        if (userByEmail) {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'User with email: ' + createUserDto.email + ' already exists!',
            });
        }
        if (userByUsername) {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'User with username: ' + createUserDto.username + ' already exists!',
            });
        }
        createUserDto.password = (0, bcrypt_1.hashSync)(createUserDto.password, 10);
        return this.usersService.create(createUserDto);
    }
    findAll() {
        return this.usersService.findAll();
    }
    findAllDetailed() {
        return this.usersService.findAllDetailed();
    }
    async getCount() {
        return {
            count: await this.usersService.getCount(),
        };
    }
    async findOne(id) {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ${id} does not exist.`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ${id} does not exist.`);
        }
        if (updateUserDto.email) {
            let userByEmail = await this.usersService.findByEmail(updateUserDto.email);
            if (userByEmail) {
                throw new common_1.BadRequestException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'User with email: ' + updateUserDto.email + ' already exists!',
                });
            }
        }
        if (updateUserDto.username) {
            let userByUsername = await this.usersService.findByUsername(updateUserDto.username);
            if (userByUsername) {
                throw new common_1.BadRequestException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'User with username: ' +
                        updateUserDto.username +
                        ' already exists!',
                });
            }
        }
        return this.usersService.update(id, updateUserDto);
    }
    async remove(id) {
        let user = await this.usersService.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: 'User with id: ' + id + ' not found!',
            });
        }
        return this.usersService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({ type: user_entity_1.UserEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.UserEntity, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/detailed'),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.UserEntity, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAllDetailed", null);
__decorate([
    (0, common_1.Get)('/count'),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.UserEntity }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiCreatedResponse)({ type: user_entity_1.UserEntity }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.UserEntity }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map