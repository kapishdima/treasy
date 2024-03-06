import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User as UserResponse } from 'src/user/models/user';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserResponse => {
    const request = ctx.switchToHttp().getRequest();

    return request.user.id;
  },
);
