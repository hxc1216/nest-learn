import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FeishuController } from './feishu/feishu.controller';
import { FeishuService } from './feishu/feishu.service';
import { UserProviders } from './user.providers';
import { DatabaseModule } from '@/common/database/database.module';

@Module({
  controllers: [UserController, FeishuController],
  providers: [UserService, FeishuService, ...UserProviders],
  imports: [DatabaseModule],
})
export class UserModule {}
