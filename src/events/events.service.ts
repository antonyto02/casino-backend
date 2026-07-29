import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEvent } from './permission-event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(PermissionEvent)
    private readonly eventsRepository: Repository<PermissionEvent>,
  ) {}

  create(dto: CreateEventDto, userId?: number): Promise<PermissionEvent> {
    const event = this.eventsRepository.create({ ...dto, userId });
    return this.eventsRepository.save(event);
  }

  async summary(sessionId: string) {
    const events = await this.eventsRepository.find({
      where: { sessionId },
      order: { createdAt: 'ASC' },
    });

    const grantedTypes = [
      ...new Set(
        events.filter((e) => e.status === 'granted').map((e) => e.type),
      ),
    ];
    const deniedTypes = [
      ...new Set(
        events.filter((e) => e.status === 'denied').map((e) => e.type),
      ),
    ];

    return {
      sessionId,
      totalEvents: events.length,
      grantedTypes,
      deniedTypes,
      events,
    };
  }
}
