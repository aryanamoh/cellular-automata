from flask import Flask, render_template
from waitress import serve

app = Flask(__name__)

@app.route("/")
@app.route("/index")
def hello_world():
    return render_template("index.html")

if __name__ == "__main__":
    # with app.app_context():
    #     db.create_all()
    serve(app, host="0.0.0.0", port=5783)