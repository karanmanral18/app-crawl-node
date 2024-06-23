import { ClientModel } from 'src/database/models/client.model';

export class ClientDestroyedEvent {
  constructor(public client: ClientModel) {}
}
