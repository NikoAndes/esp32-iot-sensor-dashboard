/**
 * ESP32 IoT Sensor Dashboard
 * Author: Nicolas Isaza Sierra (NikoAndes)
 * Simulates sensor data when no real ESP32 is connected.
 */

const MAX_HISTORY     = 20;
const UPDATE_INTERVAL = 2500;
let history = [];

function simulateReading() {
  const temp = parseFloat((24 + (Math.random() * 6 - 3)).toFixed(1));
  const hum  = parseFloat((60 + (Math.random() * 20 - 10)).toFixed(1));
  let status = 'OK';
  if (temp > 33)     status = 'WARN_TEMP_HIGH';
  else if (temp < 19) status = 'WARN_TEMP_LOW';
  else if (hum > 78)  status = 'WARN_HUM_HIGH';
  else if (hum < 42)  status = 'WARN_HUM_LOW';
  return { temp, hum, status, time: new Date().toLocaleTimeString() };
}

function updateCards(r) {
  document.getElementById('tempValue').textContent  = r.temp;
  document.getElementById('humValue').textContent   = r.hum;
  document.getElementById('lastUpdate').textContent = r.time;
  const s = document.getElementById('statusValue');
  s.textContent = r.status;
  s.className   = 'card-value ' + (r.status === 'OK' ? 'status-ok' : 'status-warn');
}

function drawChart() {
  const canvas = document.getElementById('sensorChart');
  if (!canvas || history.length < 2) return;
  const ctx  = canvas.getContext('2d');
  const W    = canvas.parentElement.offsetWidth || 800;
  const H    = 180;
  canvas.width  = W;
  canvas.height = H;
  ctx.fillStyle = '#1a1d27';
  ctx.fillRect(0, 0, W, H);
  const stepX = W / (MAX_HISTORY - 1);
  function line(vals, color, lo, hi) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    vals.forEach((v, i) => {
      const x = i * stepX;
      const y = H - ((v - lo) / (hi - lo)) * (H - 20) - 10;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
  }
  line(history.map(r => r.temp), '#f59e0b', 15, 40);
  line(history.map(r => r.hum),  '#06b6d4', 30, 90);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(10, 8, 14, 4);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px monospace';
  ctx.fillText('Temp', 28, 14);
  ctx.fillStyle = '#06b6d4';
  ctx.fillRect(90, 8, 14, 4);
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Humidity', 108, 14);
}

function updateTable() {
  const rows = history.slice().reverse().slice(0, 10);
  document.getElementById('readingsBody').innerHTML = rows.map((r, i) =>
    `<tr><td>${history.length - i}</td><td>${r.time}</td><td>${r.temp}</td><td>${r.hum}</td><td>${r.status}</td></tr>`
  ).join('');
  document.getElementById('readingCount').textContent = `${history.length} readings`;
}

function update() {
  const r = simulateReading();
  if (history.length >= MAX_HISTORY) history.shift();
  history.push(r);
  updateCards(r);
  drawChart();
  updateTable();
}

update();
setInterval(update, UPDATE_INTERVAL);
window.addEventListener('resize', drawChart);
