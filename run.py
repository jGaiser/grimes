from flask import Flask
from flask import render_template
import urllib2
import json

app = Flask(__name__);

@app.route('/')
@app.route('/<network_id>')
@app.route('/<network_id>/')
def home(network_id=None):
	"""
	    Gather important data to send to client side with home template
	"""
    cx_data = json.dumps(get_network_cx(network_id))
    return render_template('home.html', cx_data = cx_data) 


def get_network_cx(network_id):
	"""
	    Get CX data from public NDEx server
	    TODO: Provide interface for different methods, i.e. 'metadata' instead of 'network' 
	"""

    endpoint   = "http://www.ndexbio.org/v2"
    method     = 'network'
    network_id = network_id

    request = urllib2.urlopen("%s/%s/%s" % (endpoint, method, network_id))
    return request.read().decode('utf8')   

