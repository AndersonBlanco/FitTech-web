from flask import Flask 
import mediapipe
app = Flask(__name__)

@app.route("/")

def backend():
    
    return {"backend": ["Hello", "Universe"]}


if __name__ == "__main__":
    app.run() 