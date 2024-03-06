import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

import { Paginate as PaginateSchema } from '../../http';

export const Paginate = createParamDecorator(
  (_: any, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    return new PaginateSchema(request).toJson();
  },
);
