import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FieldEntity } from './entities/field.entity';

@Controller('fields')
@ApiTags('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post()
  @ApiCreatedResponse({ type: FieldEntity })
  create(@Body() createFieldDto: CreateFieldDto) {
    return this.fieldsService.create(createFieldDto);
  }

  @Get()
  @ApiOkResponse({ type: FieldEntity, isArray: true })
  findAll() {
    return this.fieldsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: FieldEntity })
  findOne(@Param('id') id: string) {
    return this.fieldsService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: FieldEntity })
  update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {
    return this.fieldsService.update(id, updateFieldDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: FieldEntity })
  remove(@Param('id') id: string) {
    return this.fieldsService.remove(id);
  }
}
