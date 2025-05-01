// src/components/Layout.jsx
import React from 'react'
import ThemeToggle from './ThemeToggle'
import { HiHome, HiChartBar, HiCog } from 'react-icons/hi'

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-term-bg">
      {/* Sidebar */}
      <aside className="w-20 flex flex-col items-center py-6 bg-term-panel text-neon">
        <button className="mb-8 p-2 hover:bg-term-panel rounded-md transition">
          <HiHome className="w-8 h-8 text-ss-blue hover:text-ss-green" />
        </button>
        <nav className="flex-1 space-y-6">
          <button className="p-2 hover:bg-term-panel rounded-md transition">
            <HiChartBar className="w-6 h-6 text-ss-blue hover:text-ss-green" />
          </button>
          <button className="p-2 hover:bg-term-panel rounded-md transition">
            <HiCog className="w-6 h-6 text-ss-blue hover:text-ss-green" />
          </button>
        </nav>
        <div className="mt-8">
          <ThemeToggle />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  )
}
