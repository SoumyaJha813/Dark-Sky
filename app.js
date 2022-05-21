const express = require("express");
const app = express();
const https = require("node:https");

app.get("/",function(req,res)
{
const url="https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=0099088d43e8e32da3e4b9782b8d8a92&units=metric";

https.get(url,function(response) {
  console.log("Weather Report: ", response.statusCode);

  response.on("data",function(data)
{
  //console.log(data);//hexadecimal code
  const weather_data = JSON.parse(data)
  const temp=weather_data.main.temp;
  const city=weather_data.sys.country;
  const desc=weather_data.weather[0].description;
  const icon=weather_data.weather[0].icon;
  const img_url="http://openweathermap.org/img/wn/"+icon+"@2x.png";
  console.log("The temperature in "+city+" is "+temp+" degree Celcius.\nWeather Description: "+desc);
  res.write("<p>The Weather is currently "+desc+"</p>");
  res.write("<h1>The temperature in "+city+" is "+temp+" degree Celcius</h1>");
  res.write("<img src="+img_url+" >");
  res.send();
});

});
});


app.listen(3000, function()
{
  console.log("the server is running on port 3000.");
});
