import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsentRecord } from './consent-record.entity';
import { CreateConsentDto } from './dto/create-consent.dto';

@Injectable()
export class ConsentService {
  constructor(
    @InjectRepository(ConsentRecord)
    private readonly consentRepository: Repository<ConsentRecord>,
  ) {}

  create(dto: CreateConsentDto, userId?: number): Promise<ConsentRecord> {
    const record = this.consentRepository.create({ ...dto, userId });
    return this.consentRepository.save(record);
  }

  findBySession(sessionId: string): Promise<ConsentRecord[]> {
    return this.consentRepository.find({
      where: { sessionId },
      order: { createdAt: 'ASC' },
    });
  }
}
