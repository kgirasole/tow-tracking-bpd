import bottle
import json
import cache 
import backend

@bottle.route('/')
def main_page():
  html_file = bottle.static_file("index.html", root=".")
  return html_file

@bottle.route('/plots.js')
def jsPlots():
  js_file = bottle.static_file("plots.js", root=".")
  return js_file

@bottle.route('/scatter')
def scatter_final():
  return json.dumps(data)

@bottle.route('/pie')
def pie_final():
  return json.dumps(data)

@bottle.route('/line')
def line_final():
  return json.dumps(data)


import os.path
import cache 
def load_data( ):
   csv_file = 'cached_data.csv'
   if not os.path.isfile(csv_file):
       query_str = "?$limit=10000"
       url = "https://data.buffalony.gov/resource/5c88-nfii.json" + query_str
       data = cache.get_data(url)
       data = cache.minimize_dictionaries(data, ['tow_date', 'tow_description', 'police_district'])
       cache.write_cache(data, csv_file)

load_data()
data = cache.read_cache("cached_data.csv")
bottle.run(host="0.0.0.0",port=8080, quiet=True )


