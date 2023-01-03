"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Flower auf Dauer Backend')
        .setDescription('Backend in NestJS and Prisma Diploma Thesis for Flower Auf Dauer')
        .setVersion('1.0')
        .build();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const reflector = app.get(core_1.Reflector);
    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(reflector));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map