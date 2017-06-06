from flask import Flask
from flask import render_template
import urllib2
import json

app = Flask(__name__);

@app.route('/')
@app.route('/<method>/<source_id>')
@app.route('/<method>/<source_id>/')
def home(method, source_id):
    """
        Gather important data to send to client side with home template
        'method' argument may by either 'local' or 'network'.
        If 'method' argument is 'local', 'id' is name of document
        If 'method' argument is 'network', 'id' is id of public NEDx repository
    """
    if method == "local":
        cx_data = json.dumps(get_local_cx("Criz Network Proteins.cx"))

    if method == "network":
        cx_data = json.dumps(get_network_cx(source_id))

    return render_template('home.html', cx_data = cx_data)
        

def get_local_cx(filename):
    """
        Retrieve CX data from local cx file
    """

    cx_file = open(filename, 'r')
    return cx_file.read().decode('utf8')


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

