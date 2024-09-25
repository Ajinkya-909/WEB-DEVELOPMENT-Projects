import { useState } from "react";
import "./App.css";

function App() {
  var data;

  const [src, setSrc] = useState("./weather/clear.png");
  const [temp, setTemp] = useState("22°C");
  const [HUM, setHum] = useState("22 %");
  const [WIN, setWin] = useState("22 m/s");
  const [value, setValue] = useState("");
  const [name, setName] = useState("City");
  function handleChange(e) {
    setValue(e.target.value);
  }
  function check() {
    let key = "faf783aeffe70c8bd2abbfb7cf280790";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=`;
    async function weather() {
      const responce = await fetch(url + value + `&appid=${key}`);
      data = await responce.json();
      if (data.message == "city not found") {
        setName("city not found");
        setHum("-");
        setWin("-");
        setTemp("");
      } else {
        setName(data.name);
        setHum(data.main.humidity + " %");
        setWin(Math.round(data.wind.speed) + " m/s");
        setTemp(Math.round(data.main.temp - 273.15) + " °C");

        let type = data.weather[0].main;
        let img;
        if (type == "Clouds") {
          img = "clouds";
          setSrc(`./weather/${img}.png`);
        } else if (type == "Haze" || type == "Mist") {
          img = "mist";
          setSrc(`./weather/${img}.png`);
        } else if (type == "Clear") {
          img = "clear";
          setSrc(`./weather/${img}.png`);
        } else if (type == "Snow") {
          img = "snow";
          setSrc(`./weather/${img}.png`);
        } else if (type == "Rain") {
          img = "rain";
          setSrc(`./weather/${img}.png`);
        } else if (type == "Drizzle") {
          img = "drizzle";
          setSrc(`./weather/${img}.png`);
        }
      }
    }
    weather();
  }
  return (
    <>
      <div className="B-G w-1/3 h-3/5 rounded-lg mt-12 p-2 mx-auto flex flex-col justify-around ">
        <div className="info flex w-full justify-around items-center">
          <input
            className="w-8/12 m-4 rounded-lg p-1 text-black"
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                check();
              }
            }}
            onChange={(e) => handleChange(e)}
            placeholder="Enter a City Name"
          />
          <button
            onClick={() => {
              check();
            }}
            className=" p-2 w-1/5 btn rounded-full bg-white font-extrabold"
          >
            FIND
          </button>
        </div>
        <div className="m-auto mb-8 text-white logo flex flex-col justify-around items-center">
          <img className="" src={src} />
          <p className="font-bold text-5xl ">
            {name} {temp}
          </p>
        </div>
        <div className="extra m-3 flex justify-between items-center">
          <div className=" w-max text-white one flex items-center justify-around h-fit">
            <img src="./weather/humidity.png" />
            <div className="w-fit text-xl flex flex-col justify-around m-4">
              <h2 className="text-3xl">{HUM}</h2>
              <p>Humidity</p>
            </div>
          </div>
          <div className="one w-max  flex text-white items-center justify-center  h-fit">
            <img src="./weather/wind.png" />
            <div className="w-fit text-xl flex flex-col justify-around m-4">
              <h2 className="text-3xl">{WIN}</h2>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
