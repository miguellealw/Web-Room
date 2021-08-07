#!/bin/sh
# Script by Miguel Grinberg

# this script is used to boot a Docker container
# source venv/bin/activate

while true; do
		# Apply db migrations (create db tables and columns)
		flask db upgrade
		if [[ "$?" == "0" ]]; then
				break
		fi
		echo Deploy command failed, retrying in 5 secs...
		sleep 5
done

# flask translate compile

# exec ... - will trigger the process running the script to be replaced with the 
# command given. Important for docker since the life of the container is the first process it sees

# access-logfile and error-logfile - sends log to standard output that they are stored as logs by Docker.
exec gunicorn -b :5000 --access-logfile - --error-logfile - youtubebox:app