// src/App.jsx
import React, { useMemo, useState, useEffect } from 'react'
import {
  ResponsiveContainer,
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts'
import useWebSocket from './hooks/useWebSocket'

export default function App() {
  // 1) WebSocket 서버에서 로그를 받아옵니다
  const logs = useWebSocket('ws://localhost:4000')

  // 2) 최신 50개 로그 기준으로 타입별 개수 집계 (BarChart)
  const counts = useMemo(() => {
    const c = {}
    logs.slice(-50).forEach(l => {
      c[l.type] = (c[l.type] || 0) + 1
    })
    return Object.entries(c).map(([type, count]) => ({ type, count }))
  }, [logs])

  // 3) 시간(시:분)별 이벤트 개수 집계 (LineChart)
  const timeline = useMemo(() => {
    const bucket = {}
    logs.forEach(l => {
      const t = new Date(l.time)
        .toLocaleTimeString('en-GB', { hour12: false })
        .slice(0, 5)
      bucket[t] = (bucket[t] || 0) + 1
    })
    return Object.entries(bucket)
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .map(([time, value]) => ({ time, value }))
  }, [logs])

  // 4) 다크/라이트 테마 토글 로직
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')
  )
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="w-full h-screen bg-term-bg font-mono text-neon flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center border-b border-neon pb-2 mb-4">
        <h1 className="text-xl">Pollushield ™ by Sangwoo Hahn</h1>
        <button
          onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
          className="border-neon rounded-full w-8 h-4 relative"
          title="Toggle Dark/Light"
        >
          <span
            className={`absolute top-0.5 left-0.5 w-3 h-3 bg-neon-green rounded-full transform transition ${
              theme === 'dark' ? 'translate-x-4' : ''
            }`}
          />
        </button>
      </header>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Analytics Panel */}
        <section className="border-neon p-4 flex flex-col justify-between h-full">
          <h2 className="mb-2">ANALYTICS</h2>

          {/* Line Chart: 시간별 이벤트 수 */}
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={timeline}>
                <CartesianGrid stroke="#111" />
                <XAxis
                  dataKey="time"
                  stroke="#39FF14"
                  tick={{ fill: '#39FF14', fontFamily: '"Press Start 2P"', fontSize: 12 }}
                />
                <YAxis
                  stroke="#39FF14"
                  tick={{ fill: '#39FF14', fontFamily: '"Press Start 2P"', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#39FF14' }}
                  itemStyle={{ color: '#39FF14', fontFamily: '"Press Start 2P"' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#39FF14"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart: 타입별 이벤트 수 */}
          <div className="mt-2 flex-1">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={counts}>
                <CartesianGrid stroke="#111" />
                <XAxis
                  dataKey="type"
                  stroke="#39FF14"
                  tick={{ fill: '#39FF14', fontFamily: '"Press Start 2P"', fontSize: 12 }}
                />
                <YAxis
                  stroke="#39FF14"
                  tick={{ fill: '#39FF14', fontFamily: '"Press Start 2P"', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#39FF14' }}
                  itemStyle={{ color: '#39FF14', fontFamily: '"Press Start 2P"' }}
                />
                <Bar dataKey="count" fill="#39FF14" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Real-Time Log Panel */}
        <section className="border-neon p-4 flex flex-col">
          <h2 className="mb-2">REAL-TIME LOG</h2>
          <div className="overflow-auto flex-1 space-y-1">
            {logs.map((l, i) => (
              <div key={i} className="flex space-x-2 text-xs">
                <span className="w-12">
                  {new Date(l.time).toLocaleTimeString('en-GB').slice(0, 5)}
                </span>
                <span className="flex-1">{l.type}</span>
                <span className="flex-1">{l.ip}</span>
                <span className="flex-2 truncate">
                  {JSON.stringify(l.payload)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
