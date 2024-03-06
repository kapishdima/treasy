import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const Filters = createParamDecorator(
  (FiltersSchema: any, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    return new FiltersSchema(request).toJson();
  },
);
