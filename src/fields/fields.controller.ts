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
  ParseUUIDPipe,
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
  async create(@Body() createFieldDto: CreateFieldDto) {
    // #region if id is given check if field with id already exsists
    if (createFieldDto.id) {
      let fieldById = await this.fieldsService.findOne(createFieldDto.id);
      if (fieldById) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User with id: ' + createFieldDto.id + ' already exists!',
        });
      }
    }
    // #endregion

    // #region check if user with userId exists
    let user = await this.fieldsService.findUserById(createFieldDto.userId);
    if (!user)
      throw new NotFoundException(
        `No user with userId: ${createFieldDto.userId}`,
      );
    // #endregion

    return await this.fieldsService.create(createFieldDto);
  }

  @Get()
  @ApiOkResponse({ type: FieldEntity, isArray: true })
  findAll() {
    return this.fieldsService.findAll();
  }
  @Get('/detailed')
  @ApiOkResponse({ type: FieldEntity, isArray: true })
  findAllDetailed() {
    return this.fieldsService.findAllDetailed();
  }
  @Get('/units')
  @ApiOkResponse({ type: FieldEntity, isArray: true })
  getUnits() {
    return this.fieldsService.getUnits();
  }
  @Get('/count')
  @ApiOkResponse({ type: FieldEntity, isArray: true })
  async getCount() {
    return {
      count: await this.fieldsService.getCount(),
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: FieldEntity })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const field = await this.fieldsService.findOne(id);
    if (!field) {
      throw new NotFoundException(`Field with id: ${id} does not exist!`);
    }
    return field;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: FieldEntity })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFieldDto: UpdateFieldDto,
  ) {
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
  async remove(@Param('id', ParseUUIDPipe) id: string) {
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
