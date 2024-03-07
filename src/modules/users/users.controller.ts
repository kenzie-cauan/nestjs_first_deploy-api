import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(":userId")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async findOne(@Param("userId") userId: string): Promise<User> {
    return await this.usersService.findOne(userId);
  }

  @Patch(":userId")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async update(
    @Param("userId") userId: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return await this.usersService.update(userId, updateUserDto);
  }

  @HttpCode(204)
  @Delete(":userId")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async remove(@Param("userId") userId: string): Promise<void> {
    return await this.usersService.remove(userId);
  }
}
