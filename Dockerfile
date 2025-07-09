FROM httpd:2.4

# Install necessary packages
RUN apt-get update && apt-get install -y \
    python3 python3-pip python3-venv python3-dev \
    libffi-dev build-essential sudo supervisor \
    && rm -rf /var/lib/apt/lists/*

# Set up sudo permissions
RUN echo "Defaults:www-data !requiretty" >> /etc/sudoers && \
    echo "www-data ALL=(ALL) NOPASSWD: /usr/bin/python3" >> /etc/sudoers && \
    chmod 440 /etc/sudoers

# Enable CGI
RUN sed -i \
    -e 's/#LoadModule cgid_module/LoadModule cgid_module/' \
    -e 's/#AddHandler cgi-script .cgi/AddHandler cgi-script .cgi .py/' \
    /usr/local/apache2/conf/httpd.conf

# Set up python CGI wrapper
RUN echo '#!/bin/sh\nsudo /usr/bin/python3 "$@"' > /usr/local/bin/python3-cgi && \
    chmod +x /usr/local/bin/python3-cgi

# Create virtual environment
RUN python3 -m venv /opt/venv

# Install Python packages
RUN /opt/venv/bin/pip install websockets RPi.GPIO

# Install Flask and requests for save_leads.py
RUN /opt/venv/bin/pip install flask requests

# Copy the supervisor config
COPY supervisord.conf /etc/supervisord.conf

# Start both services using supervisord
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
