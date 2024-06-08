import request from  'postman-request'
const geocode = (city,cb) =>{
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${city}&access_token=pk.eyJ1IjoicmlzaGFiaGtoZXRhbiIsImEiOiJjbHRwd2ZjNGswdHJhMmpxcGphdTNtaXpzIn0.G9aJo9UbaokHYX38pF9iUA&limit=1`
    request({url:url, json: true},(err,res)=>{
        if(err)
            cb('Unable to connect to Geocode services !', undefined)
        else if(res.body.features.length == 0)
            cb("Improper Inputs")
        else{
            cb(undefined, {longitude: res.body.features[0].geometry.coordinates[0],latitude: res.body.features[0].geometry.coordinates[1], location: res.body.features[0].properties.full_address})
        }
    })    
}

export default geocode;