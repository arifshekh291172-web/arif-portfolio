"""
Smart Agriculture Monitoring Dashboard
Author: Arif Shekh (AI/ML & IoT Developer)
Backend: Flask (REST API & Real-Time Telemetry Interface)
"""

from flask import Flask, request, jsonify, render_template_string
import time

app = Flask(__name__)

# In-Memory Telemetry State
latest_telemetry = {
    "soilMoisture": 48,
    "temperature": 27.8,
    "humidity": 62.4,
    "lightLevel": 75,
    "pumpActive": False,
    "fireHazard": False,
    "lastUpdated": "System Initialized"
}

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Smart Agriculture IoT Dashboard | Arif Shekh</title>
    <style>
        body { background: #030712; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 30px; }
        .container { max-width: 900px; margin: 0 auto; }
        h1 { color: #00F0FF; font-family: monospace; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 25px; }
        .card { background: rgba(17, 24, 39, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px; backdrop-filter: blur(10px); }
        .card h3 { margin-top: 0; font-size: 13px; text-transform: uppercase; color: #94a3b8; font-family: monospace; }
        .value { font-size: 32px; font-weight: bold; color: #fff; }
        .status-on { color: #34d399; }
        .status-off { color: #94a3b8; }
        .hazard { color: #ef4444; }
    </style>
    <script>
        setInterval(() => {
            fetch('/api/telemetry')
                .then(r => r.json())
                .then(d => {
                    document.getElementById('soil').innerText = d.soilMoisture + ' %';
                    document.getElementById('temp').innerText = d.temperature + ' °C';
                    document.getElementById('humidity').innerText = d.humidity + ' %';
                    document.getElementById('pump').innerText = d.pumpActive ? 'ACTIVE (ON)' : 'STANDBY (OFF)';
                    document.getElementById('pump').className = d.pumpActive ? 'value status-on' : 'value status-off';
                    document.getElementById('fire').innerText = d.fireHazard ? 'FIRE HAZARD!' : 'NORMAL';
                    document.getElementById('fire').className = d.fireHazard ? 'value hazard' : 'value status-on';
                });
        }, 2000);
    </script>
</head>
<body>
    <div class="container">
        <h1>🌱 Smart Agriculture Monitoring System</h1>
        <p style="color: #94a3b8;">ESP32/ESP8266 Telemetry Gateway • Built by Arif Shekh</p>
        <div class="grid">
            <div class="card">
                <h3>Soil Moisture</h3>
                <div class="value" id="soil">{{ data.soilMoisture }} %</div>
            </div>
            <div class="card">
                <h3>Temperature</h3>
                <div class="value" id="temp">{{ data.temperature }} °C</div>
            </div>
            <div class="card">
                <h3>Humidity</h3>
                <div class="value" id="humidity">{{ data.humidity }} %</div>
            </div>
            <div class="card">
                <h3>Water Pump Relay</h3>
                <div class="value {{ 'status-on' if data.pumpActive else 'status-off' }}" id="pump">
                    {{ 'ACTIVE (ON)' if data.pumpActive else 'STANDBY (OFF)' }}
                </div>
            </div>
            <div class="card">
                <h3>Safety Status</h3>
                <div class="value {{ 'hazard' if data.fireHazard else 'status-on' }}" id="fire">
                    {{ 'FIRE HAZARD!' if data.fireHazard else 'NORMAL' }}
                </div>
            </div>
        </div>
    </div>
</body>
</html>
"""

@app.route('/')
def home():
    return render_template_string(HTML_TEMPLATE, data=latest_telemetry)

@app.route('/api/telemetry', methods=['GET', 'POST'])
def telemetry():
    global latest_telemetry
    if request.method == 'POST':
        data = request.get_json(force=True)
        latest_telemetry.update(data)
        latest_telemetry["lastUpdated"] = time.strftime('%Y-%m-%d %H:%M:%S')
        return jsonify({"status": "success", "received": data})
    return jsonify(latest_telemetry)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
