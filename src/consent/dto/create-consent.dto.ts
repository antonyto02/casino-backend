import { IsBoolean, IsIn, IsString } from 'class-validator';
import type { ConsentCategory } from '../consent-record.entity';

export class CreateConsentDto {
  @IsString()
  sessionId: string;

  @IsIn(['necessary', 'analytics', 'marketing'])
  category: ConsentCategory;

  @IsBoolean()
  accepted: boolean;
}
