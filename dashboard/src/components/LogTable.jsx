export default function LogTable({ logs }) {
  return (
    <div className="overflow-auto max-h-80 border-neon rounded-lg">
      <table className="w-full table-auto text-left text-sm">
        <thead>
          <tr className="border-b border-neon">
            {['Time','IP','Type','Payload'].map(h => 
              <th key={h} className="p-2 text-neon">{h}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {logs.map((log,i) => (
            <tr key={i} className={i%2 ? 'bg-[#111]' : ''}>
              <td className="p-2">{log.time}</td>
              <td className="p-2">{log.ip}</td>
              <td className="p-2">{log.type}</td>
              <td className="p-2">{JSON.stringify(log.payload)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
