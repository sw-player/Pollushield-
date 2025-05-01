// src/components/ThemeToggle.jsx
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')
  )

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
      className="p-2 rounded-full focus:outline-none focus:ring"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  )
}
