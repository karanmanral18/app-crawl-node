import { ClientModel } from '../../database/models/client.model';

export class ClientUpdatedEvent {
  constructor(public client: ClientModel) {}
}
