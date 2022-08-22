import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
import { Button } from "@supabase/ui";
import ModalView from "../components/ModalView";

export default function Home() {
  // const [user, setUser] = useState<any>();
  const [userData, setUserData] = useState<any>();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible(!visible);
  }

  const fetchData = async () => {
    let user = await supabase.auth.user()?.id;
    const { data } = await supabase.from("config").select("*").eq("uid", user);
    console.log(data);
    setUserData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col p-3">
        {userData &&
          userData.map((item: any) => {
            return (
              <div className="p-6 m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  {item.name}
                </h5>
                <p className="mb-3 font-normal text-gray-700">
                  {item.description}
                </p>
                <Button
                  onClick={() => {
                    navigate("/stats/" + item?.slug, { replace: true });
                  }}
                >
                  View More
                </Button>
              </div>
            );
          })}
        <Button onClick={handleLogout}>Logout</Button>
        {/* <Button onClick={toggle}>Add API</Button>
        <ModalView visible={visible} onCancel={toggle} onConfirm={toggle} /> */}
      </div>
    </>
  );
}
