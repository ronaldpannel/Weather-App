const apiKey = "1cab8e93d68f9e8335d4e94d794c9f58";

const weatherDataEl = document.getElementById("weatherData");
const cityInputEl = document.getElementById("cityInput");
const temperatureEl = document.getElementById("temp");
const feelsLikeEl = document.getElementById("feelsLike");
const windSpeedEl = document.getElementById("windSpeed");
const humidityEl = document.getElementById("humidity");
const descriptionEl = document.getElementById("description");
const formEl = document.querySelector("form");
const iconEl = document.querySelector(".icon");
const cityEl = document.getElementById("city");
const countryEl = document.getElementById("country");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new error("network response failed");
    }
    const data = await response.json();
    console.log(data);
    const temp = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const feelsLike = Math.round(data.main.feels_like);
    const windSpeed = Math.round(data.wind.speed);
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;
    const city = data.name;
    const country = data.sys.country;

    temperatureEl.innerText = `${temp}℃`;
    cityEl.innerText = `City-- ${city}`;
    countryEl.innerText = `Country-- ${country}`;
    humidityEl.innerText = `Humidity ${humidity}%`
    feelsLikeEl.innerHTML = `Feels like ${feelsLike}℃`;
    windSpeedEl.innerHTML = `Wind speed ${windSpeed}m/s`;
    descriptionEl.innerHTML = description;
    iconEl.innerHTML = `<img
            src="http://openweathermap.org/img/wn/${icon}.png"
            alt="weather icon"
          />`;
  } catch (error) {
    temperatureEl.innerText = "";
    cityEl.innerText = "";
    countryEl.innerText = "";
    humidityEl.innerHTML = "";
    feelsLikeEl.innerHTML = "";
    windSpeedEl.innerHTML = "";
    descriptionEl.innerHTML = "An error accrued, please try again later";
    iconEl.innerHTML = "";
  }
}
//https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric
