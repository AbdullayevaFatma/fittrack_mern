import { useState } from "react";
import { Link } from "react-router-dom";


const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);
  };


  return (
    <div className="min-h-[80vh] flex items-center justify-center">


      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-md
          bg-surface
          border
          border-border
          rounded-card
          p-8
          shadow-card
          space-y-6
        "
      >


        <div className="text-center">

          <h3
            className="
              text-3xl
              font-bold
              text-text
            "
          >
            Create Account
          </h3>


          <p
            className="
              mt-2
              text-text-muted
            "
          >
            Start tracking your workouts today
          </p>


        </div>




        {/* Email */}

        <div className="space-y-2">

          <label className="text-sm text-text-muted">
            Email Address
          </label>


          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="example@email.com"

            className="
              w-full
              bg-background
              border
              border-border
              rounded-input
              px-4
              py-3
              text-text
              placeholder:text-text-muted
              focus:border-primary
              transition
            "
          />


        </div>




        {/* Password */}

        <div className="space-y-2">

          <label className="text-sm text-text-muted">
            Password
          </label>


          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="********"

            className="
              w-full
              bg-background
              border
              border-border
              rounded-input
              px-4
              py-3
              text-text
              placeholder:text-text-muted
              focus:border-primary
              transition
            "
          />


        </div>





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
          Sign Up
        </button>




        <p className="text-center text-sm text-text-muted">

          Already have an account?

          <Link
            to="/login"
            className="
              ml-2
              text-primary
              hover:text-primary-hover
              font-semibold
            "
          >
            Login
          </Link>

        </p>


      </form>


    </div>
  );
};


export default Signup;
