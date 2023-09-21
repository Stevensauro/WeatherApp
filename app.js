const searchBar = document.querySelector('#search-bar')
const searchDiv = document.querySelector('#search-div')
const listDiv = document.querySelector('#list-div')
import {config} from './config.js'

currentCountry() //current country asked by the client
isTypingInput() 

function sunAnimation(){

  const pageWidth = window.innerWidth

  function createElements(){
    document.querySelector('#background').append(document.createElement('div'))
    document.querySelector('#background').querySelector('div').append(document.createElement('img'))
  
    document.querySelector('#background').querySelector('img').setAttribute('src', 'resources/svg/sun.svg')
    document.querySelector('#background').querySelector('div').setAttribute('id', 'sun')
  }

  createElements()

  const sun = document.querySelector('#background').querySelector('img')
  const sunBackground = document.querySelector('#background')

  sunBackground.style.background = 'repeat local 0% 0% / 850px url(\'resources/svg/sun_background.svg\')'


  console.log(sun.clientWidth*3)

  const sunPos = {
    xAxis: window.innerWidth*0.28,
    yAxis: 40,
    scaling: `scale(${3})`,
    offset:[ .2, .4, .6, .8],
  }

  const backgroundPos = {
    offset: [ .2, .4, .6, .8]
  }

  function animationObjectSun(){
    
    const objArr = []

    objArr.push(
      { 
      transform: 
      `${sunPos.scaling} translateX(${sunPos.xAxis}%) translateY(${sunPos.yAxis}px) rotate(90deg)`,
      offset: 0
      }
    )

    sunPos.offset.forEach((offset,idx)=>{
      
      if(idx%2===0){
        objArr.push(
          {
            transform: 
              `${sunPos.scaling} translateX(${sunPos.xAxis}%) translateY(${sunPos.yAxis}px) rotate(-90deg)`,
              offset: offset
          }
        ) 
      } else{
        objArr.push(
          {
            transform: 
              `${sunPos.scaling} translateX(${sunPos.xAxis}%) translateY(${sunPos.yAxis}px) rotate(90deg)`,
              offset: offset
          }
        ) 
      }
    })

    objArr.push(
      {
        transform:
        `${sunPos.scaling} translateX(${sunPos.xAxis}%) translateY(${sunPos.yAxis}px) rotate(-90deg)`,
        offset: 1
      }
    )

      

    return objArr

  }

  function animationObjectBackground(){
    const objArr = []

    objArr.push({
      backgroundPosition: `50% -21%`
    })

    backgroundPos.offset.forEach((offset, idx)=>{
      const increase = 50

      if(idx%2===0){
        objArr.push(
          {
            backgroundPosition: `${-50}% ${increase*(idx+1)}%`,
              offset: offset
          }
        ) 
      } else{
        objArr.push(
          {
            backgroundPosition: `${50}% ${increase*(idx+1)}%`,
              offset: offset
          } 
        ) 
      }
    })

    objArr.push(
      {
        backgroundPosition: `-50% 211%`,
          offset: 1
      }
    ) 
    
    console.log(objArr)

    return objArr
  }

  const effect1 = new KeyframeEffect(
    sun, // element to animate
    animationObjectSun(),
    {id: `sun-keyframe`, duration: 39000, iterations: 'Infinity', easing: 'linear' }, // keyframe options
  )

  const effect2 = new KeyframeEffect(
    sunBackground, // element to animate
    animationObjectBackground(),
    {id: `sunBck-keyframe`, duration: 35000, iterations: 'Infinity', easing: 'linear' }, // keyframe options
  )

  const sunAnimation = new Animation(
    effect1,
    document.timeline
  )  

  const sunBckAnimation = new Animation(
    effect2,
    document.timeline
  )  

  sunAnimation.id = `sun-animation`
  sunBckAnimation.id = `sunBck-animation`

  sunAnimation.play()
  sunBckAnimation.play()
}

