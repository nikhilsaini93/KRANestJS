export class CreateTodoCommand {
  constructor(public readonly title: string) {}
}

export class UpdateTodoCommand {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly done: boolean,
  ) {}
}

export class DeleteTodoCommand {
  constructor(public readonly id: number) {}
}



export class LogTodoCreationCommand {
  constructor(public readonly id: number, public readonly title: string) {}
}




