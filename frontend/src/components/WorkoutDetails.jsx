import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {

  const handleClick = async () => {
    console.log("delete workout");
  };


  return (
    <div
      className="
        group
        relative
        bg-surface
        border
        border-border
        rounded-card
        p-6
        shadow-card
        hover:border-primary
        transition-all
        duration-300
      "
    >

      {/* Delete Button */}
      <button
        onClick={handleClick}
        className="
          absolute
          top-5
          right-5
          text-danger
          hover:text-danger-hover
          hover:scale-110
          transition
        "
      >
        <span className="material-symbols-outlined">
          delete
        </span>
      </button>


      {/* Workout Title */}
      <h4
        className="
          text-xl
          font-bold
          text-text
          mb-5
          capitalize
        "
      >
        {workout.title}
      </h4>


      {/* Workout Info */}
      <div className="space-y-3">


        <div className="flex justify-between items-center">
          <span className="text-text-muted">
            Load
          </span>

          <span className="font-semibold text-primary">
            {workout.load} kg
          </span>
        </div>


        <div className="flex justify-between items-center">
          <span className="text-text-muted">
            Reps
          </span>

          <span className="font-semibold text-text">
            {workout.reps}
          </span>
        </div>


      </div>


      {/* Date */}
      <p
        className="
          mt-6
          pt-4
          border-t
          border-border
          text-sm
          text-text-muted
        "
      >
        {formatDistanceToNow(
          new Date(workout.createdAt),
          {
            addSuffix: true
          }
        )}
      </p>


    </div>
  );
};


export default WorkoutDetails;
