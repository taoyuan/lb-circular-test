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
import {Task} from '../models';
import {TaskRepository} from '../repositories';
import '../repositories/user.repository';

export class TaskController {
  constructor(
    // @repository(UserRepository)
    // public userRepository : UserRepository,
    @repository(TaskRepository)
    public taskRepository: TaskRepository,
  ) {
  }

  @get('/tasks')
  @response(200, {
    description: 'Array of Task model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Task, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Task) filter?: Filter<Task>,
  ): Promise<Task[]> {
    return this.taskRepository.find({
      include: [
        {
          relation: 'user',
        },
      ],
    });
  }

}
