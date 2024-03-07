import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateMusicDto } from "./dto/create-music.dto";
import { MusicsService } from "./musics.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Music } from "./entities/music.entity";

@ApiTags("Music")
@Controller("api/musics")
export class MusicsController {
  constructor(private musicsService: MusicsService) {}

  @Post("")
  @HttpCode(201)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async create(
    @Body() createMusicDTO: CreateMusicDto,
    @Request() req
  ): Promise<Music> {
    return this.musicsService.create(createMusicDTO, req.user.id);
  }

  @Get(":musicId")
  public async cfindOne(@Param("musicId") musicId: string): Promise<Music> {
    return this.musicsService.findOne(musicId);
  }

  @Get("")
  public async cfindAll(): Promise<Array<Music>> {
    return this.musicsService.findAll();
  }
}
