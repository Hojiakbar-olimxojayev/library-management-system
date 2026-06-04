import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { ISuccess } from 'src/interface/success.response';
import conflicts from 'src/utils/conflicts';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private readonly authorRepo: Repository<Author>,
  ) {}
  async create(createAuthorDto: CreateAuthorDto): Promise<ISuccess> {
    const newAuthor = this.authorRepo.create(createAuthorDto);
    await this.authorRepo.save(newAuthor);

    return {
      statusCode: 201,
      message: 'Author created, successfully',
      data: newAuthor,
    };
  }

  async findAll(): Promise<ISuccess> {
    const authors = await this.authorRepo.find();

    return {
      statusCode: 200,
      message: 'all authors',
      data: authors,
    };
  }

  async findOne(id: number): Promise<ISuccess> {
    const author = await conflicts.mustExist(
      { id },
      this.authorRepo,
      'Author',
      'id',
    );

    return {
      statusCode: 200,
      message: 'success',
      data: author,
    };
  }

  async update(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<ISuccess> {
    await conflicts.mustExist({ id }, this.authorRepo, 'Author', 'id');
    const { full_name } = updateAuthorDto;

    if (full_name) await this.authorRepo.update(id, updateAuthorDto);

    const author = this.findOne(id);

    return {
      statusCode: 200,
      message: 'Author updated, successfully',
      data: (await author).data,
    };
  }

  async remove(id: number): Promise<ISuccess> {
    await conflicts.mustExist({ id }, this.authorRepo, 'Author', 'id');
    await this.authorRepo.delete({ id });

    return {
      statusCode: 200,
      message: 'Author deleted, succesfully',
      data: {},
    };
  }
}
