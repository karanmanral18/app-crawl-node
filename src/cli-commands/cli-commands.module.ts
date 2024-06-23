import { Module } from '@nestjs/common';
import { CrawlService } from './crawl/crawl.service';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [CommandModule],
  providers: [CrawlService],
})
export class CliCommandsModule {}
