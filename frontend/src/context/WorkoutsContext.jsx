import { createContext, useReducer } from "react";

import {
  getWorkoutsRequest,
  createWorkoutRequest,
  deleteWorkoutRequest,
} from "../api/workoutApi";

import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";

export const WorkoutsContext = createContext();

const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "WORKOUT_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "SET_WORKOUTS":
      return {
        ...state,
        workouts: action.payload,
      };

    case "CREATE_WORKOUT":
      return {
        ...state,
        loading: false,
        workouts: [action.payload, ...state.workouts],
      };

    case "DELETE_WORKOUT":
      return {
        ...state,
        workouts: state.workouts.filter((w) => w._id !== action.payload),
      };

    case "WORKOUT_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: [],
    loading: false,
    error: null,
  });

  const { accessToken } = useAuthContext();

  // GET WORKOUTS

  const getWorkouts = async () => {
     if (!accessToken) return;
    try {
      const response = await getWorkoutsRequest();

      dispatch({
        type: "SET_WORKOUTS",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE WORKOUT

  const createWorkout = async (workout) => {
    dispatch({
      type: "WORKOUT_LOADING",
    });

    try {
      const response = await createWorkoutRequest(workout);

      dispatch({
        type: "CREATE_WORKOUT",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "WORKOUT_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  // DELETE WORKOUT

  const deleteWorkout = async (id) => {
    try {
      await deleteWorkoutRequest(id);

      dispatch({
        type: "DELETE_WORKOUT",
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getWorkouts();
    }
  }, [accessToken]);

  return (
    <WorkoutsContext.Provider
      value={{
        ...state,
        getWorkouts,
        createWorkout,
        deleteWorkout,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
};