function cloudAnimation(){
//Create elements to contain the clouds the background

  if(document.querySelector('#background').querySelector('div') === null){
    console.log('no hay xd')
  } else{
    if(document.querySelector('#background').querySelector('div').querySelector('img').id === 'cloud'){
      return true && {type: 'clouds'}
    }
  }
  

  document.querySelector('#background').append(document.createElement('div'))
  document.querySelector('#background').querySelector('div').append(document.createElement('img'))
  document.querySelector('#background').querySelector('img').setAttribute('src', 'resources/svg/cloud.svg')
  document.querySelector('#background').querySelector('img').setAttribute('id', 'cloud')

  const pageWidth = window.innerWidth
  const cloudDiv = document.querySelector('.background-svg').querySelector('div')

  function cloudMaker(n){
    for(let i = 0; i < n; i++){
      const newCloud = cloudDiv.cloneNode(true)
      document.querySelector('.background-svg').appendChild(newCloud)
    }
  }

  cloudMaker(10)

  const clouds = document.querySelector('.background-svg').querySelectorAll('div')

  const animations = [] 

  clouds.forEach((cloud,idx) => {

    const yAxisRandom = cloud.clientHeight*(Math.floor(Math.random()*2)+1+Math.random())

    const cloudPos = {
      startLocationX: pageWidth+cloud.offsetWidth,
      yAxis: yAxisRandom,
      endLocationX: -cloud.offsetWidth-(cloud.offsetWidth*2),
      yAxisGreater: 
      `translateY(${yAxisRandom-Math.floor(Math.random()*40)}px)`,
      yAxisLesser: 
      `translateY(${yAxisRandom+Math.floor(Math.random()*40)}px)`,
      scaling: `scale(${Math.floor(Math.random()*2)+1+Math.random()})`,
      offset:[ .2, .4, .6, .8],
      offsetXAxis: []
    }
    
    cloudPos.offset.forEach(n=>{
      cloudPos.offsetXAxis.unshift(cloudPos.startLocationX*n)
    })

    function animationObject(){
      
      const objArr = []

      objArr.push(
        { 
        transform: 
        `${cloudPos.scaling} translateX(${cloudPos.startLocationX}px) translateY(${cloudPos.yAxis}px)`,
        offset: 0
        }
      )

      cloudPos.offsetXAxis.forEach((offset,idx)=>{
        
        if(idx%2===0){
          objArr.push(
            {
              transform: 
                `${cloudPos.scaling} translateX(${offset}px) ${cloudPos.yAxisGreater}`,
                offset: cloudPos.offset[idx]
            }
          ) 
        } else{
          objArr.push(
            {
              transform: 
                `${cloudPos.scaling} translateX(${offset}px) ${cloudPos.yAxisLesser}`,
                offset: cloudPos.offset[idx]
            }
          ) 
        }
      })

      objArr.push(
        {
          transform:
          `${cloudPos.scaling} translateX(${cloudPos.endLocationX}px) translateY(${cloudPos.yAxis}px)`,
          offset: 1
        }
      )

      return objArr

    }


    const effect = new KeyframeEffect(
      cloud, // element to animate
      animationObject(),
      {id: `cloud-${idx}-keyframe`, duration: (Math.floor((Math.random()*4)*1000)+12000), iterations: 'Infinity', easing: 'ease-in-out' }, // keyframe options
    )

    const cloudAnimation = new Animation(
      effect,
      document.timeline
    )  

    cloudAnimation.id = `cloud-${idx}-animation`

    animations.push(cloudAnimation)
  })
  

  animations.forEach(animation=>animation.play())

}

function backgroundWeather(weatherDescription, weatherTime){
  const backgroundBody = document.body
  
  function createBackgroundContainer(){
    document.body.prepend(document.createElement('div'))
    document.querySelector('div').setAttribute('id', 'background')
    document.querySelector('div').setAttribute('class', 'background-svg clearfix')
  }

  function deleteBackgroundContainer(){
    document.querySelector('#background').remove()
  }

  console.log(weatherDescription,' ',weatherTime)

  if(weatherTime < 1800){
    backgroundBody.style.setProperty('background-color', 'var(--clouds-day)')
  } else{
    backgroundBody.style.setProperty('background-color', 'var(--clouds-night)')
  }

  if(weatherDescription==='Clouds'){
    deleteBackgroundContainer()
    createBackgroundContainer()
    cloudAnimation()
  }else if(weatherDescription==='Clear'){
    deleteBackgroundContainer()
    createBackgroundContainer()
    if(weatherTime < 1800){
      sunAnimation()
    } else{
      //nightAnimation()
    }
    
  }

}

function isTypingInput(){
  document.body.onclick = (evt)=>{
    evt.stopPropagation
  
    if(evt.target.id==='search-bar'){
  
      searchBar.oninput = searchCity
  
    } else{
  
      if(!searchBar.value){
        searchBar.value = ''
      }
  
      if(searchDiv.querySelector('#list-cities')){
        const listOfCities = searchDiv.querySelector('#list-cities')
        listOfCities.remove()
      }
  
    }
  
  }
}

