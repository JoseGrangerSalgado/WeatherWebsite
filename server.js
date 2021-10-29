const express = require("express");
const app = express();	
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require("path");
const apiKey = 'e37bbde549ae53f5b509afe9eb2efcd7';
const https = require('https');
app.use('/public',express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
	res.redirect('/public');
});

app.get("/public/map/:lat/:lon",(req, res) => 
{
	let lat = req.params.lat;
	let lon = req.params.lon;
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${'metric'}&appid=${apiKey}`;
	https.get(url, resp => {
  let data = [];
  console.log('Status Code:', resp.statusCode);

  resp.on('data', chunk => {
    data.push(chunk);
  });

  resp.on('end', () => {
    console.log('Response ended: ');
    const weather = JSON.parse(Buffer.concat(data).toString());
	res.send(weather)
  });
	}).on('error', err => {
  		console.log('Error: ', err.message);
	});
	
})






//Listening on port
app.listen(port,() => console.log("Server running"))