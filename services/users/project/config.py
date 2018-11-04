# services/users/project/config.py


class BaseConfig:
    """Base configuration"""
    TESTING = False


class DevelopmentConfig(BaseConfig):
    """Development configuration"""
    pass


class TestingConfig(BaseConfig):
    """Tetsing configuration"""
    TESTING = True


class ProductionConfig(BaseConfig):
    """production configuration"""
    pass
