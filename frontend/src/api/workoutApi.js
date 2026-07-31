import api from "./axios";


// GET ALL WORKOUTS
export const getWorkoutsRequest = (accessToken) => {
  return api.get("/workouts", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};


// GET SINGLE WORKOUT
export const getWorkoutRequest = (
  id,
  accessToken
) => {
  return api.get(`/workouts/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};


// CREATE WORKOUT
export const createWorkoutRequest = (
  workout,
  accessToken
) => {
  return api.post(
    "/workouts",
    workout,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};


// UPDATE WORKOUT
export const updateWorkoutRequest = (
  id,
  workout,
  accessToken
) => {
  return api.patch(
    `/workouts/${id}`,
    workout,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};


// DELETE WORKOUT
export const deleteWorkoutRequest = (
  id,
  accessToken
) => {
  return api.delete(
    `/workouts/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};