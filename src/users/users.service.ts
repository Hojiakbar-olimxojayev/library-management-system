import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Crypto } from 'src/utils/Crypto';
import { Role } from 'src/roles/entities/role.entity';
import { ISuccess } from 'src/interface/success.response';
import conflicts from 'src/utils/conflicts';
import { UserSubscription } from 'src/user_subscriptions/entities/user_subscription.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Role) private readonly roleRepe: Repository<Role>,
    @InjectRepository(UserSubscription)
    private readonly userSubRepo: Repository<UserSubscription>,
  ) { }
  async create(createUserDto: CreateUserDto, role: number): Promise<ISuccess> {
    const { email, password, login } = createUserDto;

    await conflicts.mustBeUnique({ email }, this.userRepo, 'User', 'email');
    await conflicts.mustBeUnique({ login }, this.userRepo, 'User', 'login');

    const hashedPassword = await Crypto.hash(password);

    const roleEntity = (await this.roleRepe.findOneBy({
      id: role,
    })) as Role;

    createUserDto.password = hashedPassword;

    const newUser = this.userRepo.create({
      ...createUserDto,
      role: roleEntity,
    });

    await this.userRepo.save(newUser);
    const { password: pass, ...userWithoutPasword } = newUser;

    return {
      statusCode: 201,
      message: 'The new user has been created successfully',
      data: userWithoutPasword,
    };
  }

  async findAll(): Promise<ISuccess> {
    const users = await this.userRepo.find({
      relations: {
        role: true,
      },
      select: {
        id: true,
        full_name: true,
        email: true,
        login: true,
        role: true,
      },
    });

    return {
      statusCode: 200,
      message: 'All users',
      data: users,
    };
  }

  async findOne(id: number): Promise<ISuccess> {
    await conflicts.mustExist({ id }, this.userRepo, 'User', 'id');

    const user = (await this.userRepo.findOne({
      where: { id },
      relations: {
        role: true,
        subscriptions: true,
      },
      select: {
        id: true,
        full_name: true,
        email: true,
        role: true,
      },
    })) as User;

    let end_date: string | Date = 'User has no subscription';
    if (user.subscriptions.length > 0) {
      const active_subscriptions = user.subscriptions.filter(
        (s) => s.is_active === true,
      );
      if (active_subscriptions.length > 0) {
        end_date = active_subscriptions[0]?.end_date;
      }
    }

    let subscription_remaining_days: number = 0;
    if (end_date instanceof Date) {
      subscription_remaining_days = Math.ceil(
        (end_date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
      );
    }

    return {
      statusCode: 200,
      message: 'success',
      data: {
        user,
        subcription_period: end_date,
        remaining_days: subscription_remaining_days,
      },
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<ISuccess> {
    const { email, login } = updateUserDto;
    await conflicts.mustExist({ id }, this.userRepo, 'User', 'id');

    if (email) {
      await conflicts.mustBeUniqueOnUpdate(
        id,
        { email },
        this.userRepo,
        'User',
        'email',
      );
    }
    if (login) {
      await conflicts.mustBeUniqueOnUpdate(
        id,
        { login },
        this.userRepo,
        'User',
        'login',
      );
    }
    const updatedUser = await this.userRepo.update(id, {
      ...updateUserDto
    });

    return {
      statusCode: 200,
      message: 'updated successfully',
      data: {},
    };
  }

  async remove(id: number): Promise<ISuccess> {
    await conflicts.mustExist({ id }, this.userRepo, 'User', 'id');

    this.userRepo.delete({ id });

    return {
      statusCode: 200,
      message: 'deleted successfully',
      data: {},
    };
  }
}
