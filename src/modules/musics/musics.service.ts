import { Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { PrismaService } from "src/database/";
import { UsersService } from "../users/users.service";
import { CreateMusicDto } from "./dto/create-music.dto";
import { Music } from "./entities/music.entity";

@Injectable()
export class MusicsService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService
  ) {}

  public async create(payload: CreateMusicDto, userId: string): Promise<Music> {
    await this.userService.findUserById(userId);

    const musicData = { ...payload, userId };
    const { user, ...music } = Object.assign(new Music(), musicData);

    const newMusic = await this.prisma.music.create({
      data: music,
      include: { user: true },
    });

    return plainToInstance(Music, newMusic);
  }

  public async findAll(): Promise<Array<Music>> {
    const musics = await this.prisma.music.findMany({
      include: { user: true },
    });

    return plainToInstance(Music, musics);
  }

  public async findOne(musicId: string): Promise<Music> {
    const foundMusic = await this.prisma.music.findFirst({
      where: { id: musicId },
      include: { user: true },
    });

    if (!foundMusic) {
      throw new NotFoundException("Music not found!");
    }

    return plainToInstance(Music, foundMusic);
  }
}
