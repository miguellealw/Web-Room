from setuptools import find_packages, setup



# Docs on packaging projects - https://packaging.python.org/tutorials/packaging-projects/
# Flask docs - https://flask.palletsprojects.com/en/1.1.x/tutorial/install/

# To install - pip install -e .
setup(
  name='Web Room',
  version='0.0.1',
  packages=find_packages(),
  include_package_data=True, # this is for getting data in MANIFEST.in
  zip_safe=False,
  install_requires=[
    'flask',
    'flask-sqlalchemy',
    'psycopg2',
    'flask-login',
    'flask-cors',
    'Flask-HTTPAuth',
    # 'flask-wtf',
    # 'wtforms',
    # 'email-validator',
    'flask-marshmallow',
    'marshmallow-sqlalchemy'
  ]

)
