import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@infra/modules/logger.module';
import { UserModule } from '@infra/modules/user.module';
import { PermissionModule } from './permission.module';
import { PrismaModule } from '@infra/modules/prisma.module';

const isTest = process.env.NODE_ENV === 'test';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: isTest ? '.env.test' : '.env',
    }),
    LoggerModule,
    PrismaModule,
    UserModule,
    PermissionModule,
  ],
})
export class AppModule {}
