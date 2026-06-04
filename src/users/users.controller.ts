import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/Decorators/role.decorator';
import { Role } from 'src/config/role-enum';
import { OwnershipGuard } from 'src/ownership/ownership.guard';

@Controller('users')
@UseGuards(AuthGuard, RoleGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('admin')
  @Roles(Role.SUPERADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto, 2);
  }

  @Get()
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER)
  getMyProfile(@Req() req) {
    return this.usersService.findOne(+req.user.id);
  }

  @Get(':id')
  @UseGuards(OwnershipGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(OwnershipGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(OwnershipGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
