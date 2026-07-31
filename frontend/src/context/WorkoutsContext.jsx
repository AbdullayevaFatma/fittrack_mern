import { createContext, useReducer } from "react";

import {
  getWorkoutsRequest,
  createWorkoutRequest,
  deleteWorkoutRequest,
} from "../api/workoutApi";

import { useAuthContext } from "../hooks/useAuthContext";

export const WorkoutsContext = createContext();

const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };

    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...(state.workouts || [])],
      };

    case "DELETE_WORKOUT":
      return {
        workouts: (state.workouts || []).filter(
          (w) => w._id !== action.payload,
        ),
      };

    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: [],
  });

  const { accessToken } = useAuthContext();

  const getWorkouts = async () => {
    if (!accessToken) return;

    const response = await getWorkoutsRequest(accessToken);

    dispatch({
      type: "SET_WORKOUTS",
      payload: response.data,
    });
  };

  const createWorkout = async (workout) => {
    const response = await createWorkoutRequest(workout, accessToken);

    dispatch({
      type: "CREATE_WORKOUT",
      payload: response.data,
    });
  };

  const deleteWorkout = async (id) => {
    await deleteWorkoutRequest(id, accessToken);

    dispatch({
      type: "DELETE_WORKOUT",
      payload: id,
    });
  };

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
