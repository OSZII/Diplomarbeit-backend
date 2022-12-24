import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { ApiCreatedResponse, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { SensorEntity } from './entities/sensor.entity';
import { z } from 'zod';

const SensorZodObject = z.object({
  type: z.string(),
  fieldId: z.string().length(36),
});

@Controller('sensors')
@ApiTags('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post()
  @ApiCreatedResponse({ type: SensorEntity })
  async create(@Body() createSensorDto: CreateSensorDto) {
    // #region check fieldId if field exists
    let field = await this.sensorsService.findFieldById(
      createSensorDto.fieldId,
    );
    if (!field)
      throw new HttpException('Sensor not found', HttpStatus.NOT_FOUND);
    // #endregion

    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  @ApiOkResponse({ type: SensorEntity, isArray: true })
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SensorEntity })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const sensor = await this.sensorsService.findOne(id);
    if (!sensor) {
      throw new NotFoundException(`Sensor with ${id} does not exist.`);
    }
    return sensor;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: SensorEntity })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSensorDto: UpdateSensorDto,
  ) {
    return this.sensorsService.update(id, updateSensorDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SensorEntity })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    // #region check if sensor with id exists
    let sensor = await this.sensorsService.findOne(id);
    if (!sensor) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Sensor with id: ' + id + ' not found!',
      });
    }
    // #endregion

    return this.sensorsService.remove(id);
  }
}
