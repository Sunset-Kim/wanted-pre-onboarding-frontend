import { createContext } from "react";

import { AuthParams, AuthResponse } from "../../types/auth.type";
import { CustomApiError } from "../../types/error.type";

export interface AuthState {
  data?: AuthResponse;
  isLoading: boolean;
  isError: boolean;
  error?: CustomApiError;
}

export interface AuthApi {
  signUp: (param: AuthParams) => void;
  signIn: (param: AuthParams) => void;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);
export const AuthApiContext = createContext<AuthApi | undefined>(undefined);
