'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  evt.preventDefault()
  fetch('/fortune')
    .then((response) => response.text())
    .then((fortuneData) => {
    document.querySelector("#fortune-text").innerHTML = fortuneData;
  });
  // TODO: get the fortune and show it in the #fortune-text div
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  
  const zipcode = document.querySelector('#zipcode-field').value;
  const queryString = new URLSearchParams({zipcode: `${zipcode}`}).toString();
  const url = `/weather.json?${queryString}`;

  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
    document.querySelector('#weather-info').innerHTML = responseJson.forecast;
    })
  // TODO: request weather with that URL and show the forecast in #weather-info
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };

  fetch('/order-melons.json',{
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
      },
    })
    .then((response)=>response.json())
    .then((responseJson)=>{
      const div=document.querySelector('#order-status')
      div.innerHTML = responseJson.msg; 
      if(responseJson.code==='ERROR'){
        div.classList.add('order-error')
      }
      else if(responseJson.code==='OK'){
        div.classList.remove('order-error')
      }
    })
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);

document.querySelector('#dog-image').insertAdjacentHTML('afterbegin', '<img src="">')

function getDogPhoto(evt) {
  evt.preventDefault();

  
  fetch("https://dog.ceo/api/breeds/image/random")
  .then((response) =>response.json())
  .then((responseJson) => {
    const dogPhoto = document.querySelector('img');
    dogPhoto.setAttribute('src', responseJson.message)
  })
}
document.querySelector('#get-dog-image').addEventListener('click', getDogPhoto);