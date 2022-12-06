import { ApiServiceParams, AuthParams, AuthResponse } from "./../types/auth.type";
import APP_CONFIG from "../app-config";
import request from "./request";

class AuthService {
  private baseUrl: string;

  constructor({ baseUrl }: ApiServiceParams) {
    this.baseUrl = baseUrl;
  }

  async signUp({ email, password }: AuthParams) {
    const url = `${this.baseUrl}/auth/signup`;
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    try {
      const result = await request<AuthResponse>(url, options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async singIn({ email, password }: AuthParams) {
    const url = `${this.baseUrl}/auth/signin`;
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    try {
      return await request<AuthResponse>(url, options);
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService({ baseUrl: APP_CONFIG.BASE_URL });
