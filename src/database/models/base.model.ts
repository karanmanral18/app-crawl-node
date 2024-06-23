import { AutoIncrement, Column, PrimaryKey, Table } from 'sequelize-typescript';
import { DatesMapping } from './dates-mapping';
import { EventRegisterCallbackService } from '../../common/event-register-callback/event-register-callback.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Table({})
export class BaseModel<T> extends DatesMapping<T> {
  static EventCallBackService: EventRegisterCallbackService;
  static EventEmitter: EventEmitter2;

  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;
}
