import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class CrawlService {
  constructor(private readonly moduleRef: ModuleRef) {}
  @Command({
    command: 'crawl:clients',
    describe: 'Crawl companies data',
  })
  public async run() {
    
  }
}
