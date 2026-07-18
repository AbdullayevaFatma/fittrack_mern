import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";


const Home = () => {


  const workouts = [
    {
      _id: "1",
      title: "Bench Press",
      load: 80,
      reps: 10,
      createdAt: new Date()
    },
    {
      _id: "2",
      title: "Squat",
      load: 100,
      reps: 8,
      createdAt: new Date()
    }
  ];


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

          {workouts.map((workout) => (

            <WorkoutDetails
              key={workout._id}
              workout={workout}
            />

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
