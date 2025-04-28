import React, { useMemo } from 'react';
import useWebSocket from './hooks/useWebSocket';
import LogTable     from './components/LogTable';
import EventChart   from './components/EventChart';

export default function App() {
  const logs = useWebSocket('ws://localhost:4000'); // 백엔드 WS 엔드포인트

  // 공격 유형별 개수 집계
  const chartData = useMemo(() => {
    const counts = {};
    logs.forEach(({ type }) => counts[type] = (counts[type] || 0) + 1);
    return Object.entries(counts).map(([type, count]) => ({ type, count }));
  }, [logs]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">PolluShield 실시간 모니터링</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-xl mb-2">공격 유형 통계</h2>
          <EventChart data={chartData}/>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-xl mb-2">최근 탐지 로그</h2>
          <LogTable logs={logs}/>
        </div>
      </div>
    </div>
  );
}
