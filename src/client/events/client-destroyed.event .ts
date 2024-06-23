import { ClientModel } from '../../database/models/client.model';

export class ClientDestroyedEvent {
  constructor(public client: ClientModel) {}
}
