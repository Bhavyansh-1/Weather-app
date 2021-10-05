const wform = document.querySelector('form')
const search= document.querySelector('input')

wform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const url = '/weather?address='+search.value
    document.getElementById('report').innerHTML='Loading....'
    fetch(url).then((response)=>{
        response.json().then((data)=>{
          if(data.error)
          document.getElementById('report').innerHTML=data.error
          else
          {
          document.getElementById('location').innerHTML=data.Location    
          document.getElementById('report').innerHTML=data.summary+' the temperature is '+data.Temperature+' degree celcius with '+data.precip+'% chances of rain'
          }
        })
       })

})
