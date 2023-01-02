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
  BadRequestException,
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
  async create(@Body() createSensorDto: CreateSensorDto) {
    // #region if id is given check if sensor with id already exsists
    if (createSensorDto.id) {
      let sensorById = await this.sensorsService.findOne(createSensorDto.id);
      if (sensorById) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Sensor with id: ' + createSensorDto.id + ' already exists!',
        });
      }
    }
    // #endregion

    // #region check if field with fieldId exists
    let field = await this.sensorsService.findFieldById(
      createSensorDto.fieldId,
    );
    if (!field)
      throw new NotFoundException(
        `No field with fieldId: ${createSensorDto.fieldId}`,
      );
    // #endregion

    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  @ApiOkResponse({ type: SensorEntity, isArray: true })
  findAll() {
    return this.sensorsService.findAll();
  }
  @Get('/detailed')
  @ApiOkResponse({ type: SensorEntity, isArray: true })
  findAllDetailed() {
    return this.sensorsService.findAllDetailed();
  }
  @Get('/sensortypes')
  @ApiOkResponse({ type: SensorEntity, isArray: true })
  getAllSensortypes() {
    return this.sensorsService.getSensorTypes();
  }
  @Get('/count')
  @ApiOkResponse({ type: SensorEntity, isArray: true })
  async getSensorCount() {
    return {
      count: await this.sensorsService.getCount(),
    };
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
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSensorDto: UpdateSensorDto,
  ) {
    // #region if fieldId given, then check if the field exists
    if (updateSensorDto.fieldId) {
      let field = await this.sensorsService.findFieldById(
        updateSensorDto.fieldId,
      );
      if (!field) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Field with id: ' + updateSensorDto.fieldId + ' not found!',
        });
      }
    }
    // #endregion

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
