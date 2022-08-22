import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Typography } from "@supabase/ui";

export default function Home() {
  const [userData, setUserData] = useState<any>();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  function toggle() {
    console.log("Button Clicked");
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
        <Modal
          closable
          title="This modal has a close button"
          description="Description of modal"
          visible={visible}
          onCancel={toggle}
          onConfirm={toggle}
        >
          <Typography.Text>This is the content of the Modal</Typography.Text>
        </Modal>
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
        <div className="flex">
          <Button onClick={handleLogout} className="mx-2">
            Logout
          </Button>
          <Button onClick={toggle} type="default" className="mx-2">
            Open modal
          </Button>
        </div>
      </div>
    </>
  );
}
