from flask import Flask, jsonify
from flask_cors import CORS

# if this doesnt run then youll need to run 
# 'pip install flask' and 'pip install flask-cors'

app = Flask(__name__)
CORS(app)

@app.route('/')

def hello_world():
    return 'hi'

# main function
if __name__ == '__main__':
    app.run()
