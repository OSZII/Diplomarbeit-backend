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
    // #region validate if id == uuid()
    let validation = z.string().length(36).safeParse(createSensorDto.fieldId);
    // if not uuid don't even ask the database
    if (validation.success == false) {
      throw new HttpException(
        {
          response: validation.error.issues,
          statusCode: HttpStatus.NOT_ACCEPTABLE,
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // #endregion

    // #region validate createSensorObject
    let messages: string[] = [];
    let validation2 = SensorZodObject.safeParse(createSensorDto);
    if (validation2.success == false) {
      let issues = validation2.error.issues;
      for (let i = 0; i < issues.length; i++) {
        messages.push(
          '' +
            issues[i].message +
            ' Error on property:' +
            issues[i].path[0] +
            '',
        );
      }

      throw new HttpException(
        { statusCode: HttpStatus.NOT_ACCEPTABLE, response: messages },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // #endregion

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
  async findOne(@Param('id') id: string) {
    // #region validate if id == uuid()
    let validation = z.string().length(36).safeParse(id);

    // if not uuid don't even ask the database
    if (validation.success == false) {
      throw new HttpException(
        {
          response: validation.error.issues,
          statusCode: HttpStatus.NOT_ACCEPTABLE,
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // #endregion

    const sensor = await this.sensorsService.findOne(id);
    if (!sensor) {
      throw new NotFoundException(`Sensor with ${id} does not exist.`);
    }
    return sensor;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: SensorEntity })
  update(@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
    // #region validate if id == uuid()
    let validation = z.string().length(36).safeParse(id);

    // if not uuid don't even ask the database
    if (validation.success == false) {
      throw new HttpException(
        {
          response: validation.error.issues,
          statusCode: HttpStatus.NOT_ACCEPTABLE,
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // #endregion

    return this.sensorsService.update(id, updateSensorDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SensorEntity })
  remove(@Param('id') id: string) {
    // #region validate if id == uuid()
    let validation = z.string().length(36).safeParse(id);

    // if not uuid don't even ask the database
    if (validation.success == false) {
      throw new HttpException(
        {
          response: validation.error.issues,
          statusCode: HttpStatus.NOT_ACCEPTABLE,
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    // #endregion

    return this.sensorsService.remove(id);
  }
}
