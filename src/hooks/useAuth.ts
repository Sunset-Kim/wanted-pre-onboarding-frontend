import { CustomApiError } from "./../types/error.type";
import { useEffect, useState } from "react";
import APP_CONFIG from "../app-config";
import AuthService from "../services/AuthService";
import { AuthParams, AuthResponse } from "../types/auth.type";
import LocalStorage from "../utils/localstorage";

export default function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<CustomApiError | undefined>();
  const [data, setData] = useState<AuthResponse | undefined>();

  useEffect(() => {
    const data = LocalStorage.getItem(APP_CONFIG.JWT_STORAGE_KEY);
    if (!data || typeof data !== "string") return;

    setData({
      access_token: data,
    });
  }, []);

  function init() {
    setIsLoading(false);
    setIsError(false);
    setError(undefined);
  }
  const signUp = async (params: AuthParams) => {
    init();

    try {
      setIsLoading(true);
      const result = await AuthService.signUp(params);
      setData({ ...result });
      LocalStorage.setItem(APP_CONFIG.JWT_STORAGE_KEY, result.access_token);
      setIsError(false);
    } catch (error) {
      if (error instanceof Response) {
        const apiError: CustomApiError = await error.json();
        setError(apiError);
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (params: AuthParams) => {
    init();

    try {
      setIsLoading(true);
      const result = await AuthService.singIn(params);
      setData({ ...result });
      LocalStorage.setItem(APP_CONFIG.JWT_STORAGE_KEY, result.access_token);
      setIsError(false);
    } catch (error) {
      if (error instanceof Response) {
        const apiError: CustomApiError = await error.json();
        setError(apiError);
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    error,
    data,
    signUp,
    signIn,
  };
}
