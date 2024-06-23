import { ClientModel } from 'src/database/models/client.model';

export class ClientUpdatedEvent {
  constructor(public client: ClientModel) {}
}
