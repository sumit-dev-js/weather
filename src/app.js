const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
//define paths for express config
const publicpath = path.join(__dirname, '../public');
const viewspath = path.join(__dirname, '../templates/views');
const partialspath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('views', viewspath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialspath);

//setup static path for public
app.use(express.static(publicpath));

//get routes for express
app.get('', (req, res) => {
   res.render('index', {
      title: 'Weather App',
      name: 'Sumit Kumar'
   });
});

app.get('/about', (req, res) => {
   res.render('about', {
      title: 'About App',
      name: 'Sumit Kumar',
      publicpath: publicpath
   });
});

app.get('/help', (req, res) => {
   res.render('help', {
      title: 'Help',
      name: 'Sumit Kumar'
   });
});

app.get('/weather', (req, res) => {
   if(!req.query.address){
     return res.send({
         error: "you must provide a search term"
     });
   }

   // calling the geocode API that we have created 
   geocode(req.query.address, (error, {latitude, longitude} ) =>{
      if(error){
         return res.send({error});
      }

      forecast(latitude, longitude, (error, forecastData) => {
         if(error){
            return res.send({error});
         }
         res.send({
            forecast:  forecastData,
            address: req.query.address
         });
      });
   });
    
});

// 404 page 
app.get('*',(req, res) => {
   res.render('404');
});

app.listen(port, ()=>{
    console.log("server is listenig on port "+port);
});