async function currentCountry(){ //function to find public ip and country of client
  let isIpInfoWorking = true
  const clientWeather = []
  let currentState

  const currentCountry = await fetch(`https://ipinfo.io/json?token=${config.ipInfoKey}`) //API call to ipinfo.io
  .then(response=>response.json())
  .then(json=> {
    currentState = json.region
    return weatherLocation(` ,${json.region}, ${json.country}`)}) //Passing client's country to weather API to get lat and lon data
  .then(locationData=> {return {lat: locationData[0].lat, lon: locationData[0].lon}}) //Returning client's lat and lon data as object  
  .catch(err => isIpInfoWorking = false)


  if(isIpInfoWorking){
    clientWeather.push(  //Pushing Current Weather JSON object to client Weather array
      await currentWeather(currentCountry.lat, currentCountry.lon)
    )

    clientWeather.push(
      await weatherForecast(currentCountry.lat, currentCountry.lon)
    )

    const mainPlace = document.querySelector('#main #place-name')  
    mainPlace.innerHTML = clientWeather[0].name

    updateWebsiteForecast(clientWeather[0], clientWeather[1])
  } else{
    //Set Brooklyn US New York as the location

    clientWeather.push(  //Pushing Current Weather JSON object to client Weather array
      await currentWeather(40.6526006, -73.9497211)
    )

    clientWeather.push(
      await weatherForecast(40.6526006, -73.9497211)
    )

    const mainPlace = document.querySelector('#main #place-name')  
    mainPlace.innerHTML = clientWeather[0].name + `,New York`

    updateWebsiteForecast(clientWeather[0], clientWeather[1])

  }

 //Update page information to a city in that country
}

function searchCity(e){ //Look for the possible locations that the user wants to look for when inputing in the search bar

  let usrInput = e.target.value //user input stored

  if(!searchDiv.querySelector('ul')){ //create an ul element if there's no ul element already
    listDiv.append(document.createElement('ul'))

    listDiv.querySelector('ul').setAttribute('id', 'list-cities')
  }


  if(typeof(usrInput)==='string' && usrInput !== ''){
    const listOfCities = searchDiv.querySelector('#list-cities')

    weatherLocation(usrInput).then(res=>{
      const cities = res
      
      cities.forEach((city,idx)=>{
        
        const arrCities = listOfCities.children

        if( city.state === undefined ){city.state = ''}
        
        if(arrCities.length < 5){
          listOfCities.append(document.createElement('li'))
        }    

        arrCities[idx].setAttribute('id', `${idx}`)
        arrCities[idx].setAttribute('name', `${city.name}`)
        arrCities[idx].setAttribute('country', `${city.country}`)
        arrCities[idx].setAttribute('state', `${city.state}`)

        arrCities[idx].innerHTML = 
        `<a lat="${city.lat}" lon="${city.lon}" href='#'>${city.name} ${city.country} ${city.state}`
        
      
      })

      function checkRepeatedCities(){

        const arrCities = listOfCities.children

        function createArr(arr){
          const newArr = []
          for(const city of arr){
            newArr.push({id: city.id,
              city: city.getAttribute('name'), 
              country: city.getAttribute('country'), 
              state: city.getAttribute('state')})
          }
  
          return newArr
        }
  
        const arrComparingCities = createArr(arrCities)
  
        for(let i = 1; i < arrCities.length; i++){
  
          for(let j = 0; j < arrComparingCities.length; j++){
            
            if(arrCities[i].getAttribute('id') === arrComparingCities[j].id){
              j++
            } 
  
            if(j >= arrComparingCities.length){
              break
            }
            
            if(arrCities[i].getAttribute('name') === arrComparingCities[j].city &&
              arrCities[i].getAttribute('country') === arrComparingCities[j].country &&
              arrCities[i].getAttribute('state') === arrComparingCities[j].state){
              arrCities[i].remove()
              i--
              break
            }
          }
  
        }
      }

      checkRepeatedCities()

      if(listOfCities.children.length){
        for(const anchorTag of listOfCities.children){
          anchorTag.querySelector('a').onclick = clickedCity
        }
      }

    }).catch(err => console.log(err))
  } else if (usrInput===''){ //If user input is empty delete the ul element
    const listOfCities = searchDiv.querySelector('#list-cities')
    listOfCities.remove()
  }

}

async function weatherLocation(usrLocation) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${usrLocation}&limit=5&appid=de6c0474c79ad34ad40f709c9cd3d079`);
    
    return await response.json();; 
}

async function currentWeather(usrLocationLatitud, usrLocationLongitud){
  console.log(usrLocationLatitud + ' ' + usrLocationLongitud)

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${usrLocationLatitud}&lon=${usrLocationLongitud}&appid=${config.openWeatherKey}&units=imperial`);
  
  return await response.json();

}

