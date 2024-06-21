import { AutoIncrement, Column, PrimaryKey, Table } from 'sequelize-typescript';
import { DatesMapping } from './dates-mapping';

@Table({})
export class BaseModel<T> extends DatesMapping<T> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;
}
