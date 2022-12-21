import { PartialType } from '@nestjs/swagger';
import { CreateSensorvalueDto } from './create-sensorvalue.dto';

export class UpdateSensorvalueDto extends PartialType(CreateSensorvalueDto) {}
