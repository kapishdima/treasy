import { Prisma } from '@prisma/client';

export type JwtPayload = {
  id: string;
};

export class UserJwtPayload {
  id: string;

  constructor(private readonly user: Prisma.UserGetPayload<any>) {
    this.id = user.id;
  }

  public toJson(): JwtPayload {
    return {
      id: this.id,
    };
  }
}
