import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ClientRepoService } from '../../../client/client-repo/client-repo.service';
import {
  ClientListingFilters,
  ClientModel,
} from '../../../database/models/client.model';
import { CreateClientDto } from '../../../dtos/createClientDto';
import { UpdateClientDto } from '../../../dtos/updateClientDto';
import { SequelizeToNotFoundInterceptor } from '../../../interceptors/not-found.interceptor';
import { MapToClientPipe } from '../../../pipes/map-to-client.pipe';
import { PaginationQueryToNumberPipe } from '../../../pipes/pagination-query-to-number.pipe';
import { SearchServiceInterface } from '../../../interfaces/search.service.interface';
import { ClientSearchObject } from '../../../client/client.search.object';

@Controller('clients')
export class ClientController {
  constructor(
    private clientRepoService: ClientRepoService,
    @Inject('SearchServiceInterface')
    private readonly searchService: SearchServiceInterface<any>,
  ) {}

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

  @Get('elastic/search')
  async searchClients(
    @Query('perPage', PaginationQueryToNumberPipe) offset = 15,
    @Query('page', PaginationQueryToNumberPipe) page = 1,

    @Query() filters: ClientListingFilters = {},
  ) {
    const data = ClientSearchObject.searchObject(filters);
    return await this.searchService.searchIndex(data);
  }
}
