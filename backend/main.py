from flask import Flask,request,jsonify
from flask_restful import Api
from config import LocalDevelopmentConfig
from models import *
from flask_cors import CORS
from flask_security import SQLAlchemyUserDatastore,Security,utils
from articleAPI import *

app = None
api = None
user_datastore = None
#flask-security-too
def create_app():
    global app, api, user_datastore
    app = Flask(__name__, template_folder="templates")
    app.config.from_object(LocalDevelopmentConfig)
    db.init_app(app)
    app.app_context().push()

    # Setup Flask-Security
    user_datastore = SQLAlchemyUserDatastore(db, User, Role)
    security = Security(app, user_datastore)
    
    api = Api(app)
    CORS(app)
    app.app_context().push()      
    return app, api

#creates db schema,roles and admin 
def initialize():
   with app.app_context():
        global user_datastore
        inspector = db.inspect(db.engine)
        table_names = inspector.get_table_names()

        if not table_names:  # If no tables exist
            db.create_all()

            admin_role = Role(name='admin', description='Administrator')
            customer_role = Role(name="customer",description="Customer")
            db.session.add(admin_role)
            db.session.add(customer_role)
            db.session.commit()
            
            admin_user=user_datastore.create_user(username="admin",email='admin@mail.com',
                                        password=utils.hash_password('password'),
                                        active=1)
            admin_user.roles.append(admin_role)

            db.session.commit()
            print("Database tables created.")
        else:
            print("Database tables already exist.")

app,api = create_app()
initialize()


#add resources
api.add_resource(ArticleAPI,"/api/articles")

#signup
@app.post("/api/signup")
def create_user():
   data = request.json
   customer_role = Role.query.filter_by(name="customer").first()
   customer=user_datastore.create_user(username=data['username'],
                                       email=data['email'],
                                       password = utils.hash_password(data['password']),
                               )
   customer.roles.append(customer_role)
   db.session.commit()
   return jsonify({"message":"User Created"})


if __name__ == '__main__':
  # Run the Flask app
  app.run(port=3000)
