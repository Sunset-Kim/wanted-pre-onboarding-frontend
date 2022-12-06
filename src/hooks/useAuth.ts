import { useContext } from "react";
import { AuthApiContext, AuthContext } from "../contexts/AuthContext";

export default function useAuth() {
  const stateCtx = useContext(AuthContext);
  const apiCtx = useContext(AuthApiContext);

  if (!stateCtx || !apiCtx) {
    throw new Error("useAuth must be used within the AuthProvider");
  }

  return {
    ...stateCtx,
    ...apiCtx,
  };
}
