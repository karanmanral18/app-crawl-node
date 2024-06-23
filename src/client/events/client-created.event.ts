import { ClientModel } from '../../database/models/client.model';

export class ClientCreatedEvent {
  constructor(public client: ClientModel) {}
}
