import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-2xl">Login</h2>
      <div className="flex gap-1">
        <p>Don't have account?</p>{" "}
        <span className="hover:underline">
          <Link href={"/register"}>Register</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
