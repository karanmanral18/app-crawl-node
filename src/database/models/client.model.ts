import { Column, Table, Unique } from 'sequelize-typescript';
import { BaseModel } from './base.model';

@Table({ tableName: 'clients' })
export class ClientModel extends BaseModel<ClientModel> {
  @Column
  public name: string | null;

  @Unique
  @Column
  public cin: string;

  @Column
  public pin: string;
}
