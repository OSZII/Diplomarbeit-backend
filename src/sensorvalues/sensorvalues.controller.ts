import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpStatus,
  HttpException,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { SensorvaluesService } from './sensorvalues.service';
import { CreateSensorvalueDto } from './dto/create-sensorvalue.dto';
import { UpdateSensorvalueDto } from './dto/update-sensorvalue.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SensorvalueEntity } from './entities/sensorvalue.entity';
import { z } from 'zod';
import { identity } from 'rxjs';

const SensorValueZodObject = z.object({
  value: z.string(),
  timeStamp: z.string(),
  sensorId: z.string().length(36),
});

@Controller('sensorvalues')
@ApiTags('sensorvalues')
export class SensorvaluesController {
  constructor(private readonly sensorvaluesService: SensorvaluesService) {}

  @Post()
  @ApiCreatedResponse({ type: SensorvalueEntity })
  async create(@Body() createSensorvalueDto: CreateSensorvalueDto) {
    // #region if id is given check if sensorValue with id already exsists
    if (createSensorvalueDto.id) {
      let sensorValueById = await this.sensorvaluesService.findOne(
        createSensorvalueDto.id,
      );
      if (sensorValueById) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            'Sensorvalue with id: ' +
            createSensorvalueDto.id +
            ' already exists!',
        });
      }
    }
    // #endregion

    // #region check if user with userId exists
    let sensorValue = await this.sensorvaluesService.findSensorById(
      createSensorvalueDto.sensorId,
    );
    if (!sensorValue)
      throw new NotFoundException(
        `No Sensor with sensorId: ${createSensorvalueDto.sensorId}`,
      );
    // #endregion

    return this.sensorvaluesService.create(createSensorvalueDto);
  }

  @Get()
  @ApiOkResponse({ type: SensorvalueEntity, isArray: true })
  findAll() {
    return this.sensorvaluesService.findAll();
  }

  @Get('/sensor/:id')
  @ApiOkResponse({ type: SensorvalueEntity, isArray: true })
  async findSensorValueBySensorId(@Param('id', ParseUUIDPipe) id: string) {
    return this.sensorvaluesService.sensorValuesBySensorId(id);
  }

  @Get(':id')
  @ApiOkResponse({ type: SensorvalueEntity })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const sensorvalue = await this.sensorvaluesService.findOne(id);
    if (!sensorvalue) {
      throw new NotFoundException(`Sensorvalue with ${id} does not exist.`);
    }
    return sensorvalue;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: SensorvalueEntity })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSensorvalueDto: UpdateSensorvalueDto,
  ) {
    // #region if sensorId given, then check if the sensor exists
    if (updateSensorvalueDto.sensorId) {
      let user = await this.sensorvaluesService.findSensorById(
        updateSensorvalueDto.sensorId,
      );
      if (!user) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message:
            'Sensor with id: ' + updateSensorvalueDto.sensorId + ' not found!',
        });
      }
    }
    // #endregion

    return this.sensorvaluesService.update(id, updateSensorvalueDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SensorvalueEntity })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    // #region check if sensorValue with id exists
    let sensorValue = await this.sensorvaluesService.findOne(id);
    if (!sensorValue) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'SensorValue with id: ' + id + ' not found!',
      });
    }
    // #endregion

    return this.sensorvaluesService.remove(id);
  }
}
