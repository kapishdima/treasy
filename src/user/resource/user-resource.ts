import { Resource } from 'src/shared/http';

export class UserResource extends Resource {
  public static toObject(user: any) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  public static toArray(users: any[]) {
    return users.map(this.toObject);
  }
}
