import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { StatusesRepository } from './statuses.repository';

@Module({
  controllers: [StatusesController],
  providers: [StatusesService, StatusesRepository],
  exports: [StatusesService],
})
export class StatusesModule {}
