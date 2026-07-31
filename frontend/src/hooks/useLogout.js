import { logoutRequest } from "../api/authApi";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    await logoutRequest();

    dispatch({
      type: "LOGOUT",
    });
  };

  return {
    logout,
  };
};
