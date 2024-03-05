import * as bcrypt from 'bcrypt';

export class Hash {
  public static async create(data: string) {
    return await bcrypt.hash(data, 10);
  }

  public static async checkHash(data: string, hash: string) {
    return await bcrypt.compare(data, hash);
  }
}
