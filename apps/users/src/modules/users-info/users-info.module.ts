import { Module } from '@nestjs/common';
import { UsersInfoService } from './users-info.service';
import { UsersInfoController } from './users-info.controller';
import { UsersInfoRepository } from './users-info.repository';

@Module({
  controllers: [UsersInfoController],
  providers: [UsersInfoService, UsersInfoRepository],
  exports: [UsersInfoService],
})
export class UsersInfoModule {}
