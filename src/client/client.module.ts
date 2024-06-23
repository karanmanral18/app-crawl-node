import { Module } from '@nestjs/common';
import { ClientController } from './controllers/client/client.controller';
import { ClientRepoService } from './client-repo/client-repo.service';
import { SearchService } from 'src/elastic-search/services/search/search.service';

@Module({
  imports: [],
  providers: [
    ClientRepoService,
    {
      provide: 'SearchServiceInterface',
      useClass: SearchService,
    },
  ],
  controllers: [ClientController],
})
export class ClientModule {}
