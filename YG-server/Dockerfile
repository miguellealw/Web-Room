# FROM python:3.6-alpine

# Why use slim-buster 
# https://stackoverflow.com/questions/62715570/failing-to-install-psycopg2-binary-on-new-docker-container
FROM python:3.9-slim-buster

# For alpine
# RUN adduser -D youtubebox

RUN adduser --disabled-password youtubebox

WORKDIR /home/youtubebox-server

# Install dependencies in venv
COPY requirements.txt requirements.txt
# RUN python -m venv venv


# Issues with alpine but not slim-buster
# To allow cryptography to be installed build from source
# delete tools afterwards to a reduce image size
# https://stackoverflow.com/a/53562393
# From https://github.com/pyca/cryptography/issues/2750
# RUN apk add --no-cache \
# 			build-base \
# 			libffi-dev \
# 			openssl-dev && \
# 	pip install --no-cache-dir cryptography==3.4.7 && \
# 	apk del \
# 			build-base \
# 			libffi-dev \
# 			openssl-dev


# Dependencies for building psycopg2 from source
# Solution: https://stackoverflow.com/a/67404591
# Alternate: https://github.com/psycopg/psycopg2/issues/684#issuecomment-431929976
RUN apt-get update && apt-get -y install libpq-dev gcc

# RUN venv/bin/pip install -r requirements.txt
RUN pip3 install -r requirements.txt
# RUN venv/bin/pip install gunicorn 
RUN pip3 install gunicorn 
# RUN venv/bin/pip install gunicorn pymysql

# Unistall tools that built psycopg2 from source
RUN apt-get -y --purge remove libpq-dev gcc

# Move files and folders into container
COPY YG_server YG_server
COPY migrations migrations
COPY youtubebox.py config.py boot.sh ./
COPY client_secret_*.json ./
# TODO: copy client secret file from YouTube API to container. Get filename from env variables
# Make shell script executable
RUN chmod a+x boot.sh

# Required by the flask commadn
ENV FLASK_APP youtubebox.py
ENV FLASK_ENV production

# Move files to the youtubebox user
RUN chown -R youtubebox:youtubebox ./
# Makes the youtubebox user the default for any subsequent instructions
USER youtubebox

EXPOSE 5000
ENTRYPOINT ["./boot.sh"]