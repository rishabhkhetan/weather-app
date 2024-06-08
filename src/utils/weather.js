import request from 'postman-request'

const weather = ({longitude, latitude, location}, cb) => {
    console.log(longitude,latitude,location);
    const Weatherurl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
    request({url: Weatherurl, json: true},(err,res)=>{
        if(err){
            cb('Unable to connect to weather server', undefined)
        }
        else if(res.body.error){
            console.log(res.body);
            cb('Bad Input', undefined)
        }
        else{
            cb(undefined,{current_temperature: res.body.current.temperature_2m, current_windspeed: res.body.current.wind_speed_10m, location: location})
        }
    })
}

export default weather