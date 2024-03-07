import { Module } from "@nestjs/common";
import { PrismaService } from "src/database";
import { MusicsController } from "./musics.controller";
import { MusicsService } from "./musics.service";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [MusicsController],
  providers: [MusicsService, PrismaService],
})
export class MusicsModule {}
