from flask import Flask, jsonify
from flask_cors import CORS

# if this doesnt run then youll need to run 
# 'pip install flask' and 'pip install flask-cors'

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods = ['GET'])

# sample api endpoint
def hi():
    return {
        "message": "hi"
    }


# main function - runs a website
# need to uncomment this when running the next.js app so that
# we can implement a function that fetches the api from
# the flask server
if __name__ == '__main__':
   app.run(debug = True)
