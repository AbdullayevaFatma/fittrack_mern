import { logoutRequest } from "../api/authApi";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      await logoutRequest();

      dispatch({
        type: "LOGOUT",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    logout,
  };
};
