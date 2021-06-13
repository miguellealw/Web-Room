from flask_sqlalchemy import SQLAlchemy as sa

db = sa()

# def db_init(conn_string):
# 	engine = sa.create_engine(conn_string or conn_string)
# 	sa.Metadata().create_all(engine)
# 	connection = engine.connect()