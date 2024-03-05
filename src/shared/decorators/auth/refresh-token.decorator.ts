import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { REFRESH_TOKEN_COOKIE_NAME } from 'src/shared/constants';

export const RefreshToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.cookies[REFRESH_TOKEN_COOKIE_NAME];
  },
);
