export default function Card({ title, children }) {
    return (
      <div className="bg-term-panel border-neon rounded-lg p-6 space-y-4">
        <h2 className="text-neon">{title}</h2>
        <div>{children}</div>
      </div>
    )
  }
  