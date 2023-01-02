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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { hashSync } from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    // #region if id is given check if user with id already exsists
    if (createUserDto.id) {
      let userById = await this.usersService.findOne(createUserDto.id);
      if (userById) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User with id: ' + createUserDto.id + ' already exists!',
        });
      }
    }
    // #endregion

    // #region check if user with email or username already exists
    let userByEmail = await this.usersService.findByEmail(createUserDto.email);
    let userByUsername = await this.usersService.findByUsername(
      createUserDto.username,
    );
    if (userByEmail) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User with email: ' + createUserDto.email + ' already exists!',
      });
    }
    if (userByUsername) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message:
          'User with username: ' + createUserDto.username + ' already exists!',
      });
    }
    // #endregion

    // hash userpassword hashSync(..., 10) auto generates salt and hashes the password
    createUserDto.password = hashSync(createUserDto.password, 10);

    return this.usersService.create(createUserDto);
  }
  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }
  @Get('/detailed')
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAllDetailed() {
    return this.usersService.findAllDetailed();
  }

  @Get('/count')
  @ApiOkResponse({ type: Number })
  async getCount() {
    return {
      count: await this.usersService.getCount(),
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    // #region check if user exists
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ${id} does not exist.`);
    }
    // #endregion
    return user;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // #region check if user exists
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ${id} does not exist.`);
    }
    // #endregion

    // #region check if username or email given if user with this username or email already exists
    if (updateUserDto.email) {
      let userByEmail = await this.usersService.findByEmail(
        updateUserDto.email,
      );
      if (userByEmail) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            'User with email: ' + updateUserDto.email + ' already exists!',
        });
      }
    }
    if (updateUserDto.username) {
      let userByUsername = await this.usersService.findByUsername(
        updateUserDto.username,
      );
      if (userByUsername) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            'User with username: ' +
            updateUserDto.username +
            ' already exists!',
        });
      }
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
