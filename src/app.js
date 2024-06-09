import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from 'express'
import hbs from 'hbs'
const app = express();
import geocode from './utils/geocode.js'
import weather from './utils/weather.js'

const port = process.env.PORT || 3000;



//partials location path
const partialsPath = path.join(__dirname,'../templates/partials');
//define paths for express config
const viewsPath = path.join(__dirname, '../templates/views');

//set up static directory to serve
app.use(express.static(path.join(__dirname,'../public')))
// setup handlebars engine
app.set('view engine','hbs')
// setup views location
app.set('views',viewsPath);
//set up partials
hbs.registerPartials(partialsPath);



app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Rishabh Khetan'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About page',
        name : 'Rishabh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText : "Help Text Goes Here",
        title: 'Help',
        name: 'Rishabh Khetan'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            err: 'Address required!',
        })
    }

    geocode(req.query.address,(err,{longitude,latitude,location}={})=>{
        if(err){
            return res.send({
                err: err,
            })
        }
        else{
            return new Promise((resolve)=>resolve({longitude,latitude,location})).then(weather({longitude,latitude,location},(err,{current_temperature,current_windspeed,location}={})=>{
                console.log(current_temperature,current_windspeed,location);
                if(err)
                    return res.send({
                        err: err,
                })
                    res.send({
                        currentTemp: current_temperature,
                        currentWind: current_windspeed,
                        location: location
                    })
                
            }))
        }
    })

})  

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             error:'You Must provide a search term'
//         })

//     }

//     console.log(req.query.search);
//     res.send({
//         products:[]
//     })
// })

app.get('/help/*',(req,res)=>{
    res.render('errorpage',{
        title: 'Error',
        message:"Help Article Not Found!",
        name: 'Rishabh Khetan'
    })
})

app.get('*',(req,res)=>{
    res.render('errorpage',{
        title: 'Error',
        message:'PAGE NOT FOUND',
        name: 'Rishabh Khetan'
    });
    // res.render('errpage')
})











app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})