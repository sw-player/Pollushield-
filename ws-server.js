// ws-server.js
const { Server: WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 4000 });
console.log('WebSocket 서버가 포트 4000에서 실행 중');

wss.on('connection', ws => {
  console.log('클라이언트 연결됨');
  
  // 클라이언트로부터 받은 메시지를 다시 보냄
  ws.on('message', msg => {
    console.log('받은 메시지:', msg.toString());
    ws.send(msg);
  });

  // 2초마다 테스트 메시지 전송
  const interval = setInterval(() => {
    const data = {
      time: Date.now(),
      ip: '127.0.0.1',
      type: 'pollution',
      payload: { foo: 'bar' }
    };
    ws.send(JSON.stringify(data));
  }, 2000);

  ws.on('close', () => clearInterval(interval));
});
