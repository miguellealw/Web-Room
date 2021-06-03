import os

from flask import Flask


# TODO: setup postgresql

def create_app(test_config=None):
    # create and configure the app
    # __name__ is the name of the current python module
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        # TODO: change this to random value when deploying
        SECRET_KEY='dev',
        # instance folder is located outside YG-server package and 
        # can hold local data that shouldn't be commited to version control, like config secrets and DB files
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    return app