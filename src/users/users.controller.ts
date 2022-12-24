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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { z } from 'zod';

const UserZodObject = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string(),
});

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    // #region validate createUserObject
    let messages: string[] = [];

    let validation = UserZodObject.safeParse(createUserDto);
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
    // #endregion

    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
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

    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ${id} does not exist.`);
    }
    return user;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
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

    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    // #region check if user with id exists
    let user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User with id: ' + id + ' not found!',
      });
    }
    // #endregion

    return this.usersService.remove(id);
  }
}
