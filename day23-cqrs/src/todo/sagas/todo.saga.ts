
import { Injectable } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { TodoCreatedEvent } from '../events/todo-created.event';
import { Observable, map } from 'rxjs';
import { LogTodoCreationCommand, LogTodoUpdateCommand } from '../cqrs/todo.commond';
import { TodoUpdatedEvent } from '../events/update.todo.event';


@Injectable()
export class TodoSagas {
  @Saga()
  todoCreatedSaga = (events$: Observable<any>): Observable<any> =>
    events$.pipe(
      ofType(TodoCreatedEvent),
      map(event => new LogTodoCreationCommand(event.id, event.title)),
    );
    @Saga()
  todoUpdatedSaga = (events$: Observable<any>): Observable<any> =>
    events$.pipe(
      ofType(TodoUpdatedEvent),
      map(event => new LogTodoUpdateCommand(event.id, event.title , event.done)),
    );

}
