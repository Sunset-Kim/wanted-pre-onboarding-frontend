import { createContext, PropsWithChildren, useEffect, useReducer } from "react";
import APP_CONFIG from "../app-config";
import AuthService from "../services/AuthService";
import { AuthParams, AuthResponse } from "../types/auth.type";
import { CustomApiError } from "../types/error.type";
import LocalStorage from "../utils/localstorage";

interface AuthState {
  data?: AuthResponse;
  isLoading: boolean;
  isError: boolean;
  error?: CustomApiError;
}
type AuthActionsType = "init" | "fetchStart" | "fetchEnd" | "fetchError" | "setData";

interface AuthActions {
  type: AuthActionsType;
  payload?: any;
}

interface AuthApi {
  signUp: (param: AuthParams) => void;
  signIn: (param: AuthParams) => void;
}

const initState: AuthState = {
  isLoading: false,
  isError: false,
};

export const AuthContext = createContext<AuthState | undefined>(undefined);
export const AuthApiContext = createContext<AuthApi | undefined>(undefined);

const authReducers: Record<AuthActionsType, (state: AuthState, action?: AuthActions) => AuthState> = {
  init: () => initState,
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

const reducer = (state: AuthState = initState, actions: AuthActions): AuthState => {
  const { type } = actions;
  return authReducers[type](state, actions);
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const signUp = async (params: AuthParams) => {
    try {
      dispatch({ type: "init" });
      dispatch({
        type: "fetchStart",
      });
      const result = await AuthService.signUp(params);
      dispatch({
        type: "setData",
        payload: result,
      });
      LocalStorage.setItem(APP_CONFIG.JWT_STORAGE_KEY, result.access_token);
    } catch (error) {
      if (error instanceof Response) {
        const apiError: CustomApiError = await error.json();
        dispatch({ type: "fetchError", payload: apiError });
      }

      dispatch({ type: "fetchError" });
    } finally {
      dispatch({ type: "fetchEnd" });
    }
  };

  const signIn = async (params: AuthParams) => {
    try {
      dispatch({ type: "init" });
      dispatch({
        type: "fetchStart",
      });
      const result = await AuthService.singIn(params);
      dispatch({
        type: "setData",
        payload: result,
      });
      LocalStorage.setItem(APP_CONFIG.JWT_STORAGE_KEY, result.access_token);
    } catch (error) {
      if (error instanceof Response) {
        const apiError: CustomApiError = await error.json();
        dispatch({ type: "fetchError", payload: apiError });
      }

      dispatch({ type: "fetchError" });
    } finally {
      dispatch({ type: "fetchEnd" });
    }
  };

  useEffect(() => {
    const data = LocalStorage.getItem(APP_CONFIG.JWT_STORAGE_KEY);

    if (!data || typeof data !== "string") {
      LocalStorage.removeItem(APP_CONFIG.JWT_STORAGE_KEY);

      dispatch({
        type: "init",
      });
      return;
    }

    dispatch({
      type: "setData",
      payload: {
        access_token: data,
      },
    });
  }, []);

  const api = {
    signIn,
    signUp,
  };

  return (
    <AuthContext.Provider value={state}>
      <AuthApiContext.Provider value={api}>{children}</AuthApiContext.Provider>
    </AuthContext.Provider>
  );
};
