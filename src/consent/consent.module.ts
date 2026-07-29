import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsentController } from './consent.controller';
import { ConsentRecord } from './consent-record.entity';
import { ConsentService } from './consent.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConsentRecord])],
  controllers: [ConsentController],
  providers: [ConsentService],
})
export class ConsentModule {}
