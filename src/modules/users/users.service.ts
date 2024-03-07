import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { PrismaService } from "src/database";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  public async isUniqueEmail(email: string): Promise<void> {
    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (foundUser) {
      throw new ConflictException("E-mail already exists!");
    }
  }

  public async findUserById(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found!");
    }

    return user;
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  public async create(payload: CreateUserDto): Promise<User> {
    await this.isUniqueEmail(payload.email);

    const user = await this.prisma.user.create({
      data: Object.assign(new User(), payload),
    });

    return plainToInstance(User, user);
  }

  public async findAll(): Promise<Array<User>> {
    return plainToInstance(User, await this.prisma.user.findMany());
  }

  public async findOne(userId: string): Promise<User> {
    return plainToInstance(User, this.findUserById(userId));
  }

  public async update(userId: string, payload: UpdateUserDto): Promise<User> {
    await this.findUserById(userId);
    if (payload.email) {
      await this.isUniqueEmail(payload.email);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: payload,
    });

    return plainToInstance(User, updatedUser);
  }

  public async remove(userId: string): Promise<void> {
    await this.findUserById(userId);
    await this.prisma.user.delete({ where: { id: userId } });
  }
}
