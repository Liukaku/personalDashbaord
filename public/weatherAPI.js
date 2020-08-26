
const apikey = "";

let weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=53.478090&lon=-2.147543&units=metric&appid=' + apikey;

fetch(weatherUrl) 
    .then(resonse => resonse.json())
    .then(content => {
        console.log(content);

        const contentResponse = content;        

        let weatherImage = document.createElement('img');
        let dailyWeather = document.createElement('p');
        let dailyWeatherHeader = document.createElement('p');
        let feelsLike = document.createElement('p');
        let feelsLikeHeader = document.createElement('p');

        document.getElementById('dailyForecast').appendChild(weatherImage);

        switch (content.daily[0].weather[0].main) {
            case 'Clear':
                weatherImage.src = "weatherImages/clear.svg";
                document.querySelector('#weatherSection').style.backgroundImage = "url(weatherBackgrounds/clear.jpg)";
                break;
            
            case 'Clouds':
                weatherImage.src = "weatherImages/clouds.svg";
                document.querySelector('#weatherSection').style.backgroundImage = "url(weatherBackgrounds/cloudy.jpg)";
                break;
    
            case 'Rain':
                weatherImage.src = "weatherImages/rain.svg"
                document.querySelector('#weatherSection').style.backgroundImage = "url(weatherBackgrounds/rain.jpg)";
                break
            
            case 'Drizzle':
                weatherImage.src = "weatherImages/drizzle.svg"
                document.querySelector('#weatherSection').style.backgroundImage = "url(weatherBackgrounds/rain.jpg)";
                break

            case 'Mist':
                weatherImage.src = "weatherImages/mist.svg"
                document.querySelector('#weatherSection').style.backgroundImage = "url(weatherBackgrounds/mist.jpg)";
                break
            
            case 'Thunderstorm':
                weatherImage.src = "weatherImages/thunderStorm.svg"
                document.querySelector('#weatherSection').style.backgroundImage = "url(weatherBackgrounds/storm.jpg)";
                break
            
            case 'Snow':
                weatherImage.src = "weatherImages/snow.svg"
                document.querySelector('#weatherSection').style.backgroundImage = "url(weatherBackgrounds/snow.jpg)";
                break
    
            default:
                document.querySelector('#weatherSection').style.backgroundImage = "url(weatherBackgrounds/default.jpg)";
                break;
        }

        document.getElementById('dailyForecast').appendChild(dailyWeatherHeader);
        document.getElementById('dailyForecast').appendChild(dailyWeather);
        document.getElementById('dailyForecast').appendChild(feelsLikeHeader);
        document.getElementById('dailyForecast').appendChild(feelsLike);

        dailyWeather.innerText = content.daily[0].temp.day;
        dailyWeatherHeader.innerHTML = "Today"
        dailyWeatherHeader.className = "dailyWeatherHeader";
        feelsLike.innerText = content.daily[0].feels_like.day;
        feelsLikeHeader.innerHTML = "Feels Like";
        feelsLikeHeader.className = "feelsLikeHeader";

        for (let i = 0; i < content.daily.length; i++) {
               let hourlySelect = document.getElementById("hourly" + i);

               let hourlyWeatherImage = document.createElement('img');
               let hourlyWeather = document.createElement('p');

               hourlySelect.appendChild(hourlyWeatherImage);
               
               let hourSpacer = i;

               if (hourSpacer == 0) {
                   hourSpacer = 0;
               } else {
                   hourSpacer = i * 3;
               }

               switch (content.hourly[hourSpacer].weather[0].main) {
                case 'Clear':
                    hourlyWeatherImage.src = "weatherImages/clear.svg";
                    break;
                
                case 'Clouds':
                    hourlyWeatherImage.src = "weatherImages/clouds.svg";
                    break;
        
                case 'Rain':
                    hourlyWeatherImage.src = "weatherImages/rain.svg"
                    break
                
                case 'Drizzle':
                    hourlyWeatherImage.src = "weatherImages/drizzle.svg"
                    break
    
                case 'Mist':
                    hourlyWeatherImage.src = "weatherImages/mist.svg"
                    break
                
                case 'Thunderstorm':
                    hourlyWeatherImage.src = "weatherImages/thunderStorm.svg"
                    break
                
                case 'Snow':
                    hourlyWeatherImage.src = "weatherImages/snow.svg"
                    break
        
                default:
                    break;
            }

            hourlySelect.appendChild(hourlyWeather);
            hourlyWeather.innerHTML = content.hourly[hourSpacer].temp;
            
        }
    })
