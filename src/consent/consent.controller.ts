import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConsentService } from './consent.service';
import { CreateConsentDto } from './dto/create-consent.dto';

@Controller('consent')
export class ConsentController {
  constructor(private readonly consentService: ConsentService) {}

  @Post()
  create(@Body() dto: CreateConsentDto) {
    return this.consentService.create(dto);
  }

  @Get(':sessionId')
  findBySession(@Param('sessionId') sessionId: string) {
    return this.consentService.findBySession(sessionId);
  }
}
