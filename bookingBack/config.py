class Config(object):
    SQLALCHEMY_DATABASE_URI = ""


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:haslo@db-container/bookingsystemdb"


class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:haslo@localhost/bookingsystemdb"
