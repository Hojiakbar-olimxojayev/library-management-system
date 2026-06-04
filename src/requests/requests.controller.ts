import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/Decorators/role.decorator';
import { Role } from 'src/config/role-enum';

@Controller('requests')
@UseGuards(AuthGuard, RoleGuard)
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Get('my-requests')
  getMyRequests(@Req() req) {
    return this.requestsService.getMyRequests(+req.user.id);
  }

  @Get('my-active-requests')
  getMyActiveRequests(@Req() req) {
    return this.requestsService.getMyActiveRequests(+req.user.id);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  findAll() {
    return this.requestsService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }

  @Post('buy')
  create(@Body() createRequestDto: CreateRequestDto, @Req() req) {
    return this.requestsService.create(createRequestDto, req.user.id);
  }

  @Post('reject-my-request/:id')
  rejectMyRequest(@Param('id') id: string, @Req() req) {
    return this.requestsService.rejectMyRequest(+id, +req.user.id);
  }

  @Post('reject-request/:id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  rejectRequest(@Param('id') id: string) {
    return this.requestsService.rejectRequest(+id);
  }

  @Post('return-request/:userBookId')
  returnBook(@Param('userBookId') userBookId: string, @Req() req) {
    return this.requestsService.requestReturn(+userBookId, +req.user.id);
  }

  @Post('accept-request/:id')
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  acceptRequest(@Param('id') id: string) {
    return this.requestsService.acceptRequest(+id);
  }
}
