

export class TodoUpdatedEvent {
  constructor(public readonly id: number, public readonly title: string, public readonly done: boolean) {}
}
