import React from 'react';

export default function LogTable({ logs }) {
  return (
    <div className="overflow-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">시간</th>
            <th className="px-4 py-2">IP</th>
            <th className="px-4 py-2">유형</th>
            <th className="px-4 py-2">페이로드</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i} className="even:bg-gray-50">
              <td className="px-4 py-2">{new Date(log.time).toLocaleTimeString()}</td>
              <td className="px-4 py-2">{log.ip}</td>
              <td className="px-4 py-2">{log.type}</td>
              <td className="px-4 py-2"><code>{JSON.stringify(log.payload)}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
