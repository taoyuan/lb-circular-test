import {
  Filter,
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
    @repository(UserRepository)
    public userRepository: UserRepository, // @repository(TaskRepository)
  ) // public taskRepository: TaskRepository,
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
    return this.userRepository.find({
      include: [
        {
          relation: 'tasks',
        },
      ],
    });
  }
}
