#!/opt/venv/bin/python

from flask import Flask, request
from datetime import datetime
import json
import os

app = Flask(__name__)

# Path to your log file
LOG_FILE = "/usr/local/apache2/htdocs/leads.jsonl" # attached to container

@app.route('/send-lead', methods=['POST'])
def send_lead():
    data = request.json

    # Add timestamp
    data['timestamp'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Save to file
    with open(LOG_FILE, 'a') as f:
        f.write(json.dumps(data) + '\n')

    return 'Lead saved', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
