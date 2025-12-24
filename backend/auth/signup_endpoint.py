from flask import Flask, request, jsonify
from identity.flask import Auth

app = Flask(__name__)
app = Flask(__name__.split('.')[0])

# i think what this does is send an HTTP request to this endpoint
# HTTP request method to send data to a server to create/update a resource

# POST enables users to send data to a server
# i.e. sign in/sign up data gets transferred to our POST middlepoint
# and then gets sent back to our server/database
@app.route('/auth/signup', methods=['POST'])

# soon to define a function - here, we get a user's credentials and send it to our database
# def signup():