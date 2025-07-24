document.getElementById('tradeForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const balance = parseFloat(document.getElementById('balance').value);
  const riskPercent = parseFloat(document.getElementById('riskPercent').value);
  const stopLossPoints = parseFloat(document.getElementById('stopLossPoints').value);

  const riskAmount = balance * (riskPercent / 100);
  const lotSize = riskAmount / stopLossPoints;

  const entryPrice = parseFloat(document.getElementById('entryPrice').value);
  const takeProfitPrice = parseFloat(document.getElementById('takeProfitPrice').value);
  const stopLossPrice = parseFloat(document.getElementById('stopLossPrice').value);
  const confidence = document.getElementById('confidenceLevel').value;

  const checklistComplete = 
      document.getElementById('check1').checked &&
      document.getElementById('check2').checked &&
      document.getElementById('check3').checked &&
      document.getElementById('check4').checked &&
      document.getElementById('check5').checked;

  const tradeData = {
    lotSize: lotSize.toFixed(2),
    entryPrice,
    takeProfitPrice,
    stopLossPrice,
    confidence,
    checklist: checklistComplete ? "✅ ครบถ้วน" : "❌ ไม่ครบถ้วน",
    timestamp: new Date().toLocaleString()
  };

  // บันทึกลง LocalStorage
  saveTradeToLocalStorage(tradeData);
  showResult(tradeData);
  showLogs();
});

function saveTradeToLocalStorage(data) {
  let logs = JSON.parse(localStorage.getItem('tradeLogs')) || [];
  logs.push(data);
  localStorage.setItem('tradeLogs', JSON.stringify(logs));
}

function showResult(data) {
  document.getElementById('result').innerHTML = `
    <h2>สรุปผลการวางแผน</h2>
    <p>Lot Size ที่แนะนำ: <strong>${data.lotSize}</strong> Lots</p>
    <p>Entry Price: ${data.entryPrice}</p>
    <p>Take Profit Price: ${data.takeProfitPrice}</p>
    <p>Stop Loss Price: ${data.stopLossPrice}</p>
    <p>Confidence Level: ${data.confidence}/10</p>
    <p>Checklist: ${data.checklist}</p>
    <p>เวลา: ${data.timestamp}</p>
  `;
}

function showLogs() {
  let logs = JSON.parse(localStorage.getItem('tradeLogs')) || [];
  let logList = document.getElementById('logList');
  logList.innerHTML = '';
  logs.reverse().forEach(log => {
    let li = document.createElement('li');
    li.textContent = `[${log.timestamp}] Lot: ${log.lotSize} | Entry: ${log.entryPrice} | TP: ${log.takeProfitPrice} | SL: ${log.stopLossPrice} | Confidence: ${log.confidence}/10 | ${log.checklist}`;
    logList.appendChild(li);
  });
}

// แสดง log ล่าสุดตอนเปิดหน้า
document.addEventListener('DOMContentLoaded', showLogs);
