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
    network_id = get_network_id()
    view_id = get_view_id(network_id)

    if method == "network":
        cx_data = json.dumps(get_network_cx(network_id, view_id))

    return render_template('home.html', cx_data = cx_data)
        

def get_local_cx(filename):
    """
        Retrieve CX data from local cx file
        Returns JSON CX
    """
    cx_file = open(filename, 'r')
    return cx_file.read().decode('utf8')


def get_network_id():
    """
        Retrieve first network id from cyREST's http://localhost:1234/v1/networks/ method.
        Returns network_id
    """
    endpoint = "http://localhost:1234/v1/networks/"
    response = urllib2.urlopen(endpoint)

    return json.load(response)[0]


def get_view_id(network_id):
    """
        Retrieve first view id from cyREST's http://localhost:1234/v1/networks/<network_id>/views method.
        Accepts id of network of interest
        Returns view id.
    """
    endpoint = "http://localhost:1234/v1/networks/%s/views" % network_id
    response = urllib2.urlopen(endpoint)

    return json.load(response)[0]


def get_network_cx(network_id, view_id):
    """
        Get CX data from public NDEx server
        Accepts network id and view id
        Returns string of network JSON data
        TODO: Provide interface for different methods, i.e. 'metadata' instead of 'network' 
    """
    endpoint   = "http://localhost:1234/v1/networks/%s/views/%s" % (network_id, view_id)
    method     = 'network'
    network_id = network_id

    request = urllib2.urlopen(endpoint)
    return request.read().decode('utf8')   

