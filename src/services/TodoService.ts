import { ApiServiceParams, AuthParams, AuthResponse } from "./../types/auth.type";
import APP_CONFIG from "../app-config";
import request from "./request";
import { AddTodoParams, DeleteTodoParams, ITodo, UpdateTodoParams } from "../types/todo.type";

class TodoService {
  private baseUrl: string;
  private _token: string | undefined;

  constructor({ baseUrl }: ApiServiceParams) {
    this.baseUrl = baseUrl;
  }

  set token(value: string) {
    this._token = value;
  }

  async addTodo({ todo }: AddTodoParams) {
    const url = `${this.baseUrl}/todos`;
    const options: RequestInit = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }),
    };

    try {
      const result = await request<ITodo>(url, options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getTodos() {
    const url = `${this.baseUrl}/todos`;
    const options: RequestInit = {
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    };

    try {
      const result = await request<ITodo[]>(url, options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateTodo({ todo, id, isCompleted }: UpdateTodoParams) {
    const url = `${this.baseUrl}/todos/${id}`;
    const options: RequestInit = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo, isCompleted }),
    };

    try {
      const result = await request<ITodo>(url, options);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteTodo({ id }: DeleteTodoParams) {
    const url = `${this.baseUrl}/todos/${id}`;
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    };

    try {
      const result = await request<void>(url, options);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new TodoService({ baseUrl: APP_CONFIG.BASE_URL });
