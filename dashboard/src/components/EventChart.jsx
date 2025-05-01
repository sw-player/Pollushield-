import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function EventChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid stroke="#111" strokeDasharray="3 3" />
        <XAxis dataKey="type" stroke="#39FF14" tick={{ fill: '#39FF14', fontFamily: 'Press Start 2P' }}/>
        <YAxis stroke="#39FF14" tick={{ fill: '#39FF14', fontFamily: 'Press Start 2P' }}/>
        <Tooltip contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#39FF14', color: '#39FF14', fontFamily: 'Press Start 2P' }}/>
        <Bar dataKey="count" fill="#39FF14" />
      </BarChart>
    </ResponsiveContainer>
  )
}
