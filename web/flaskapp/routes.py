from flask import render_template, flash, request, redirect
from flaskapp import app
from flaskapp.db import Db


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/upload', methods=['GET', 'POST'])
def upload():
    # get list of cities
    cities = Db(host='db').get_all_cities()
    if request.method == 'POST':
        app.logger.info("request: {}".format(request))
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        app.logger.info("file: {}".format(file))
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        lines = [l.strip() for l in file]
        return render_template('show_csv.html', city=request.form['city'],
                               lines=lines)
    return render_template('upload_csv.html', cities=cities)
