import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FieldsModule } from './fields/fields.module';
import { UsersModule } from './users/users.module';
import { SensorsModule } from './sensors/sensors.module';
import { SensorvaluesModule } from './sensorvalues/sensorvalues.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [FieldsModule, UsersModule, SensorsModule, SensorvaluesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
