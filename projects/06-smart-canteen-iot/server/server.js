/**
 * Smart Canteen Server & Real-Time Dashboard
 * Author: Arif Shekh (AI/ML & IoT Developer)
 * Technology: Node.js, Express
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-Memory Student Database & Balance Ledger
const studentLedger = {
  "E24A9B1C": { name: "Arif Shekh", rollNo: "AIML-24-01", balance: 450, department: "AI & ML" },
  "A1B2C3D4": { name: "Rohan Patel", rollNo: "AIML-24-12", balance: 280, department: "AI & ML" },
  "9876FEDC": { name: "Aman Khan", rollNo: "CO-24-05", balance: 15, department: "Computer Engg" },
};

// Recent Transaction Logs
const transactionHistory = [
  { id: 1, cardId: "E24A9B1C", name: "Arif Shekh", amount: 60, status: "APPROVED", item: "Lunch Thali", time: "12:30 PM" },
];

// RFID Card Tap Ingestion Endpoint
app.post('/api/canteen/tap', (req, res) => {
  const { cardId, terminalId } = req.body;
  const mealCost = 50; // Standard meal deduction

  if (!cardId) {
    return res.status(400).json({ error: "Missing cardId" });
  }

  const student = studentLedger[cardId];
  if (!student) {
    // Unregistered Card
    const record = {
      id: transactionHistory.length + 1,
      cardId,
      name: "Unknown / Unregistered",
      amount: 0,
      status: "REJECTED_UNKNOWN_CARD",
      time: new Date().toLocaleTimeString()
    };
    transactionHistory.unshift(record);
    return res.status(404).json({ status: "DENIED", message: "Card not registered in campus database." });
  }

  if (student.balance < mealCost) {
    const record = {
      id: transactionHistory.length + 1,
      cardId,
      name: student.name,
      amount: mealCost,
      status: "REJECTED_LOW_BALANCE",
      time: new Date().toLocaleTimeString()
    };
    transactionHistory.unshift(record);
    return res.status(402).json({
      status: "DENIED",
      message: `Insufficient balance. Current: ₹${student.balance}`,
      currentBalance: student.balance
    });
  }

  // Deduct meal
  student.balance -= mealCost;
  const record = {
    id: transactionHistory.length + 1,
    cardId,
    name: student.name,
    amount: mealCost,
    status: "APPROVED",
    item: "Standard Canteen Meal",
    remainingBalance: student.balance,
    time: new Date().toLocaleTimeString()
  };
  transactionHistory.unshift(record);

  console.log(`[CANTEEN TRANSACTION] Approved ₹${mealCost} for ${student.name}. New Balance: ₹${student.balance}`);

  return res.json({
    status: "APPROVED",
    student: student.name,
    deducted: mealCost,
    remainingBalance: student.balance,
    message: `Meal approved for ${student.name}. Remaining: ₹${student.balance}`
  });
});

// Admin Dashboard UI
app.get('/', (req, res) => {
  const rows = transactionHistory.map(t => `
    <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
      <td style="padding: 12px; font-family: monospace;">${t.time}</td>
      <td style="padding: 12px; font-weight: bold;">${t.name}</td>
      <td style="padding: 12px; font-family: monospace; color: #00F0FF;">${t.cardId}</td>
      <td style="padding: 12px;">₹${t.amount}</td>
      <td style="padding: 12px; font-weight: bold; color: ${t.status === 'APPROVED' ? '#34d399' : '#f87171'};">${t.status}</td>
    </tr>
  `).join('');

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Smart Canteen Management Portal | Arif Shekh</title>
    <style>
      body { background: #030712; color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; padding: 30px; margin: 0; }
      .container { max-width: 1000px; margin: 0 auto; }
      h1 { color: #00F0FF; font-family: monospace; }
      table { width: 100%; border-collapse: collapse; background: #0B0F19; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; overflow: hidden; margin-top: 20px; }
      th { background: #111827; padding: 12px; text-align: left; font-family: monospace; font-size: 12px; color: #94a3b8; }
      .meta { color: #94a3b8; font-size: 14px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>💳 Smart Canteen RFID IoT Terminal</h1>
      <p class="meta">Connected Monitoring Dashboard • Engineered by Arif Shekh</p>
      <table>
        <thead>
          <tr>
            <th>TIMESTAMP</th>
            <th>STUDENT NAME</th>
            <th>CARD UID</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  </body>
  </html>
  `;
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`[Smart Canteen] Server running at http://localhost:${PORT}`);
});
