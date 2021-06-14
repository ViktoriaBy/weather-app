const form = document.querySelector('.top-part form');
const input = document.querySelector('.top-part input');
const msg = document.querySelector(".top-part .msg");
const list = document.querySelector('.last-part .cities');

const apiKey = 'bc4876fb101f1eefd13e30caf066e566';
const inputVal = input.value;


form.addEventListener('submit', e =>{
    e.preventDefault();
    const inputVal = input.value;

const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=imperial`;


fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const { main, name, weather,} = data;
        const icon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    
        const li = document.createElement('li');
        li.classList.add('city');

        const template = `
        <h2 class="city-name" data-name="${name}">
        <span>${name}</span>
        </h2>

        <div class="city-temp">${Math.round(main.temp)}<sup>°F</sup></div>

        <figure>
                <img class="weather-icon" src="${icon}" alt="${
                weather[0]["description"]
            }">
                <figcaption>${weather[0]["description"]}</figcaption>
                </figure>

        `
        li.innerHTML = template;

        if(list.hasChildNodes()){
            list.childNodes[0].remove();
            list.appendChild(li);
        }else{
            list.appendChild(li);
        }
        
        
    })
    .catch(() => {
            msg.textContent = "Please enter a valid city 😑";
        });

        msg.textContent = "";
        form.reset();
        input.focus();
});


