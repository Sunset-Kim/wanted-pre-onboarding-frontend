import { PropsWithChildren, useEffect, useReducer } from "react";
import APP_CONFIG from "../../app-config";
import AuthService from "../../services/AuthService";
import { AuthParams } from "../../types/auth.type";
import { CustomApiError } from "../../types/error.type";
import LocalStorage from "../../utils/localstorage";
import { AuthApiContext, AuthContext, AuthState } from "./AuthContext";
import { AuthActions, authEnd, authError, authInit, authSetData, authStart } from "./auth_actions";
import { authReducers } from "./auth_reducer";

const { JWT_STORAGE_KEY } = APP_CONFIG;

const reducer = (state: AuthState = initState, actions: AuthActions): AuthState => {
  const { type } = actions;
  return authReducers[type](state, actions);
};

const initState: AuthState = {
  isLoading: false,
  isError: false,
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const signUp = async (params: AuthParams) => {
    try {
      dispatch(authInit());
      dispatch(authStart());
      const result = await AuthService.signUp(params);
      dispatch(authSetData(result));
      LocalStorage.setItem(JWT_STORAGE_KEY, result.access_token);
    } catch (error) {
      if (error instanceof Response) {
        const apiError: CustomApiError = await error.json();
        dispatch(authError(apiError));
      } else {
        dispatch(authError());
      }
    } finally {
      dispatch(authEnd());
    }
  };

  const signIn = async (params: AuthParams) => {
    try {
      dispatch(authInit());
      dispatch(authStart());
      const result = await AuthService.singIn(params);
      dispatch(authSetData(result));
      LocalStorage.setItem(JWT_STORAGE_KEY, result.access_token);
    } catch (error) {
      if (error instanceof Response) {
        const apiError: CustomApiError = await error.json();
        dispatch(authError(apiError));
      } else {
        dispatch(authError());
      }
    } finally {
      dispatch(authEnd());
    }
  };

  useEffect(() => {
    const data = LocalStorage.getItem(JWT_STORAGE_KEY);

    if (!data || typeof data !== "string") {
      LocalStorage.removeItem(JWT_STORAGE_KEY);

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
