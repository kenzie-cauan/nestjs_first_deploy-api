import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateTokenDto } from "./dto/create-token.dto";
import { compare } from "bcryptjs";
import { SessionReturn } from "./auth.interface";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  public async login({
    email,
    password,
  }: CreateTokenDto): Promise<SessionReturn> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials!");
    }

    const hasSamePassword = await compare(password, user.password);
    if (!hasSamePassword) {
      throw new UnauthorizedException("Invalid credentials!");
    }

    return { token: this.jwtService.sign({ email }, { subject: user.id }) };
  }
}
