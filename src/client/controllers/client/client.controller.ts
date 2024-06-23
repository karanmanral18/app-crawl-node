import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ClientRepoService } from 'src/client/client-repo/client-repo.service';
import {
  ClientListingFilters,
  ClientModel,
} from 'src/database/models/client.model';
import { CreateClientDto } from 'src/dtos/createClientDto';
import { UpdateClientDto } from 'src/dtos/updateClientDto';
import { SequelizeToNotFoundInterceptor } from 'src/interceptors/not-found.interceptor';
import { MapToClientPipe } from 'src/pipes/map-to-client.pipe';
import { PaginationQueryToNumberPipe } from 'src/pipes/pagination-query-to-number.pipe';

@Controller('clients')
export class ClientController {
  constructor(private clientRepoService: ClientRepoService) {}

  @UseInterceptors(SequelizeToNotFoundInterceptor)
  @Get('')
  async index(
    @Query('perPage', PaginationQueryToNumberPipe) offset = 15,
    @Query('page', PaginationQueryToNumberPipe) page = 1,

    @Query() filters: ClientListingFilters = {},
  ) {
    return {
      clients: await this.clientRepoService.list(filters, { offset, page }),
    };
  }

  @UseInterceptors(SequelizeToNotFoundInterceptor)
  @Get(':clientId(\\d+)')
  async getClientById(@Param('clientId', MapToClientPipe) client: ClientModel) {
    return client;
  }

  @Post('')
  async createNewClient(
    @Body(new ValidationPipe()) createClientDto: CreateClientDto,
  ) {
    const client = this.clientRepoService.create(createClientDto);
    return client;
  }

  @UseInterceptors(SequelizeToNotFoundInterceptor)
  @Post(':clientId(\\d+)')
  async updateClient(
    @Body(new ValidationPipe()) updateClientDto: UpdateClientDto,
    @Param('clientId', MapToClientPipe) client: ClientModel,
  ) {
    return this.clientRepoService.update(updateClientDto, client);
  }

  @UseInterceptors(SequelizeToNotFoundInterceptor)
  @Delete(':clientId(\\d+)')
  async deleteClientById(
    @Param('clientId', MapToClientPipe) client: ClientModel,
  ): Promise<null> {
    return this.clientRepoService.delete(client);
  }
}
