from flask import Flask
from flask import render_template
import urllib2
import json

app = Flask(__name__);

@app.route('/')
def home():
    """
        Gather important data to send to client side with home template
    """
    cx_data = {}
    cx_style = {}
    error_message = ''

    try:
        network_id = get_network_id()
        view_id = get_view_id(network_id)
        cx_data = json.dumps(get_network_cx(network_id, view_id))
        cx_style = json.dumps(get_network_style()) # Style
        mapping = json.dumps(get_mapping("NODE_SIZE"))
    except Exception as e:
        print e
        error_message = "No Cytoscape networks available."

    return render_template('home.html', cx_data=cx_data, cx_style=cx_style, error_message=error_message, mapping=mapping)


def get_network_cx(network_id, view_id):
    """
        Get CX data from public NDEx server
        Accepts network id and view id
        Returns string of network JSON data
        TODO: Provide interface for different methods, i.e. 'metadata' instead of 'network' 
    """
    endpoint   = "http://localhost:1234/v1/networks/%s/views/%s" % (network_id, view_id)
    response = urllib2.urlopen(endpoint)

    return response.read().decode('utf8')   
  

def get_mapping(visual_property):
    """
        Retrieve mapping of provided visual property.
    """
    endpoint = "http://localhost:1234/v1/styles/default/mappings/%s" % visual_property
    response = urllib2.urlopen(endpoint)

    return response.read().decode('utf8')



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


def get_network_style():
    """
        get_network_style - Will
        Grabs the style of the network.
        Style grabbed is the 'default' style. That style
        is modified by R.
        Based off of get_network_cx
    """
    endpoint = "http://localhost:1234/v1/styles/default.json/"
    
    response = urllib2.urlopen(endpoint)
    return response.read().decode('utf8')
