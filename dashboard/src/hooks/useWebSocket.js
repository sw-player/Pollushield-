import { useEffect, useRef, useState } from 'react';

export default function useWebSocket(url) {
  const ws = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    ws.current = new WebSocket(url);
    ws.current.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        setMessages(prev => [data, ...prev].slice(0, 100)); // 최신 100건 유지
      } catch {
        // JSON 파싱 실패 시 무시합니다.
      }
    };
    return () => ws.current.close();
  }, [url]);

  return messages;
}
