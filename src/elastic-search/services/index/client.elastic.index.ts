import { Inject, Injectable } from '@nestjs/common';
import { clientIndex } from '../constant/client.elastic';
import { SearchServiceInterface } from '../../../interfaces/search.service.interface';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientCreatedEvent } from '../../../client/events/client-created.event';
import { ClientDestroyedEvent } from '../../../client/events/client-destroyed.event ';
import { ClientUpdatedEvent } from '../../../client/events/client-updated.event';

@Injectable()
export class ClientElasticIndex {
  constructor(
    @Inject('SearchServiceInterface')
    private readonly searchService: SearchServiceInterface<any>,
  ) {}

  @OnEvent('client.created')
  public async insertClientDocument(event: ClientCreatedEvent): Promise<any> {
    const data = this.clientDocument(event.client);
    await this.searchService.insertIndex(data);
  }

  @OnEvent('client.updated')
  public async updateClientDocument(event: ClientUpdatedEvent): Promise<any> {
    const data = this.clientDocument(event.client);
    await this.deleteClientDocument(event);
    return await this.searchService.insertIndex(data);
  }

  @OnEvent('client.destroyed')
  private async deleteClientDocument(
    event: ClientDestroyedEvent,
  ): Promise<any> {
    const data = {
      index: clientIndex._index,
      id: event.client.id,
    };
    return await this.searchService.deleteDocument(data);
  }

  private bulkIndex(clientId: number): any {
    return {
      _index: clientIndex._index,
      _id: clientId,
    };
  }

  private clientDocument(client: any): any {
    const bulk = [];
    bulk.push({
      index: this.bulkIndex(client.id),
    });
    bulk.push(client);
    return {
      body: bulk,
      index: clientIndex._index,
    };
  }
}
