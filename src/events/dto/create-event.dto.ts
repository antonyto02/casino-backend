import { IsIn, IsString } from 'class-validator';
import type {
  PermissionStatus,
  PermissionType,
} from '../permission-event.entity';

export class CreateEventDto {
  @IsString()
  sessionId: string;

  @IsIn(['camera', 'microphone', 'geolocation', 'notifications'])
  type: PermissionType;

  @IsIn(['requested', 'granted', 'denied'])
  status: PermissionStatus;

  @IsString()
  context: string;
}
