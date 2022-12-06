import { CustomApiError } from "../../types/error.type";
import { AuthState } from "./AuthContext";
import { AuthActions, AuthActionsType } from "./auth_actions";

export const authReducers: Record<AuthActionsType, (state: AuthState, action?: AuthActions) => AuthState> = {
  init: () => ({
    isLoading: false,
    isError: false,
  }),
  fetchStart: (state) => ({
    ...state,
    isLoading: true,
    isError: false,
    error: undefined,
  }),
  fetchEnd: (state) => ({
    ...state,
    isLoading: false,
  }),
  fetchError: (state, action) => {
    let error = undefined;
    console.log(action);
    if (action?.payload) {
      error = action.payload as CustomApiError;
    }
    return {
      ...state,
      isError: true,
      error,
      isLoading: false,
    };
  },
  setData: (state, action) => ({ ...state, data: action?.payload }),
};
