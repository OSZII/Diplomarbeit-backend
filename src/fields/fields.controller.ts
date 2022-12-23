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
import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FieldEntity } from './entities/field.entity';
import { z } from 'zod';

const FieldZodObject = z.object({
  name: z.string(),
  area: z.number(),
  unit: z.enum(['sqm', 'sqkm', 'hectar', 'ar', 'acre']),
  latitude: z.number(),
  longitude: z.number(),
  description: z.string(),
  userId: z.string().length(36),
});

@Controller('fields')
@ApiTags('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post()
  @ApiCreatedResponse({ type: FieldEntity })
  async create(@Body() createFieldDto: CreateFieldDto) {
    let messages: string[] = [];
    let validation = FieldZodObject.safeParse(createFieldDto);

    if (validation.success == false) {
      let issues = validation.error.issues;
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

    // implement check for userId
    let user = await this.fieldsService.findUserById(createFieldDto.userId);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return await this.fieldsService.create(createFieldDto);
  }

  @Get()
  @ApiOkResponse({ type: FieldEntity, isArray: true })
  findAll() {
    return this.fieldsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: FieldEntity })
  async findOne(@Param('id') id: string) {
    let validation = z.string().length(36).safeParse(id);

    // if not uuid return don't even ask the database
    if (validation.success == false) {
      throw new HttpException(
        {
          response: validation.error.issues,
          statusCode: HttpStatus.NOT_ACCEPTABLE,
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const field = await this.fieldsService.findOne(id);
    if (!field) {
      throw new NotFoundException(`Field with ${id} does not exist.`);
    }
    return field;
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
