import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Role } from 'src/config/role-enum';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const targetId = +req.params.id;

    const targetedUser = (await this.userRepo.findOne({
      where: { id: targetId },
      relations: { role: true },
    })) as User;

    if (!targetedUser) {
      throw new NotFoundException(`User with this id is not found`);
    }

    if (user.role.name === Role.SUPERADMIN) {
      return true;
    }

    if (targetedUser.role?.name === Role.SUPERADMIN) {
      throw new ForbiddenException(`You have no permission`);
    }

    if (user.role.name === Role.ADMIN) {
      if (targetedUser.role.name === Role.USER || user?.id === targetId) {
        return true;
      }
    }
    if (user?.id === targetId) {
      return true;
    }
    throw new ForbiddenException(`You have no permission`);
  }
}
