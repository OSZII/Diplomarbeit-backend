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
} from '@nestjs/common';
import { SensorvaluesService } from './sensorvalues.service';
import { CreateSensorvalueDto } from './dto/create-sensorvalue.dto';
import { UpdateSensorvalueDto } from './dto/update-sensorvalue.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SensorvalueEntity } from './entities/sensorvalue.entity';
import { z } from 'zod';

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
    // #region validate if id == uuid()
    let validation = z
      .string()
      .length(36)
      .safeParse(createSensorvalueDto.sensorId);
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

    // #region validate createFieldObject
    let messages: string[] = [];

    let validation2 = SensorValueZodObject.safeParse(createSensorvalueDto);
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

    // #region check sensorId if sensor exists
    let user = await this.sensorvaluesService.findSensorById(
      createSensorvalueDto.sensorId,
    );
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    //#endregion

    return this.sensorvaluesService.create(createSensorvalueDto);
  }

  @Get()
  @ApiOkResponse({ type: SensorvalueEntity, isArray: true })
  findAll() {
    return this.sensorvaluesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SensorvalueEntity })
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

    const sensorvalue = await this.sensorvaluesService.findOne(id);
    if (!sensorvalue) {
      throw new NotFoundException(`Sensorvalue with ${id} does not exist.`);
    }
    return sensorvalue;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: SensorvalueEntity })
  update(
    @Param('id') id: string,
    @Body() updateSensorvalueDto: UpdateSensorvalueDto,
  ) {
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

    return this.sensorvaluesService.update(id, updateSensorvalueDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SensorvalueEntity })
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

    return this.sensorvaluesService.remove(id);
  }
}
