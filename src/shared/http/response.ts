import { CookieOptions, Response } from 'express';

export class ApiResource<TData = any> {
  private data: TData;
  private response: Response;

  constructor(data: TData, response?: Response) {
    this.data = data;
    this.response = response;
  }

  public toJson() {
    return {
      success: true,
      data: this.data,
    };
  }

  public sendCookie(key: string, options: CookieOptions) {
    return this.response.cookie(key, this.data, options);
  }

  public sendHttpOnlyCookie(key: string, options: CookieOptions = {}) {
    return this.response.cookie(key, this.data, { ...options, httpOnly: true });
  }
}
