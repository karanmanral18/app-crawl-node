import { Column, Table, Unique, Scopes } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Op, FindOptions } from 'sequelize';

export interface ClientListingFilters {
  id?: number;
  email?: string;
  cin?: string;
  name?: string;
}

@Scopes(() => ({
  filterListing: (filters: ClientListingFilters = {}) => {
    const filterQuery: FindOptions<ClientModel> = {};

    // Iterate through each filter property
    for (const key in filters) {
      if (
        filters.hasOwnProperty(key) &&
        filters[key] !== undefined &&
        filters[key] !== null
      ) {
        const value = filters[key];

        switch (key) {
          case 'id':
            filterQuery.where = {
              ...(filterQuery.where || {}),
              id: value,
            };
            break;
          case 'email':
            filterQuery.where = {
              ...(filterQuery.where || {}),
              email: {
                [Op.like]: `%${value}%`,
              },
            };
            break;
          case 'cin':
            filterQuery.where = {
              ...(filterQuery.where || {}),
              cin: value,
            };
            break;
          case 'name':
            filterQuery.where = {
              ...(filterQuery.where || {}),
              name: {
                [Op.like]: `%${value}%`,
              },
            };
            break;
          default:
            break;
        }
      }
    }
    return filterQuery;
  },
}))
@Table({ tableName: 'clients' })
export class ClientModel extends BaseModel<ClientModel> {
  @Column
  public name: string | null;

  @Unique
  @Column
  public cin: string;

  @Column
  public pin: string;

  @Unique
  @Column
  public email: string;
}
