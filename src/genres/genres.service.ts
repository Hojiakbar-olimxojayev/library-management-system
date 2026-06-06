import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { Repository } from 'typeorm';
import { ISuccess } from 'src/interface/success.response';
import conflicts from 'src/utils/conflicts';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepo: Repository<Genre>,
  ) {}

  async create(createGenreDto: CreateGenreDto): Promise<ISuccess> {
    const { name } = createGenreDto;
    await conflicts.mustBeUnique({ name }, this.genreRepo, 'Genre', 'name');
    const newGenre = this.genreRepo.create(createGenreDto);

    await this.genreRepo.save(newGenre);

    return {
      statusCode: 201,
      message: 'Genre created successfully',
      data: newGenre,
    };
  }

  async findAll(): Promise<ISuccess> {
    const genres = await this.genreRepo.find();

    return {
      statusCode: 200,
      message: 'All genres',
      data: genres,
    };
  }

  async findOne(id: number): Promise<ISuccess> {
    const genre = await conflicts.mustExist(
      { id },
      this.genreRepo,
      'Genre',
      'id',
    );

    return {
      statusCode: 200,
      message: 'Success',
      data: genre,
    };
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<ISuccess> {
    await conflicts.mustExist({ id }, this.genreRepo, 'Genre', 'id');

    const { name } = updateGenreDto;

    if (name) {
      const exist = (await this.genreRepo.findOne({
        where: { name },
      })) as Genre;
      
      if (exist && exist?.id !== id)
        throw new ConflictException(`The Genre with this name already exists`);

      await this.genreRepo.update(id, updateGenreDto);
    }

    const genre = await this.findOne(id);

    return {
      statusCode: 200,
      message: 'Genre updated successfully',
      data: genre.data,
    };
  }

  async remove(id: number): Promise<ISuccess> {
    await conflicts.mustExist({ id }, this.genreRepo, 'Genre', 'id');

    await this.genreRepo.delete({ id });

    return {
      statusCode: 200,
      message: 'Genre deleted successfully',
      data: {},
    };
  }
}
