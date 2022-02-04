const btn = document.querySelector("#changeLocation");
const cityName = document.querySelector("#cityName");
const container = document.querySelector(".container");
const weatherInfo = document.querySelector("#weatherInfo");
const temp = document.querySelector("#temperature");
const maxMin = document.querySelector("#tempMaxMin");
const moreInfoItems = document.getElementsByClassName("moreInfo-item");
const iconImg = document.querySelector("#iconImg");
const iconDiv = document.querySelector("#icon");
const feelsLike = document.querySelector("#feelsLike");
btn.addEventListener("click", changeLocation);
function changeLocation() {
  let city = prompt("Enter city name: ");
  if (city !== "") {
    maxMin.innerHTML = "Max/Min: ";
    moreInfoItems[0].innerHTML = "Humidity: ";
    moreInfoItems[1].innerHTML = "Pressure: ";
    moreInfoItems[2].innerHTML = "Wind: ";
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c287d350008fcb9b02dfaa0f05abcb03&units=metric`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      cityName.innerHTML = `${data.name}, ${data.sys.country}`;
      weatherInfo.innerHTML = `${data.weather[0].main}`;
      temp.innerHTML = `${Math.round(data.main.temp)}&#176; C`;
      feelsLike.innerHTML = `Feels like: ${Math.round(
        data.main.feels_like
      )}&#176; C`;
      maxMin.innerHTML += `${Math.round(
        data.main.temp_max
      )}&#176; C / ${Math.round(data.main.temp_min)}&#176; C`;
      moreInfoItems[0].innerHTML += `${data.main.humidity}%`;
      moreInfoItems[1].innerHTML += `${data.main.pressure} mb`;
      moreInfoItems[2].innerHTML += `${Math.round(data.wind.speed)} km/h`;
      const daytime = data.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + daytime + "@2x.png";
      iconImg.src = iconUrl;
      iconImg.classList = "";
      console.log(daytime);
      if (daytime.charAt(daytime.length - 1) === "d") {
        container.style.backgroundColor = "#00ccff";
      } else {
        container.style.backgroundColor = "#5142f5";
      }
    });
}
