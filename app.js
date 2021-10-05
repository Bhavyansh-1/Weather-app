const path = require('path')
const express = require('express')
const hbs=require('hbs')
const utils = require('./utils')

const app= express()
const port= process.env.PORT || 3000

const publicURL=path.join(__dirname,'/public')
const viewDir=path.join(__dirname,'/tempelates/views')
const partials=path.join(__dirname,'/tempelates/partials')
app.set('view engine','hbs')
app.set('views',viewDir)
hbs.registerPartials(partials)


app.use(express.static(publicURL))


app.get('',(req,res)=>{
    res.render('index',{
        name:'Bhavyansh Sharma',
        title:'Weather'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Bhavyansh Sharma',
        title:'About'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Bhavyansh Sharma'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Address query not specified'
        })
    }
    utils.geoCode(req.query.address,(error,{Location,Latitude,Longitude}={})=>{
        if(error)
        {
            return res.send({
                error:error
            })
        }
        utils.forecast(Latitude,Longitude,(error,{Summary,Temperature,precip}={})=>{
          if(error)
          return res.send({
                error:error
            })
          res.send({
              summary:Summary,
              Temperature:Temperature,
              precip:precip,
              Location:Location
          })
      
      })
      })
    
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 page',
        name:'Bhavyansh Sharma',
        error:'This page is not found'
    })
})
app.listen(port)
