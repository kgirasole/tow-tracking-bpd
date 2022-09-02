def get_matches(data, k, v):
  keylist = []
  for i in data:
    if (k in i.keys() and v in i.values()):
      keylist.append(i)
  print(keylist)
  return(keylist)

def list_descriptions(data):
  towList = []
  for i in data:
    if i.get("tow_description") not in towList:
      towList.append(i.get("tow_description"))
  print(towList)
  return(towList)

def count_by_month(data):
  monthList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  for i in data:
    month = i.get("tow_date")
    newmonth = int(month[5] + month[6])
    monthList[newmonth - 1] = monthList[newmonth - 1] + 1
  return(monthList)
    
def count_by_day(data):
  dateList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  for i in data:
    day = i.get("tow_date")
    newday = int(day[8] + day[9])
    dateList[newday - 1] = dateList[newday - 1] + 1
  return(dateList)
