function ajaxGetRequest(path, callback) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
          if (this.readyState===4 && this.status ===200) {
              callback(this.response);
            }
    }
    request.open("GET", path);
    request.send();
}

function plot_Scatter(data){
  function count_by_day(data){
    let dateList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for(let i of data){
      let day = i["tow_date"]
      let newday = Number(day[8] + day[9])
      dateList[newday - 1] = dateList[newday - 1] + 1
    }
    return(dateList)
  }
  let scatterPl = count_by_day(data)

  let dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

  var scatter = {x : dates, y : scatterPl, mode : "markers", type : "scatter",}

  var scatterLayout = { xaxis:{ title: "Day of the Month"}, yaxis : {title: " # Tows"}}

  var scatterData = [scatter]
  Plotly.newPlot('scatter', scatterData, scatterLayout) 
}

function plotPie(data) {
function pie_data(dataThree){
  let dataSet = [0, 0, 0, 0, 0]
  for(let lines of dataThree){
    if(lines['police_district']==="District A"){
      dataSet[0] = dataSet[0] + 1
    }
    if(lines['police_district']==="District B"){
      dataSet[1] = dataSet[1] + 1
    }
    if(lines['police_district']==="District C"){
      dataSet[2] = dataSet[2] + 1
    }
    if(lines['police_district']==="District D"){
      dataSet[3] = dataSet[3] + 1
    }
    if(lines['police_district']==="District E"){
      dataSet[4] = dataSet[4] + 1
    }
  }
  return(dataSet)
}
pie_result = pie_data(data)

var pieData = [{values : pie_result,
labels : ["District A", "District B", "District C","District D", "District E"],
type: "pie"
}];

var pieLayout = {
  height : 400,
  width : 500
};

Plotly.newPlot('pie', pieData, pieLayout)
}

function plot_Line(data){
  function calc_month_data(data, reason){
    let dateList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for(let i of data){
      if(i["tow_description"]===reason){
      let month = i["tow_date"]
      let newmonth = Number(month[5] + month[6])
      dateList[newmonth - 1] = dateList[newmonth - 1] + 1
    }
    }
    return(dateList)
  }

let imp_data = calc_month_data(data, "IMPOUNDED")
let aban_data = calc_month_data(data, "ABANDONED")
let acc_data = calc_month_data(data, "ACCIDENT")
let illv_data = calc_month_data(data, "ILLEGAL VEHICLE")
let gone_data = calc_month_data(data, "GONE ON ARRIVAL")
let stolev_data = calc_month_data(data, "STOLEN VEHICLE")
let illp_data = calc_month_data(data, "ILLEGALLY PARKED")


let month_List = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

var trace1 = { y: illv_data, x : month_List, mode:"lines", name:"ILLEGAL VEHICLE"}
var trace2 = {y:imp_data, x : month_List, mode:"lines", name: "IMPOUNDED"}
var trace3 = {y:aban_data, x:month_List, mode:"lines", name:"ABANDONED VEHICLE"}
var trace4 = {y:acc_data, x: month_List, mode:"lines", name:"ACCIDENT"}
var trace5 = {y:gone_data, x:month_List, mode:"lines", name:"GONE ON ARRIVAL"}
var trace6 = {y:stolev_data, x:month_List, mode:"lines", name:"STOLEN VEHICLE"}
var trace7 = {y:illp_data, x:month_List, mode:"lines", name: "ILLEGALLY PARKED"}
var lineData = [trace1, trace2, trace3, trace4, trace5, trace6, trace7 ]

var lineLayout = {title: "Scatter and Line Plot", xaxis : {title: "Month"}, yaxis: {title: "# Tows"}}

Plotly.newPlot('line', lineData, lineLayout)
}

function getData(){
  ajaxGetRequest('/scatter', accept_Scatter)
  ajaxGetRequest('/pie', accept_Pie)
  ajaxGetRequest('/line', accept_Line )
}

function accept_Scatter(res){
  console.log("Data received from BPD! Parsing for Scatter Graph!")
  useableData = JSON.parse(res)
  return(plot_Scatter(useableData))
}

function accept_Line(res){
  console.log("Data received from BPD! Parsing for Line Graph!")
  useableData = JSON.parse(res)
  return(plot_Line(useableData))
}

function accept_Pie(res){
  console.log("Data received from BPD! Parsing for Pie Graph!")
  useableData = JSON.parse(res)
  return(plotPie(useableData))
}

