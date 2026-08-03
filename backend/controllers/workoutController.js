const Workout = require("../models/Workout");
const mongoose = require("mongoose");
const asyncHandler = require("../middleware/asyncHandler");
const createError = require("../utils/createError");

const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find({
    user: req.user._id,
  }).sort({
    createdAt: -1,
  });

  res.status(200).json(workouts);
});

const getWorkout = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError("No such workout", 404);
  }

  const workout = await Workout.findOne({
    _id: id,
    user: req.user._id,
  });

  if (!workout) {
    throw createError("No such workout", 404);
  }

  res.status(200).json(workout);
});

const createWorkout = asyncHandler(async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!title) emptyFields.push("title");

  if (!load) emptyFields.push("load");

  if (!reps) emptyFields.push("reps");

  if (emptyFields.length > 0) {
    const error = createError("Please fill in all the fields", 400);

    error.emptyFields = emptyFields;

    throw error;
  }

  const workout = await Workout.create({
    title,

    load,

    reps,

    user: req.user._id,
  });

  res.status(201).json(workout);
});

const updateWorkout = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError("No such workout", 404);
  }

  const workout = await Workout.findOneAndUpdate(
    {
      _id: id,
      user: req.user._id,
    },

    req.body,

    {
      new: true,
      runValidators: true,
    },
  );

  if (!workout) {
    throw createError("No such workout", 404);
  }

  res.status(200).json(workout);
});

const deleteWorkout = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createError("No such workout", 404);
  }

  const workout = await Workout.findOneAndDelete({
    _id: id,

    user: req.user._id,
  });

  if (!workout) {
    throw createError("No such workout", 404);
  }

  res.status(200).json(workout);
});

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
