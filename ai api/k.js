const GEMINI_KEY = "AIzaSyDq8yv0a1IhX6C82W2D3KJkCeMaw8kv2Lo";
const WEATHER_KEY = "b2c5b477f503ea54bffa1455a210ff49";

// Setup animation styles
function setupWeatherAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    .weather-animation {
      position: fixed;
      top: 20px;
      right: 20px;
      font-size: 50px;
      z-index: 1000;
      pointer-events: none;
    }
    .weather-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      transition: background 0.5s ease;
    }
    .sunny { animation: float 3s ease-in-out infinite; }
    .clouds { animation: float 3s ease-in-out infinite; }
    .rain { animation: rainDrop 1s linear infinite; }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes rainDrop {
      0% { transform: translateY(-20px); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateY(20px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  if (!document.querySelector('.weather-bg')) {
    const bgDiv = document.createElement('div');
    bgDiv.className = 'weather-bg';
    document.body.appendChild(bgDiv);
  }
}

function setWeatherAnimation(weatherType) {
  const oldAnim = document.querySelector('.weather-animation');
  if (oldAnim) oldAnim.remove();

  const anim = document.createElement('div');
  anim.className = `weather-animation ${weatherType}`;
  anim.textContent =
    weatherType === 'rain' ? '🌧️' :
    weatherType === 'clouds' ? '☁️' : '☀️';
  document.body.appendChild(anim);

  const bgDiv = document.querySelector('.weather-bg');
  bgDiv.style.background =
    weatherType === 'rain' ? 'linear-gradient(to bottom, #4682B4, #708090)' :
    weatherType === 'clouds' ? 'linear-gradient(to bottom, #B0C4DE, #778899)' :
    'linear-gradient(to bottom, #87CEEB, #1E90FF)';
}

document.addEventListener('DOMContentLoaded', setupWeatherAnimations);

function getDaysInRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  return days;
}

async function generatePlan() {
  const city = document.getElementById("cityInput").value.trim();
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const customPrompt = document.getElementById("customPrompt").value.trim();
  const output = document.getElementById("output");

  if (customPrompt) {
    return await sendToGemini(customPrompt, output);
  }

  if (!city) {
    output.textContent = "❗ Please enter a city name.";
    return;
  }

  if (!startDate || !endDate) {
    output.textContent = "📅 Please select both start and end dates.";
    return;
  }

  output.textContent = "🌦 Getting weather forecast...";

  try {
    const days = getDaysInRange(startDate, endDate);
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_KEY}&units=metric`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    if (weatherData.cod !== "200") {
      output.textContent = "⚠️ City not found. Try again.";
      return;
    }

    const forecastMap = new Map();
    weatherData.list.forEach(entry => {
      const date = entry.dt_txt.split(" ")[0]; // e.g. '2025-04-12'
      if (!forecastMap.has(date)) {
        forecastMap.set(date, entry); // pick first forecast of that day
      }
    });

    let weatherInfo = `Weather forecast for ${city}:\n\n`;
    let dailySummaries = [];

    days.forEach((day, i) => {
      const dateStr = day.toISOString().split("T")[0];
      const forecast = forecastMap.get(dateStr);

      if (forecast) {
        const desc = forecast.weather[0].description;
        const temp = forecast.main.temp;
        const weatherType = forecast.weather[0].main.toLowerCase();

        weatherInfo += `${day.toDateString()}: ${desc}, ${temp}°C\n`;

        dailySummaries.push({
          day: i + 1,
          date: day.toDateString(),
          description: desc,
          temp,
          weatherType
        });

        setTimeout(() => {
          setWeatherAnimation(weatherType);
          output.textContent = `Checking weather for ${day.toDateString()}...`;
        }, i * 2000);
      } else {
        weatherInfo += `${day.toDateString()}: No forecast data.\n`;
      }
    });

    setTimeout(async () => {
      output.textContent = `${weatherInfo}\n\nGenerating trip plan...`;

      const planPrompt = `Create a ${days.length}-day Tamil Nadu trip plan for ${city} from ${startDate} to ${endDate}.
Each day has the following weather:
${dailySummaries.map(d => `Day ${d.day} (${d.date}): ${d.description}, ${d.temp}°C`).join('\n')}
Based on weather. Prefer indoor activities on rainy/cloudy days and outdoor on sunny days.
Format each as: "Day X: [Activity] - [Brief description]"`;

      await sendToGemini(planPrompt, output, weatherInfo);

    }, days.length * 2000);

  } catch (err) {
    console.error(err);
    output.textContent = "❌ Something went wrong. Please try again.";
  }
}

async function sendToGemini(prompt, output, weatherInfo = "") {
  try {
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const geminiData = await geminiRes.json();

    if (geminiData.candidates?.[0]?.content?.parts?.[0]?.text) {
      output.textContent = `${weatherInfo}\n\n${geminiData.candidates[0].content.parts[0].text}`;
    } else {
      output.textContent = `${weatherInfo}\n\nCould not generate trip plan. Try again.`;
    }
  } catch (e) {
    console.error(e);
    output.textContent = "❌ Failed to contact Gemini API.";
  }
}
