import { Request } from 'express';

export class Filters {
  constructor(readonly request: Request) {}

  public toJson() {
    const getters: Record<string, any> = {};
    const prototype = Object.getPrototypeOf(this);
    const propertyNames = Object.getOwnPropertyNames(prototype);

    propertyNames.forEach((propertyName) => {
      const descriptor = Object.getOwnPropertyDescriptor(
        prototype,
        propertyName,
      );

      if (descriptor && typeof descriptor.get === 'function') {
        getters[propertyName] = this[propertyName];
      }
    });

    return getters;
  }
}
