from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from modules.database_model import db
from modules.database_model import codeTable
import random
app = Flask(__name__)

ENV = 'dev'    
### If the ENV is dev, it uses the psql on my (Drextex's) computer.
if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123456@localhost:5433/chiped'
else: # When ENV is changed to something else, it should use the Heroku database.
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://tlvibsrdjvpuwk:a268e9a77940e8ce8a91671d86eaeb81b6a49f3a514c9479fe7b6cb0922192a3@ec2-52-6-178-202.compute-1.amazonaws.com:5432/d2vdtfkq767lvh'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Handles main page.
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run()
