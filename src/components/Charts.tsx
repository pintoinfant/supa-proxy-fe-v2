import React from "react";
import ReactEcharts from "echarts-for-react";

export function BarChart({
  xAxis,
  value,
}: {
  xAxis: string[];
  value: number[];
}) {
  return (
    <ReactEcharts
      option={{
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: xAxis,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Path",
            type: "bar",
            barWidth: "60%",
            data: value,
          },
        ],
      }}
    />
  );
}

export function PieChart({ data }: { data: any }) {
  return (
    <ReactEcharts
      option={{
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Most Used Methods",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: data,
          },
        ],
      }}
    />
  );
}
