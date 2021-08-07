from YG_server import create_app
from os import environ, path
from dotenv import load_dotenv

# Get env variable
baseddir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(baseddir, '.env'))
FLASK_ENV = environ.get('FLASK_ENV')

## When deploying configure server so this is the entry point 
app = create_app(FLASK_ENV)

if __name__ == "__main__":
    app.run(host='0.0.0.0')