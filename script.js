const apiKey = "1cee1523a97a940472196d492db0ea58"; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");
const errorMsg = document.getElementById("errorMsg");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    showError("Please enter a city name.");
    return;
  }
  fetchWeather(city);
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();

    // Display weather info
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `🌡 Temperature: ${data.main.temp}°C`;
    description.textContent = `🌥 ${data.weather[0].description}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherResult.classList.remove("hidden");
    errorMsg.textContent = "";
  } catch (error) {
    showError(error.message);
  }
}

function showError(message) {
  weatherResult.classList.add("hidden");
  errorMsg.textContent = message;
}
