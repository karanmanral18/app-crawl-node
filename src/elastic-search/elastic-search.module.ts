import { Module } from '@nestjs/common';
import { SearchService } from './services/search/search.service';
import { ClientElasticIndex } from './services/index/client.elastic.index';

@Module({
  providers: [
    {
      provide: 'SearchServiceInterface',
      useClass: SearchService,
    },
    ClientElasticIndex,
  ],
  exports: [ClientElasticIndex],
})
export class ElasticSearchModule {}
