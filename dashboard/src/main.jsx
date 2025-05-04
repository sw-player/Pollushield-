// src/main.jsx
import '../../client/src/sanitize.js'; 
import React from 'react'

// createRoot를 named import로 가져옵니다
import { createRoot } from 'react-dom/client'

import './index.css'    // Tailwind 포함한 전역 스타일
import App from './App'

// createRoot을 사용해 렌더링합니다
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)