// src/hooks/useWebSocket.js
import { useEffect, useRef, useState } from 'react'

export default function useWebSocket(url) {
  const ws = useRef(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    ws.current = new WebSocket(url)

    ws.current.onopen = () => {
      console.log('[useWebSocket] 연결 성공')
    }

    ws.current.onerror = e => {
      console.error('[useWebSocket] 연결 에러', e)
    }

    ws.current.onmessage = event => {
      try {
        const msg = JSON.parse(event.data)
        // payload만 검증
        if (window.PolluShield?.sanitize) {
          window.PolluShield.sanitize(msg.payload)
        }
        // 검증 성공한 메시지만 상태에 추가
        setMessages(prev => [msg, ...prev].slice(0, 100))
      } catch (err) {
        console.warn('[useWebSocket] 잘못된 메시지 차단됨:', err.message)
        // 차단된 메시지는 무시
      }
    }

    return () => {
      if (ws.current) ws.current.close()
    }
  }, [url])

  return messages
}
