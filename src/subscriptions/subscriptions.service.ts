import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { ISuccess } from 'src/interface/success.response';
import conflicts from 'src/utils/conflicts';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepo: Repository<Subscription>,
  ) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<ISuccess> {
    const { name } = createSubscriptionDto;

    await conflicts.mustBeUnique(
      { name },
      this.subscriptionRepo,
      'Subscription',
      'name',
    );

    const newSubscription = this.subscriptionRepo.create(createSubscriptionDto);

    await this.subscriptionRepo.save(newSubscription);

    return {
      statusCode: 201,
      message: 'Subscription created successfully',
      data: newSubscription,
    };
  }

  async findAll(): Promise<ISuccess> {
    const subscriptions = await this.subscriptionRepo.find();

    return {
      statusCode: 200,
      message: 'All subscriptions',
      data: subscriptions,
    };
  }

  async findOne(id: number): Promise<ISuccess> {
    const subscription = await conflicts.mustExist(
      { id },
      this.subscriptionRepo,
      'Subscription',
      'id',
    );

    return {
      statusCode: 200,
      message: 'Success',
      data: subscription,
    };
  }

  async update(
    id: number,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<ISuccess> {
    await conflicts.mustExist(
      { id },
      this.subscriptionRepo,
      'Subscription',
      'id',
    );

    const { name } = updateSubscriptionDto;

    if (name) {
      await conflicts.mustBeUniqueOnUpdate(
        id,
        { name },
        this.subscriptionRepo,
        'Subscription',
        'name',
      );
    }

    await this.subscriptionRepo.update(id, updateSubscriptionDto);

    const subscription = await this.findOne(id);

    return {
      statusCode: 200,
      message: 'Subscription updated successfully',
      data: subscription.data,
    };
  }

  async remove(id: number): Promise<ISuccess> {
    await conflicts.mustExist(
      { id },
      this.subscriptionRepo,
      'Subscription',
      'id',
    );

    await this.subscriptionRepo.delete({ id });

    return {
      statusCode: 200,
      message: 'Subscription deleted successfully',
      data: {},
    };
  }
}
