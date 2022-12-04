import {
  Filter, Getter,
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
  response,
} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';
import '../repositories/task.repository';

export class UserController {
  constructor(
    @repository.getter(UserRepository)
    public getUserRepository: Getter<UserRepository>,
  )
  {}

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    const userRepository = await this.getUserRepository();
    return userRepository.find({
      include: [
        {
          relation: 'tasks',
        },
      ],
    });
  }
}
