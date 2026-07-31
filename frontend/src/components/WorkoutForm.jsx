import { useState } from "react";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      title,
      load,
      reps,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-surface
        border
        border-border
        rounded-card
        p-6
        shadow-card
        space-y-5
      "
    >
      <h3
        className="
          text-2xl
          font-bold
          text-text
        "
      >
        Add New Workout
      </h3>

      {/* Exercise Title */}
      <div className="space-y-2">
        <label
          className="
            text-sm
            text-text-muted
          "
        >
          Exercise Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Example: Bench Press"
          className="
            w-full
            bg-background
            border
            border-border
            rounded-input
            px-4
            py-3
            placeholder:text-text-muted
            focus:border-primary
            focus:ring-2
          focus:ring-primary/20
             focus:outline-none
            transition
          "
        />
      </div>

      {/* Load */}
      <div className="space-y-2">
        <label
          className="
            text-sm
            text-text-muted
          "
        >
          Load (kg)
        </label>
        <div className="relative">
          <input
            type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            placeholder="80"
            className="
            w-full
            bg-background
            border
            border-border
            rounded-input
            px-4
            py-3
            pr-12
            text-text
            placeholder:text-text-muted
            focus:outline-none
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
            transition
            [appearance:textfield]
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
            "
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
            <button
              type="button"
              onClick={() => setLoad((prev) => Number(prev || 0) + 5)}
              className="
              h-5
              w-7
              rounded-md
              bg-card
              text-text-muted
              hover:bg-primary
              hover:text-white
              transition
              text-xs
              "
            >
              ▲
            </button>

            <button
              type="button"
              onClick={() => setLoad((prev) => Number(prev || 0) - 5)}
              className="
              h-5
              w-7
              rounded-md
              bg-card
              text-text-muted
              hover:bg-primary
              hover:text-white
              transition
              text-xs
            "
            >
              ▼
            </button>
          </div>
        </div>
      </div>

      {/* Reps */}

      <div className="space-y-2">
        <label
          className="
            text-sm
            text-text-muted
          "
        >
          Reps
        </label>

        <div className="relative">
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="10"
            className="
             w-full
            bg-background
            border
            border-border
            rounded-input
            px-4
            py-3
            pr-12
            text-text
            placeholder:text-text-muted
            focus:outline-none
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
            transition
            [appearance:textfield]
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
          "
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
            <button
              type="button"
              onClick={() => setReps((prev) => Number(prev || 0) + 1)}
              className="
              h-5
              w-7
              rounded-md
              bg-card
              text-text-muted
              hover:bg-primary
              hover:text-white
              transition
              text-xs
              "
            >
              ▲
            </button>

            <button
              type="button"
              onClick={() => setReps((prev) => Number(prev || 0) - 1)}
              className="
              h-5
              w-7
              rounded-md
              bg-card
              text-text-muted
              hover:bg-primary
              hover:text-white
              transition
              text-xs
            "
            >
              ▼
            </button>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        className="
          w-full
          bg-primary
          text-black
          font-bold
          py-3
          rounded-button
          hover:bg-primary-hover
          hover:scale-[1.02]
          transition
        "
      >
        Add Workout
      </button>
    </form>
  );
};

export default WorkoutForm;
