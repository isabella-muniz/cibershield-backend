import { Server } from 'ws';

let wss;

export default function handler(req, res) {
  if (!wss) {
    wss = new Server({ noServer: true });

    wss.on('connection', (ws) => {
      setInterval(() => {
        const attack = detectAttack();
        if (attack) {
          ws.send(JSON.stringify(attack));
        }
      }, 5000);
    });
  }

  res.status(200).end();
}

function detectAttack() {
  // Lógica para detectar ataques
  return { type: 'DDoS', severity: 'high', timestamp: new Date() };
}
