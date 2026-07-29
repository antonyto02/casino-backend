import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdjustChipsDto } from './dto/adjust-chips.dto';
import { UsersService } from './users.service';

interface AuthenticatedRequest {
  user: { userId: number; username: string };
}

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async me(@Request() req: AuthenticatedRequest) {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return { id: user.id, username: user.username, chips: user.chips };
  }

  @Post('me/chips/adjust')
  async adjustChips(
    @Request() req: AuthenticatedRequest,
    @Body() dto: AdjustChipsDto,
  ) {
    const user = await this.usersService.adjustChips(
      req.user.userId,
      dto.delta,
    );
    return { chips: user.chips };
  }
}
