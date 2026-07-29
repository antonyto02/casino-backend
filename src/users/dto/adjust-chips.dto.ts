import { IsInt } from 'class-validator';

export class AdjustChipsDto {
  @IsInt()
  delta: number;
}
