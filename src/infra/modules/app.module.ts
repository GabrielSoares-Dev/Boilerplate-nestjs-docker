import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@infra/modules/logger.module';
import { HealthModule } from '@infra/modules/health.module';
import { AuthModule } from '@infra/modules/auth.module';
import { UserModule } from '@infra/modules/user.module';
import { PermissionModule } from '@infra/modules/permission.module';
import { RoleModule } from '@infra/modules/role.module';
import { PrismaModule } from '@infra/modules/prisma.module';
import { LoggerMiddleware } from '@infra/http/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    PrismaModule,
    HealthModule,
    AuthModule,
    UserModule,
    PermissionModule,
    RoleModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
