import { ClientModel } from 'src/database/models/client.model';

export class ClientCreatedEvent {
  constructor(public client: ClientModel) {}
}
