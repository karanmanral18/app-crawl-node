/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  ClientListingFilters,
  ClientModel,
} from '../../database/models/client.model';
import { Op, Transaction } from 'sequelize';
import { PaginateOptions, PaginateService } from 'nestjs-sequelize-paginate';
import { SequelizePagination } from '../../interfaces/sequelize-pagination.interface';

@Injectable()
export class ClientRepoService {
  constructor(
    @InjectModel(ClientModel) public clientModel: typeof ClientModel,
    public paginationService: PaginateService,
  ) {}

  /**
   * Finds the client or fails
   * @param id
   * @param transaction
   */
  public findOrFail(
    id: number,
    transaction?: Transaction,
  ): Promise<ClientModel> {
    return this.clientModel.findByPk(id, { transaction, rejectOnEmpty: true });
  }

  /**
   * Creates new client
   * @param client
   * @param transaction
   * @private
   */
  public async create(
    client: Pick<ClientModel, 'name' | 'cin' | 'pin' | 'email'>,
  ): Promise<ClientModel> {
    const { cin, email } = client;

    const existingClient = await this.clientModel.findOne({
      where: { [Op.or]: [{ email }, { cin }] },
    });

    if (existingClient) {
      const duplicateField = existingClient.email === email ? 'email' : 'cin';
      throw new ConflictException(
        `A client with the provided ${duplicateField} already exists.`,
      );
    }

    return this.clientModel.build().setAttributes(client).save();
  }

  /**
   * Removes the client
   * @param client
   * @param transaction
   */
  public async delete(client: ClientModel, transaction?: Transaction) {
    return client.destroy({ transaction }).then(() => null);
  }

  /**
   * list the clients with pagination
   * @param filters
   * @param paginationOptions
   * @param order
   * @param transaction
   */
  public list(
    filters: ClientListingFilters = {},
    paginationOptions: PaginateOptions = { offset: 15, page: 1 },
    transaction?: Transaction,
  ): Promise<SequelizePagination<ClientModel>> {
    paginationOptions.model = this.clientModel.scope([
      'defaultScope',
      { method: ['filterListing', filters] },
    ]);
    return this.paginationService.findAllPaginate(paginationOptions, {
      transaction,
    });
  }

  /**
   * Updates client's information
   * @param cliente
   * @param transaction
   */
  public async update(
    newClient: Pick<ClientModel, 'name' | 'cin' | 'pin' | 'email'>,
    client: ClientModel,
    transaction?: Transaction,
  ): Promise<ClientModel> {
    const { cin, email } = newClient;

    const existingClient = await this.clientModel.findAll({
      where: { [Op.or]: [{ email }, { cin }] },
    });
    if (existingClient && existingClient.length > 1) {
      throw new ConflictException(
        `A client with the provided cin or email already exists.`,
      );
    }

    return client.update(newClient);
  }
}
