"use client";

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899", "#14b8a6"];

export interface ChartData {
  title: string;
  type: "bar" | "line" | "pie" | "area";
  data: Record<string, unknown>[];
}

interface Props {
  charts: ChartData[];
}

function ChartRenderer({ chart }: { chart: ChartData }) {
  const { type, data } = chart;

  if (!data || data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={280}>
      {type === "bar" ? (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={12} angle={-20} textAnchor="end" height={60} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      ) : type === "line" ? (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={12} angle={-20} textAnchor="end" height={60} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      ) : type === "pie" ? (
        <PieChart>
          <Tooltip />
          <Legend />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      ) : (
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={12} angle={-20} textAnchor="end" height={60} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
}

export default function ChartPanel({ charts }: Props) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">📈 데이터 시각화</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {charts.map((chart, i) => (
          <div key={i} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-medium text-gray-700 mb-3">{chart.title}</h3>
            <ChartRenderer chart={chart} />
          </div>
        ))}
      </div>
    </div>
  );
}
