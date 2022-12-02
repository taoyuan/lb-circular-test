import {BindingScope, inject, injectable} from '@loopback/core';
import {
  DefaultCrudRepository, Getter,
  HasManyRepositoryFactory, repository,
} from '@loopback/repository';
import {MemoryDataSource} from '../datasources';
import {Task, User, UserRelations} from '../models';
import {TaskRepository} from './task.repository';

@injectable({scope: BindingScope.SINGLETON})
export class UserRepository extends DefaultCrudRepository<User,
  typeof User.prototype.id,
  UserRelations> {

  public tasks: HasManyRepositoryFactory<Task, typeof Task.prototype.id>;

  constructor(
    @inject('datasources.memory') dataSource: MemoryDataSource,
    @repository.getter('TaskRepository')
    public taskRepositoryGetter: Getter<TaskRepository>,
  ) {
    super(User, dataSource);

    this.tasks = this.createHasManyRepositoryFactoryFor('tasks', taskRepositoryGetter);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
  }
}
