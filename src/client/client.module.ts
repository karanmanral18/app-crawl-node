import { Module } from '@nestjs/common';
import { ClientController } from './controllers/client/client.controller';
import { ClientRepoService } from './client-repo/client-repo.service';

@Module({
  imports: [],
  providers: [ClientRepoService],
  controllers: [ClientController],
})
export class ClientModule {}
