import React, { useState, useEffect } from "react";
import axios from "axios";
import "./scss/WeeklyWeather.scss";

const WeeklyWeather = () => {
  const [temp, setTemp] = useState(0);
  const [tempMax, setTempMax] = useState(0);
  const [tempMin, setTempMin] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(true);
  const [cityName, setCityName] = useState("Seoul");
  const [weeklyWeather, setWeeklyWeather] = useState([]);

  // 이미지 경로 불러오기 함수
  function importAll(r) {
    let images = {};
    r.keys().forEach((key) => (images[key] = r(key)));
    return images;
  }

  // icons 폴더 내의 모든 이미지 파일 불러오기
  // const icons = Object.values(importAll(require.context("./icons/", false, /\.(png)$/)));
  // icons 폴더 내의 모든 이미지 파일 가져오기

  // const icons = [
  //   { image: require("./icons/01d.png"), code: "01d" },
  //   { image: require("./icons/01n.png"), code: "01n" },
  //   { image: require("./icons/02d.png"), code: "o2d" },
  //   { image: require("./icons/02n.png"), code: "02n" },
  //   { image: require("./icons/03d.png"), code: "03d" },
  //   { image: require("./icons/03n.png"), code: "03n" },
  //   { image: require("./icons/04d.png"), code: "04d" },
  //   { image: require("./icons/04n.png"), code: "04n" },
  //   { image: require("./icons/09d.png"), code: "09d" },
  //   { image: require("./icons/09n.png"), code: "09n" },
  //   { image: require("./icons/10d.png"), code: "10d" },
  //   { image: require("./icons/10n.png"), code: "10n" },
  //   { image: require("./icons/11d.png"), code: "11d" },
  //   { image: require("./icons/11n.png"), code: "11n" },
  //   { image: require("./icons/13d.png"), code: "13d" },
  //   { image: require("./icons/13n.png"), code: "13n" },
  //   { image: require("./icons/50d.png"), code: "50d" },
  //   { image: require("./icons/50n.png"), code: "50n" },
  //   { image: require("./icons/unknown.png"), code: "unknown" }
  // ];

  const icons = {
    "01d": require("./icons/01d.png").default,
    "01n": require("./icons/01n.png").default,
    "02d": require("./icons/02d.png").default,
    "02n": require("./icons/02n.png").default,
    "03d": require("./icons/03d.png").default,
    "03n": require("./icons/03n.png").default,
    "04d": require("./icons/04d.png").default,
    "04n": require("./icons/04n.png").default,
    "09d": require("./icons/09d.png").default,
    "09n": require("./icons/09n.png").default,
    "10d": require("./icons/10d.png").default,
    "10n": require("./icons/10n.png").default,
    "11d": require("./icons/11d.png").default,
    "11n": require("./icons/11n.png").default,
    "13d": require("./icons/13d.png").default,
    "13n": require("./icons/13n.png").default,
    "50d": require("./icons/50d.png").default,
    "50n": require("./icons/50n.png").default,
    "unknown": require("./icons/unknown.png").default
  };
  



  useEffect(() => {
    const apiKey = "8507099a51be8da18d7fbb936ef08991";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    axios
      .get(url)
      .then((responseData) => {
        const data = responseData.data;
        setTemp(data.main.temp);
        setTempMax(data.main.temp_max);
        setTempMin(data.main.temp_min);
        setHumidity(data.main.humidity);
        setDesc(data.weather[0].description);
        setIcon(data.weather[0].icon);
        setLoading(false);
      })
      .catch((error) => console.log(error));

    const weeklyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
    axios
      .get(weeklyUrl)
      .then((responseData) => {
        const data = responseData.data;
        const dailyData = data.list.filter((item, index) => index % 8 === 0);
        const formattedData = dailyData.map((item) => {
          const date = new Date(item.dt * 1000);
          const options = { weekday: "short", month: "short", day: "numeric" };
          const formattedDate = date.toLocaleDateString("ko-KR", options);
          const { temp_max: tempMax, temp_min: tempMin } = item.main;
          const { icon } = item.weather[0];
          return {
            date: formattedDate,
            day: date.toLocaleDateString("ko-KR", { weekday: "long" }),
            tempMax,
            tempMin,
            icon,
          };
        });
        setWeeklyWeather(formattedData);
      })
      .catch((error) => console.log(error));
  }, [cityName]);

  const handleCityChange = (event) => {
    setCityName(event.target.value);
    setLoading(true);
  };



  const matchedIcon = icons[icon];
  const imageSrc = matchedIcon || null;

  console.log("이미지 불러와져라아아아ㅏ!", imageSrc)
  console.log("하하하하호호호호", matchedIcon)
  console.log("이런 젠장", icons)
  console.log("이런 젠장 ㅜㅜㅜ", icon)
  
  return (
    <div className="weather">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="apiinfo">
          <div className="wttopitem">
            <div className="imgbox111">
              <img src={`https://openweathermap.org/img/w/${icon}.png`} alt={desc} />
              {imageSrc && <img src={imageSrc} alt="" />}

            </div>
            <div className="wtinfo">
              <select onChange={handleCityChange} value={cityName}>
                <option value="Seoul">서울</option>
                <option value="Incheon">인천</option>
                <option value="Busan">부산</option>
                <option value="Daegu">대구</option>
                <option value="Daejeon">대전</option>
                <option value="Gwangju">광주</option>
                <option value="Ulsan">울산</option>
                <option value="Suwon">수원</option>
                <option value="Goyang">고양</option>
                <option value="Yongin">용인</option>
                <option value="Changwon">창원</option>
                <option value="Seongnam">성남</option>
                <option value="Cheongju">청주</option>
                <option value="Cheonan">천안</option>
                <option value="Namyangju">남양주</option>
                <option value="Hwaseong">화성</option>
                <option value="Bucheon">부천</option>
                <option value="Jeonju">전주</option>
                <option value="Ansan">안산</option>
                <option value="Anyang">안양</option>
              </select>
              <div>현재온도: {(temp - 273.15).toFixed(0)}°</div>
              <div>최대온도: {(tempMax - 273.15).toFixed(0)}°</div>
              <div>최저온도: {(tempMin - 273.15).toFixed(0)}°</div>
              <div>습도: {humidity} %</div>
            </div>
          </div>

          <div className="weekly-weather">
            <div className="weather-list">
              {weeklyWeather.slice(1).map((weather, index) => (
                <div className="weather-item" key={index}>
                  <img src={`https://openweathermap.org/img/w/${weather.icon}.png`} alt="" />
                  <div>
                    <p>{weather.date}</p>
                    <p>{weather.day}</p>
                    <p>
                      {(weather.tempMax - 273.15).toFixed(0)}° &nbsp;&nbsp;
                      {(weather.tempMin - 273.15).toFixed(0)}°
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyWeather;
