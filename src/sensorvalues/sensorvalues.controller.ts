import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SensorvaluesService } from './sensorvalues.service';
import { CreateSensorvalueDto } from './dto/create-sensorvalue.dto';
import { UpdateSensorvalueDto } from './dto/update-sensorvalue.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SensorvalueEntity } from './entities/sensorvalue.entity';

@Controller('sensorvalues')
@ApiTags('sensorvalues')
export class SensorvaluesController {
  constructor(private readonly sensorvaluesService: SensorvaluesService) {}

  @Post()
  @ApiCreatedResponse({ type: SensorvalueEntity })
  create(@Body() createSensorvalueDto: CreateSensorvalueDto) {
    return this.sensorvaluesService.create(createSensorvalueDto);
  }

  @Get()
  @ApiOkResponse({ type: SensorvalueEntity, isArray: true })
  findAll() {
    return this.sensorvaluesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SensorvalueEntity })
  findOne(@Param('id') id: string) {
    return this.sensorvaluesService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: SensorvalueEntity })
  update(
    @Param('id') id: string,
    @Body() updateSensorvalueDto: UpdateSensorvalueDto,
  ) {
    return this.sensorvaluesService.update(id, updateSensorvalueDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SensorvalueEntity })
  remove(@Param('id') id: string) {
    return this.sensorvaluesService.remove(id);
  }
}
