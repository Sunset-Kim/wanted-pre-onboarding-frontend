import { AuthResponse } from "../../types/auth.type";
import { CustomApiError } from "../../types/error.type";

export interface AuthActions {
  type: AuthActionsType;
  payload?: any;
}

export type AuthActionsType = "init" | "fetchStart" | "fetchEnd" | "fetchError" | "setData";

export const authInit: () => AuthActions = () => ({ type: "init" });
export const authStart: () => AuthActions = () => ({ type: "fetchStart" });
export const authSetData: (payload: AuthResponse) => AuthActions = (payload) => ({ type: "setData", payload });
export const authError: (payload?: CustomApiError) => AuthActions = (payload) => ({ type: "fetchError", payload });
export const authEnd: () => AuthActions = () => ({ type: "fetchEnd" });
