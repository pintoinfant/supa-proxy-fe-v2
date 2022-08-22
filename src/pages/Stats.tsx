import { useState, useEffect } from "react";
import { PieChart, BarChart } from "../components/Charts";
import { useLocation } from "react-router-dom";
import { supabase } from "../client";
import { Typography, Button } from "@supabase/ui";
import { useNavigate } from "react-router-dom";

export default function Stats() {
  // const [slug, setSlug] = useState<string>();
  const [methodData, setMethodData] = useState<any>();
  const [barXAxis, setBarXAxis] = useState<string[]>([]);
  const [barValue, setBarValue] = useState<number[]>([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>();
  const navigate = useNavigate();

  const fetchData = async () => {
    let slug = location.pathname.split("/")[2];
    const { data } = await supabase.from("config").select("*").eq("slug", slug);
    console.log(data);
    setUserData(data);
  };

  const fetchMethodStats = async () => {
    let slug = location.pathname.split("/")[2];
    console.log(slug);
    const { data } = await supabase.from("logs").select("*").eq("slug", slug);
    const methods = [...new Set(data?.map((item) => item.method))];
    const result = methods
      .map((method) => {
        return {
          name: method,
          value: data?.filter((item) => item.method === method).length,
        };
      })
      .sort((a: any, b: any) => b.value - a.value);
    setMethodData(result);
  };

  const fetchPathStats = async () => {
    let slug = location.pathname.split("/")[2];
    console.log(slug);
    const { data } = await supabase.from("logs").select("*").eq("slug", slug);
    const paths = [...new Set(data?.map((item) => item.path))];
    const result = paths
      .map((path) => {
        return {
          path,
          count: data?.filter((item) => item.path === path).length,
        };
      })
      .sort((a: any, b: any) => b.count - a.count);
    let xAxis: string[] = [];
    let yAxis: number[] = [];
    result.map((item) => {
      xAxis?.push(item.path);
      yAxis?.push(Number(item.count));
    });
    setBarXAxis(xAxis);

    setBarValue(yAxis);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    fetchMethodStats();
    fetchPathStats();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <Typography.Title level={1} className="my-5 text-center">
        Supa Proxy
      </Typography.Title>
      <div className="p-6 m-6 bg-white rounded-lg border border-gray-200 shadow-md">
        <div>
          {userData &&
            userData.map((item: any) => {
              {
                return (
                  <div>
                    <Typography.Title level={2} className="my-1">
                      {item.name}
                    </Typography.Title>
                    <Typography.Text className="my-1">
                      {item.description}
                    </Typography.Text>
                    {item.cache_required && (
                      <Typography.Text className="my-2 underline">
                        <br />
                        Caching the data for {item.cache_time_in_mins} minutes
                      </Typography.Text>
                    )}
                    <Typography.Text className="my-2 underline">
                      <br />
                      Rate limiting at {item.req_per_hour} requests per hour
                    </Typography.Text>
                  </div>
                );
              }
            })}
        </div>
      </div>
      <div className="p-6 m-6 bg-white rounded-lg border border-gray-200 shadow-md">
        <PieChart data={methodData} />
      </div>
      <div className="p-6 m-6 bg-white rounded-lg border border-gray-200 shadow-md">
        <BarChart xAxis={barXAxis} value={barValue} />
      </div>
      <div className="flex justify-center my-5">
        <Button
          className="flex"
          onClick={() => {
            navigate("/home");
          }}
        >
          Home
        </Button>
      </div>
    </div>
  );
}
