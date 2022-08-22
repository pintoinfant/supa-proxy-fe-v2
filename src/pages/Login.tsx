import React from "react";
import { Auth, Typography } from "@supabase/ui";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(() => {
    navigate("/home");
  })
  return (
    <div>
      <div className="container md:mx-auto flex items-center justify-center h-screen flex-col">
        <Auth.UserContextProvider supabaseClient={supabase}>
          <Typography.Title level={1} className="mb-0 text-center">
            Supa Proxy
          </Typography.Title>
          <Auth supabaseClient={supabase} />
        </Auth.UserContextProvider>
      </div>
    </div>
  );
}
