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
import { UserBooksService } from './user-books.service';
import { CreateUserBookDto } from './dto/create-user-book.dto';
import { UpdateUserBookDto } from './dto/update-user-book.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/Decorators/role.decorator';
import { Role } from 'src/config/role-enum';

@Controller('user-books')
@UseGuards(AuthGuard, RoleGuard)
export class UserBooksController {
  constructor(private readonly userBooksService: UserBooksService) {}

  @Get()
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  findAll() {
    return this.userBooksService.findAll();
  }

  @Get('my-books')
  getMyBooks(@Req() req) {
    return this.userBooksService.getMyBooks(+req.user.id);
  }
}
