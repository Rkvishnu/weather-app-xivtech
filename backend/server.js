import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const API_KEY = process.env.API_KEY;

app.post("/getweather", async (req, res) => {
  try {
    const { cities } = req.body;

    const weatherData = {};
    for (const city of cities) {
      const temp = await getWeatherData(city);
      weatherData[city] = `${temp}C`;
    }

    res.json({ weather: weatherData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

async function getWeatherData(city) {
  try {
    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY}`;
    const response = await axios.get(url);
    const temperature = response.data.data[0].temp;
    return temperature;
  } catch (error) {
    console.log(`Error in fetching the weather for ${city}`, error.message);
    return "N/A";
  }
}

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
