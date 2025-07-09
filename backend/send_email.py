
# Once you've collected the contact info (name, phone, email, postcode, issue)
# You can send the data to a predefined email address using a backend script (e.g., Python, PHP, Node.js).

from flask import Flask, request
import smtplib


app = Flask(__name__)

@app.route('/send-lead', methods=['POST'])
def send_lead():
    data = request.json
    msg = f"""New Lead:
Name: {data['name']}
Phone: {data['phone']}
Email: {data['email']}
Postcode: {data['postcode']}
Issue: {data['issue']}"""

    with smtplib.SMTP('smtp.yourprovider.com', 587) as server:
        server.starttls()
        server.login('you@example.com', 'yourpassword')
        server.sendmail('you@example.com', 'plumber@example.com', msg)

    return 'OK', 200
