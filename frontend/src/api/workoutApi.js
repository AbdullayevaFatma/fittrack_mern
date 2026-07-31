import api from "./axios";

// GET ALL WORKOUTS
export const getWorkoutsRequest = () => {
  return api.get("/workouts");
};

// GET SINGLE WORKOUT
export const getWorkoutRequest = (id) => {
  return api.get(`/workouts/${id}`);
};

// CREATE WORKOUT
export const createWorkoutRequest = (workout) => {
  return api.post("/workouts", workout);
};

// UPDATE WORKOUT
export const updateWorkoutRequest = (id, workout) => {
  return api.patch(`/workouts/${id}`, workout);
};

// DELETE WORKOUT
export const deleteWorkoutRequest = (id) => {
  return api.delete(`/workouts/${id}`);
};