async function weatherForecast(usrLocationLatitud, usrLocationLongitud){
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${usrLocationLatitud}&lon=${usrLocationLongitud}&appid=${config.openWeatherKey}&units=imperial&cnt=40`);
  
  return await response.json();

}

async function clickedCity(event){

  const mainPlace = document.querySelector('#place-name')
  
  event.preventDefault()

  removeOldCards()

  const currentLat = event.currentTarget.getAttribute('lat')
  const currentLon = event.currentTarget.getAttribute('lon')

  const currentWeatherJSON = 
  await currentWeather(currentLat,currentLon).then(res=>res).catch(err=>console.log(err))

  const weatherForecastJSON = 
  await weatherForecast(currentLat,currentLon).then(res=>res).catch(err=>console.log(err))
 

  mainPlace.innerHTML = `${event.target.parentNode.getAttribute('name')},${event.target.parentNode.getAttribute('state')}`

  updateWebsiteForecast(currentWeatherJSON, weatherForecastJSON)
  
}

function currentLocationTime(timezoneOffset){
  
  const dateObj = new Date()
  const gmt = dateObj.getTime() + (dateObj.getTimezoneOffset()*60*1000)
  const currentlocation = gmt + (timezoneOffset*1000)

  let timeString = new Date(currentlocation).toTimeString().slice(0,5)

  if(Number(timeString.replace(':', '')) >= 1200){
    timeString += ' PM'
  } else{
    timeString += ' AM'
  }

  return timeString
}

function updateCardDate(dateString){
  const fullDate = new Date(dateString).toString()
  const day = fullDate.slice(0,10)
  let time = fullDate.slice(16,21)

  if(Number(time.replace(':', '')) >=1200){
    time += ' PM'
  } else{
    time += ' AM'
  }

  if(fullDate.slice(8,15) === Date().slice(8,15)){
    return {day: 'Today', time: time}
  } else{
    return {day: day, time: time}
  }
}

function removeOldCards(){

  document.querySelector('#forecast').querySelector('h1').remove()
  
  const oldHourlyDiv = document.querySelector('#hourly')
  const oldButtons = oldHourlyDiv.querySelectorAll('button')

  oldHourlyDiv.removeChild(
    oldHourlyDiv.querySelector('#cards'),
    oldButtons[0],
    oldButtons[1]
  )

}

function createWeatherCards(forecastJSON){

  function scrollCards(event){

    event.stopPropagation()
    
    const scrollDirection = event.currentTarget.getAttribute('class')
    
    const card = document.querySelector('#card-1')
    const cardStyle = getComputedStyle(document.querySelector('#cards'))
    const cardGap = Number(cardStyle.gap.slice(0,2))
  
    const cardWidth = card.offsetWidth + cardGap +0.2
    console.log('cardWith = ' + cardWidth)
    
  
    let scrollValue = document.querySelector('#cards').scrollLeft
  
    console.log('scrollValue % cardWidth = ' +scrollValue%cardWidth)
    console.log('scrollValue = ' + scrollValue)
  
    if(scrollValue === 0 || (scrollValue%cardWidth >= cardWidth-10 || scrollValue%cardWidth <= 15 ) ){
      
      if(scrollDirection === 'scrollRight'){
        
        if(cardCounter !== 39){
          cardCounter++
          document.querySelector('#cards').scrollLeft = cardWidth * cardCounter
        }
      } else{
        if(cardCounter !== 0){
          cardCounter--
          document.querySelector('#cards').scrollLeft = cardWidth * cardCounter
        }
      }
    }
  }

  document.querySelector('#hourly').append(document.createElement('div'))

  document.querySelector('#hourly div').setAttribute('id','cards')

  let cardCounter = 0

  forecastJSON.list.forEach((item,idx) => {

    const weatherCardArr = document.querySelector('#cards').children

    document.querySelector('#cards').append(document.createElement('div'))
    
    weatherCardArr[idx].setAttribute('id', `card-${idx}`)
    weatherCardArr[idx].setAttribute('class', 'card')

    addCardInfo(item,idx)

    if(weatherCardArr.length === forecastJSON.list.length){
      const hourlyDiv = document.querySelector('#hourly')
      const forecastDivChildren = document.querySelector('#forecast').children

      forecastDivChildren[1].parentNode.insertBefore(document.createElement('h1'),forecastDivChildren[1])

      const h1Elmnt = document.querySelector('#forecast h1')
      h1Elmnt.innerHTML = '5-day Forecast'

      hourlyDiv.prepend(document.createElement('button'))
      hourlyDiv.append(document.createElement('button'))

      hourlyDiv.children[0].innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-bar-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z"/>
</svg>
      `
      hourlyDiv.children[0].setAttribute('class', 'scrollLeft')
      hourlyDiv.children[0].setAttribute('id', 'scroll-btn')

      hourlyDiv.children[hourlyDiv.children.length-1].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-bar-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8Zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5Z"/>
    </svg>
      `
      hourlyDiv.children[hourlyDiv.children.length-1].setAttribute('class', 'scrollRight')
      hourlyDiv.children[hourlyDiv.children.length-1].setAttribute('id', 'scroll-btn')

      document.querySelectorAll('#scroll-btn').forEach(btn => btn.onclick = scrollCards)
    }

  })

}

function addCardInfo(item,idx){

  const currentCard = document.querySelector(`#cards`).children[idx]

  currentCard.append(
    document.createElement('h1'),
    document.createElement('p'),
    document.createElement('p'),
    document.createElement('p'),
    document.createElement('p'),
    document.createElement('div')
  )

  const dateTxt = updateCardDate(item.dt_txt)

  currentCard.querySelector('h1').innerHTML = `
    ${dateTxt.day}<br>
    ${dateTxt.time}<br>
  `
  const textElementsMain = currentCard.querySelectorAll('p')

  textElementsMain[0].innerHTML = `
  <strong>Temperature:</strong> <span class='textRight'>${item.main.temp} °F</span> <br>`
  textElementsMain[1].innerHTML = `
  <strong>Feels Like:</strong> <span class='textRight'>${item.main.feels_like} °F</span>`
  textElementsMain[2].innerHTML = `
  <strong>Max Temperature:</strong> <span class='textRight'>${item.main.temp_max} °F</span>`
  textElementsMain[3].innerHTML = `
  <strong>Min Temperature:</strong> <span class='textRight'>${item.main.temp_min} °F</span>`

  currentCard.querySelector('div')
  .setAttribute('class', 'weatherInfoCard')
  
  currentCard.querySelector('div').append(document.createElement('img'))
  
  currentCard.querySelector('div').append(document.createElement('aside'))
    
  currentCard.querySelector('div').querySelector('img').setAttribute('src', `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`)

  const asideElement = currentCard.querySelector('aside')

  asideElement.append(
    document.createElement('p'),
    document.createElement('p'),
    document.createElement('p')
  )
  
  const textElementsAside = asideElement.querySelectorAll('p')
  
  textElementsAside[0].innerHTML = `
  ${item.weather[0].description.charAt(0).toUpperCase()}${item.weather[0].description.slice(1)}<br>`
  textElementsAside[1].innerHTML = `
  <strong>Wind Speed:</strong> <br>${item.wind.speed} mph<br>`

}

