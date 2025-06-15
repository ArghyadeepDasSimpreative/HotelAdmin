// AuthPage.jsx
import { useState } from "react";
import LeftCarousel from "./LeftCarousel";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <div className="border border-zinc-300 flex w-[70vw] h-[80vh] rounded-[30px] overflow-hidden max-md:flex-col max-md:w-full max-md:h-full">
        <div className="w-1/2 h-full max-md:hidden">
          <LeftCarousel />
        </div>
        <div className="w-1/2 p-10 flex flex-col justify-center max-md:w-full max-md:p-6">
          <h2 className="text-2xl font-semibold mb-6">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h2>
          {isSignUp ? <SignUp setIsSignUp={setIsSignUp} /> : <SignIn />}
          <p className="text-md mt-6 text-center text-zinc-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-1 text-black underline cursor-pointer"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
