import { createContext, useEffect, useReducer } from "react";
import { refreshRequest } from "../api/authApi";
import { setAccessToken, clearAccessToken } from "../utils/tokenStore";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      setAccessToken(action.payload.accessToken);
      return {
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        loading: false,
      };

    case "LOGOUT":
      clearAccessToken();
      return {
        user: null,
        accessToken: null,
        loading: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };

    case "AUTH_READY":
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    accessToken: null,
    loading: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await refreshRequest();

        dispatch({
          type: "LOGIN",
          payload: {
            user: {
              email: response.data.email,
            },
            accessToken: response.data.accessToken,
          },
        });
      } catch (error) {
        dispatch({
          type: "AUTH_READY",
        });
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
