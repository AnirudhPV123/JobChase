"use client";

import { signIn, useSession } from "next-auth/react";
import React from "react";

const Home = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <p>Hi, {session.user?.name}</p>
      ) : (
        <>
          <p>You are not signed in</p>
          <button onClick={() => signIn("google")}>Sign in with google</button>
        </>
      )}
    </div>
  );
};

export default Home;
