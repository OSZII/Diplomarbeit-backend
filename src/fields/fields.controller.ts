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
  BadRequestException,
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
    // #region validate if id == uuid()
    let validation = z.string().length(36).safeParse(createFieldDto.userId);
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

    let validation2 = FieldZodObject.safeParse(createFieldDto);
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

    // #region check userId if user exists
    let user = await this.fieldsService.findUserById(createFieldDto.userId);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    // #endregion

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

    const field = await this.fieldsService.findOne(id);
    if (!field) {
      throw new NotFoundException(`Field with ${id} does not exist.`);
    }
    return field;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: FieldEntity })
  async update(
    @Param('id') id: string,
    @Body() updateFieldDto: UpdateFieldDto,
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

    // #region check if invalid parameters are given
    let validation2 = FieldZodObject.partial()
      .strict()
      .safeParse(updateFieldDto);
    if (validation2.success == false) {
      let issues = validation2.error.issues;
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        code: issues[0].code,
        keys: issues.keys,
        message: issues[0].message,
      });
    }
    // #endregion

    // #region check if object is empty
    if (Object.keys(updateFieldDto).length == 0) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Object can't be empty!",
      });
    }
    // #endregion

    // #region if userId given, then check if the user exists
    if (updateFieldDto.userId) {
      let user = await this.fieldsService.findUserById(updateFieldDto.userId);
      if (!user) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User with id: ' + updateFieldDto.userId + ' not found!',
        });
      }
    }
    // #endregion

    return this.fieldsService.update(id, updateFieldDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: FieldEntity })
  async remove(@Param('id') id: string) {
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

    // #region check if field with id exists
    let field = await this.fieldsService.findOne(id);
    if (!field) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Field with id: ' + id + ' not found!',
      });
    }
    // #endregion

    return this.fieldsService.remove(id);
  }
}
