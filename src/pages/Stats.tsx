import { useState, useEffect } from "react";
import { PieChart, BarChart } from "../components/Charts";
import { useLocation } from "react-router-dom";
import { supabase } from "../client";

export default function Stats() {
  // const [slug, setSlug] = useState<string>();
  const [methodData, setMethodData] = useState<any>();
  const [barXAxis, setBarXAxis] = useState<string[]>([]);
  const [barValue, setBarValue] = useState<number[]>([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

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
    // setSlug();
    fetchMethodStats();
    fetchPathStats();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div className="p-6 m-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <PieChart data={methodData} />
      </div>
      <div className="p-6 m-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <BarChart xAxis={barXAxis} value={barValue} />
      </div>
    </div>
  );
}
