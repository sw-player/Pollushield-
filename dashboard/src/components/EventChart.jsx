import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function EventChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="type"/>
        <YAxis/>
        <Tooltip/>
        <Bar dataKey="count" />
      </BarChart>
    </ResponsiveContainer>
  );
}
