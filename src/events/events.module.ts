import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { PermissionEvent } from './permission-event.entity';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEvent])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
