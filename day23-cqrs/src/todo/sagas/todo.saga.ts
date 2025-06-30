
import { Injectable } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { TodoCreatedEvent } from '../events/todo-created.event';
import { Observable, map } from 'rxjs';
import { LogTodoCreationCommand } from '../cqrs/todo.commond';


@Injectable()
export class TodoSagas {
  @Saga()
  todoCreatedSaga = (events$: Observable<any>): Observable<any> =>
    events$.pipe(
      ofType(TodoCreatedEvent),
      map(event => new LogTodoCreationCommand(event.id, event.title)),
    );
}
