import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateTokenDto } from "./dto/create-token.dto";
import { SessionReturn } from "./auth.interface";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Session")
@Controller("api")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(200)
  public async login(@Body() payload: CreateTokenDto): Promise<SessionReturn> {
    return this.authService.login(payload);
  }
}
