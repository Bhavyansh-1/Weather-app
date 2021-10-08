const request=require('request')
const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYmhhdnlhc25oIiwiYSI6ImNrdTJmZTlyaDF0d2MydXFobTNscWExbjEifQ.v-S76RGCNBDiBqJU5NqSHQ&limit=1'
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('You are not Connected to the internet',undefined)
        }
        else if(body.features.length===0){
            callback("Location not found! Try with another location",undefined)
        }
        else{
            callback(undefined,{Longitude:body.features[0].center[0],Latitude:body.features[0].center[1],Location:body.features[0].place_name})
        }
    })
}

const forecast =(a,b,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=81fbc8eb5a29cda3eda845587714f15b&query='+a+','+b
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('You are not Connected to the internet',undefined)
        }
        else if(body.error){
            callback("Location not found! Try with another location",undefined)
        }
        else{
            callback(undefined,{Summary:body.current.weather_descriptions[0],Temperature:body.current.temperature,precip:body.current.precip})
        }
    })
}




module.exports = {
    geoCode:geoCode,
    forecast:forecast
}