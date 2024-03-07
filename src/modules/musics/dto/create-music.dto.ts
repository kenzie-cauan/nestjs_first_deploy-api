import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

// data tranfer object
export class CreateMusicDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  album: string;

  @IsString()
  @ApiProperty()
  genre: string;

  @IsString()
  @ApiProperty()
  author: string;
}
