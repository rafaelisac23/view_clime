import { WeatherDataType } from "@/types/WeatherDataType";
import { useEffect, useState } from "react";
import { NoFoundCity } from "./components/NoFoundCity";

const Page = () => {
  const [weather, setWeather] = useState<WeatherDataType | null>(null);

  const getInitialClime = async () => {
    navigator.geolocation.getCurrentPosition(
      //sucess
      async (position) => {
        const lat = position.coords.latitude.toFixed(2);
        const long = position.coords.longitude.toFixed(2);
        const api_key = "548523f0bd184667a1714558ac01ecc7";
        const lang = "pt_br";

        try {
          const req = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}&lang=${lang}`
          );
          const data = await req.json();
          setWeather(data);
        } catch (error) {
          setWeather(null);
        }
      },
      //failure
      (error) => {
        setWeather(null);
      }
    );
  };

  useEffect(() => {
    getInitialClime();
  }, []);
  return (
    <div className=" min-h-screen flex items-center justify-center">
      {weather !== null && <div>a</div>}
      {weather === null && (
        <div>
          <NoFoundCity />
        </div>
      )}
    </div>
  );
};

export default Page;
