const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    // takes in the latitude and longitude from the html form, display in // console. Takes in as string.
        var latitude = String(req.body.latitude);
        console.log(req.body.latitude);
        var longitude = String(req.body.longitude);
        console.log(req.body.longitude);
    
    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
        const apiKey = "39ee5ff0da08c92d50813c884fc72c7b";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + latitude + "&units=" + units + "&APPID=" + apiKey;
    
    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const minTemp = weatherData.main.temp_min;      
            const maxTemp = weatherData.main.temp_max;
            const windSpeed = weatherData.wind.speed;
            const windDir = weatherData.main.deg; 
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 
            
            // displays the output of the results
            res.write("<h1> The Minimum Temperature is " + minTemp + "Degrees Fahrenheit<h1>");
            res.write("<h2>The Maximum Temperature is " + maxTemp + "Degrees Fahrenheit<h2>");
            res.write("<h3> The Wind Speed is " + windSpeed + "mph <h3>");
            res.write("<h4> The Wind Direction is " + windDir + "Degrees Fahrenheit")
            res.write("<img src=" + imageURL +">");
            res.send();
        });
    });
})


//Commented out these lines in Repl
//Uncomment these lines when running on laptop
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});

//I NEED HELP
