const weatherForm = document.querySelector('form');
const search = document.querySelector('input')

const message_1 = document.querySelector('#Message-1')
const message_2 = document.querySelector('#Message-2')

// message_1.textContent = 'from js'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    message_1.textContent = 'Loading...'
    message_2.textContent = ''

    const location = search.value;

    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.err)
        // console.log(data.err);
        message_1.textContent = data.err;
        else{
        // console.log(`Current Temp : ${data.currentTemp}`);
        // console.log(`Current Wind : ${data.currentWind}`);
        // console.log(`Location : ${data.location}`);
        message_1.textContent = data.location
        message_2.innerHTML = `Current Temp : ${data.currentTemp} <br> Current Wind : ${data.currentWind} km/h`
    }
    })
})

    
})