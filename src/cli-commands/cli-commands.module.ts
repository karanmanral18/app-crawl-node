import { Module } from '@nestjs/common';
import { CrawlService } from './crawl/crawl.service';
import { CommandModule } from 'nestjs-command';
import { ClientRepoService } from '../client/client-repo/client-repo.service';

@Module({
  imports: [CommandModule],
  providers: [CrawlService, ClientRepoService],
})
export class CliCommandsModule {}
