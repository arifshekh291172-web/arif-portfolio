# Smart Canteen

IoT-based smart canteen concept using RFID and connected monitoring.

## System Components
1. **Hardware Terminal**:
   - ESP8266 / NodeMCU Wi-Fi SoC
   - RC522 RFID Card Reader (SPI Interface)
   - Active Piezo Buzzer for acoustic confirmation
2. **Backend Server**:
   - Node.js & Express REST endpoint (`/api/canteen/tap`)
   - In-memory student balance verification & ledger
   - Live transaction monitoring web dashboard

## Running the Server
```bash
cd server
npm install
npm start
```
Server starts on [http://localhost:3000](http://localhost:3000).
