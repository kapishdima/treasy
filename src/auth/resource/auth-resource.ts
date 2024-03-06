import { Resource } from 'src/shared/http';

export class AuthResource extends Resource {
  public static toObject(accessToken: any) {
    return {
      accessToken,
    };
  }
}
