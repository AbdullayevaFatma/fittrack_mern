import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts } = useWorkoutsContext();

 

  return (
    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-[1fr_380px]
        gap-8
        items-start
      "
    >
      {/* Left Side - Workouts */}

      <section>
        <div className="mb-8">
          <h2
            className="
              text-3xl
              font-bold
              text-text
            "
          >
            Your Workouts
          </h2>

          <p
            className="
              mt-2
              text-text-muted
            "
          >
            Track your progress and keep getting stronger 💪
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>
      </section>

      {/* Right Side - Form */}

      <aside
        className="
          lg:sticky
          lg:top-28
        "
      >
        <WorkoutForm />
      </aside>
    </div>
  );
};

export default Home;
