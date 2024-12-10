"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Assets: 120000, Liabilities: 80000, NetWorth: 40000 },
  { name: 'Feb', Assets: 132000, Liabilities: 82000, NetWorth: 50000 },
  { name: 'Mar', Assets: 101000, Liabilities: 91000, NetWorth: 10000 },
  { name: 'Apr', Assets: 134000, Liabilities: 84000, NetWorth: 50000 },
  { name: 'May', Assets: 90000, Liabilities: 70000, NetWorth: 20000 },
  { name: 'Jun', Assets: 230000, Liabilities: 110000, NetWorth: 120000 },
  { name: 'Jul', Assets: 210000, Liabilities: 120000, NetWorth: 90000 },
];

const formatYAxis = (value: number) => {
  return `$${value.toLocaleString()}`;
};

export default function NetWorthChart() {
  console.log("NetWorthChart is rendering");
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
          <Legend />
          <Line type="monotone" dataKey="Assets" stroke="#8884d8" />
          <Line type="monotone" dataKey="Liabilities" stroke="#82ca9d" />
          <Line type="monotone" dataKey="NetWorth" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

