import { Injectable, PipeTransform } from '@nestjs/common';
import { ClientRepoService } from '../client/client-repo/client-repo.service';
import { ClientModel } from '../database/models/client.model';

@Injectable()
export class MapToClientPipe implements PipeTransform {
  constructor(private clientRepo: ClientRepoService) {}

  transform(value: number): Promise<ClientModel> {
    return this.clientRepo.findOrFail(value);
  }
}
