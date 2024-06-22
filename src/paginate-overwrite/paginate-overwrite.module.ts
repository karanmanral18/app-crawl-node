import { Global, Module } from '@nestjs/common';
import { PAGINATE_OPTIONS } from 'nestjs-sequelize-paginate/dist/lib/paginate.constans';
import { PaginateService } from 'nestjs-sequelize-paginate';
import { PaginateOverwriteService } from './paginate-overwrite.service';

@Global()
@Module({
  imports: [],
  providers: [
    PaginateOverwriteService,
    {
      provide: PAGINATE_OPTIONS,
      useValue: {},
    },
    {
      provide: PaginateService,
      useClass: PaginateOverwriteService,
    },
    PaginateOverwriteService,
  ],
  exports: [
    PaginateOverwriteService,
    {
      provide: PAGINATE_OPTIONS,
      useValue: {},
    },
    {
      provide: PaginateService,
      useClass: PaginateOverwriteService,
    },
  ],
})
export class PaginateOverwriteModule {}
