import {BindingScope, inject, injectable} from '@loopback/core';
import {
  DefaultCrudRepository, Getter,
  HasOneRepositoryFactory, repository,
} from '@loopback/repository';
import {MemoryDataSource} from '../datasources';
import {Task, TaskRelations, User} from '../models';
import {UserRepository} from './user.repository';

@injectable({scope: BindingScope.SINGLETON})
export class TaskRepository extends DefaultCrudRepository<Task,
  typeof Task.prototype.id,
  TaskRelations> {

  public user: HasOneRepositoryFactory<User, typeof User.prototype.id>;

  constructor(
    @inject('datasources.memory') dataSource: MemoryDataSource,
    @repository.getter('UserRepository')
    public userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Task, dataSource);
    this.user = this.createHasOneRepositoryFactoryFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
