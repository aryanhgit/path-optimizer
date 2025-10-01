from flask import Flask
from flask_restx import Api
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from config import DevConfig
from models import Posts, User
from extension import db
from posts import post_ns
from auth import auth_ns
from flask_cors import CORS
from places import place_ns
from optimize import optimize_ns
import os

def create_app(config):
    # Create Flask app and load config
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config)

    # Initialize extensions
    db.init_app(app)

    migrate = Migrate(app, db)
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    jwt = JWTManager(app)

    # Set up Flask-RESTX API 
    api = Api(app) 
    api.add_namespace(post_ns)
    api.add_namespace(auth_ns)
    api.add_namespace(place_ns)
    api.add_namespace(optimize_ns)

    # Shell context for Flask CLI
    @app.shell_context_processor
    def make_shell_context():
        return {'db': db, 'Posts': Posts, 'User': User}
    
    return app