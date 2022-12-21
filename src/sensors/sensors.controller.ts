import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { ApiCreatedResponse, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { SensorEntity } from './entities/sensor.entity';

@Controller('sensors')
@ApiTags('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post()
  @ApiCreatedResponse({ type: SensorEntity })
  create(@Body() createSensorDto: CreateSensorDto) {
    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  @ApiOkResponse({ type: SensorEntity, isArray: true })
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SensorEntity })
  findOne(@Param('id') id: string) {
    return this.sensorsService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: SensorEntity })
  update(@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
    return this.sensorsService.update(id, updateSensorDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SensorEntity })
  remove(@Param('id') id: string) {
    return this.sensorsService.remove(id);
  }
}
