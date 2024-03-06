import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

import { Sort as SortSchema } from '../../http';

export const Sort = createParamDecorator((_: any, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest();

  return new SortSchema(request).toJson();
});
