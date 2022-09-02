import csv
print("******BEGINNING OF FUNCTION 1 PART 2********")
#Reads the header of the csv object passed in and returns it
def read_csv_header(obj):
    header = next(obj)
    return(header)

print("*****BEGINNING OF FUNCTION 2 PART 2******")
#Matches data to the order of keys in the list passed in
def read_data(obj,lst):
  retVal = []
  storage = {}
  for line in obj:
    for i in range(len(lst)):
      storage[lst[i]] = line[i]   
    retVal.append(storage)
    storage = {}
  return(retVal)

print("****BEGINNING OF FUNCTION 3 PART 2*****")
#Writes a header for a new csv file
def write_csv_header(obj, dic):
  keyList = []
  for keys in dic.keys():
    keyList.append(keys)
  obj.writerow(keyList)
  return(keyList)
  print("Writing done!")

print("*****BEGINNING OF FUNCTION 4 PART 2*****")
#Prints the values of the dictionary passed in in the order of the list
def write_dictionaries_to_csv(obj, data, lst):
  holdDic = []
  for dic in data:
    for keys in lst:
      holdDic.append(dic.get(keys))
  for pair in holdDic:
    obj.writerow(holdDic)
    return(holdDic)

def get_data(inp):
  import json
  import urllib.request
  url = inp
  response = urllib.request.urlopen(url)
  content = response.read().decode()
  return(json.loads(content))

def minimize_dictionaries(dics, strs):
  retList = []
  holdDic = {}
  for lines in dics:
    for key in strs:
      holdDic[key] = lines.get(key, "District A")
    retList.append(holdDic)
    holdDic = {}
  print(retList)
  return(retList) 


def write_cache(lst, inp):
  import csv
  with open(inp, "w") as out:
    csv_w = csv.writer(out)
    keyList = []
    holdDic = []
    for dic in lst:
      for keys in dic:
        if keys not in keyList:
          keyList.append(keys)
    csv_w.writerow(keyList)
    for dic in lst:
      for key in keyList:
        holdDic.append(dic.get(key, "District A"))
      csv_w.writerow(holdDic)
      holdDic = []
print("*****************")
def read_cache(data):
  import csv
  counter = 0
  holdList = []
  holdDic = {}
  with open(data, "r") as inp:
    csv_r = csv.reader(inp)
    headers = next(csv_r)
    for line in csv_r:
      for i in range(len(headers)):
        holdDic[headers[i]] = line[i]
        if len(holdDic.keys()) == len(headers):
          holdList.append(holdDic)
          holdDic = {}
    return(holdList)