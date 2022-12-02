import {Entity, hasOne, model, property} from '@loopback/repository';
import {User} from './user.model';

@model({settings: {strict: false}})
export class Task extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  userId?: string;

  @hasOne(() => User, {keyFrom: 'userId', keyTo: 'id'})
  user: User;

  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export interface TaskRelations {
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;