function updateWebsiteForecast(currentWeatherJSON, forecastJSON){
  const mainPlace = document.querySelector('#place-name')
  const mainTemp = document.querySelector('#main #temp')
  const mainHigh = document.querySelector('#main #high')
  const mainLow = document.querySelector('#main #low')

  const mainWeatherImg = document.querySelector('#main #weather-img')
  const mainWeatherDescription = document.querySelector('#main #weather-description')
  const mainTime = document.querySelector('#main #time')

  const resultStr = mainPlace.textContent
  
  function reformatCity(str) {
    const separator = str.indexOf(',')
    const cityName = str.slice(0, separator)
    const cityState = str.slice(separator+1)

    return {cityName: cityName, cityState: cityState}
  }

  const cityName = reformatCity(resultStr).cityName
  const cityState = reformatCity(resultStr).cityState

  const locationTime = currentLocationTime(currentWeatherJSON.timezone)

  console.log(currentWeatherJSON)

  mainPlace.innerHTML = `<span>${currentWeatherJSON.sys.country}</span><br>
  <span>${cityName}</span><br>
  <span>${cityState}</span>`
  mainTime.innerHTML = `${locationTime}`
  mainTemp.innerHTML = `${currentWeatherJSON.main.temp}°F`
  mainHigh.innerHTML = `High: ${currentWeatherJSON.main.temp_max}°F`
  mainLow.innerHTML = `Low: ${currentWeatherJSON.main.temp_min}°F`
  mainWeatherDescription.innerHTML = `
  ${currentWeatherJSON.weather[0].description.charAt(0).toUpperCase() + 
    currentWeatherJSON.weather[0].description.slice(1)}`
  mainWeatherImg.setAttribute('src', `https://openweathermap.org/img/wn/${currentWeatherJSON.weather[0].icon}@2x.png`
  )
  createWeatherCards(forecastJSON)
  backgroundWeather(currentWeatherJSON.weather[0].main, 
    Number(locationTime.replace(':', '')
    .replace('PM','')
    .replace('AM','')))
}

