import { Exclude, Type } from "class-transformer";
import { User } from "src/modules/users/entities/user.entity";
import { BaseEntity } from "src/modules/utils";

export class Music extends BaseEntity {
  name: string;
  album: string;
  genre: string;
  author: string;

  @Exclude()
  userId: string;

  @Type(() => User)
  user: User;
}
