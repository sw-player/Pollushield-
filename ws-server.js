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
});
