import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConsentModule } from './consent/consent.module';
import { EventsModule } from './events/events.module';
import { User } from './users/user.entity';
import { ConsentRecord } from './consent/consent-record.entity';
import { PermissionEvent } from './events/permission-event.entity';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 60 }]),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH ?? 'casino.sqlite',
      entities: [User, ConsentRecord, PermissionEvent],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ConsentModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
