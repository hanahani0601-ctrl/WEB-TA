let weatherData = [];
let weatherChart = null;
const DATA_URL = "data.json";
const UPDATE_INTERVAL = 15000;

// DOM Elements
const tempEl = document.getElementById("tempValue");
const humEl = document.getElementById("humValue");
const windEl = document.getElementById("windValue");
const dirEl = document.getElementById("dirValue");
const pressEl = document.getElementById("pressValue");
const weatherClassEl = document.getElementById("weatherClass");
const selectorEl = document.getElementById("chartSelector");
const chartCanvas = document.getElementById("weatherChart");

// Fetch JSON data
async function fetchData() {
  try {
    const response = await fetch(DATA_URL);
    weatherData = await response.json();
    updateDashboard();
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
}

// Update all dashboard elements
function updateDashboard() {
  if (weatherData.length === 0) return;

  const latest = weatherData[weatherData.length - 1];

  // Update metrics
  tempEl.textContent = `${latest.temperature.toFixed(1)} °C`;
  humEl.textContent = `${latest.humidity} %`;
  windEl.textContent = `${latest.wind_speed.toFixed(1)} m/s`;
  dirEl.textContent = `${latest.wind_direction} °`;
  pressEl.textContent = `${latest.pressure} hPa`;

  // Update weather classification
  weatherClassEl.textContent = classifyWeather(latest);

  // Update chart
  updateChart(selectorEl.value);
}

// Weather classification logic
function classifyWeather(data) {
  if (data.temperature > 30 && data.humidity < 70) {
    return "☀️ Panas & Cerah";
  }
  if (data.humidity > 85 && data.temperature < 28) {
    return "🌧️ Potensi Hujan";
  }
  if (data.wind_speed > 4) {
    return "🌬️ Berangin";
  }
  return "⛅ Berawan";
}

// Build / update chart
function updateChart(parameter) {
  const slicedData = weatherData.slice(-7);

  const labels = slicedData.map(d =>
    new Date(d.timestamp).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit"
    })
  );

  const dataMap = {
    temperature: {
      label: "Suhu (°C)",
      data: slicedData.map(d => d.temperature)
    },
    humidity: {
      label: "Kelembapan (%)",
      data: slicedData.map(d => d.humidity)
    },
    wind_speed: {
      label: "Kecepatan Angin (m/s)",
      data: slicedData.map(d => d.wind_speed)
    },
    wind_direction: {
      label: "Arah Angin (°)",
      data: slicedData.map(d => d.wind_direction)
    },
    pressure: {
      label: "Tekanan Udara (hPa)",
      data: slicedData.map(d => d.pressure)
    }
  };

  if (weatherChart) {
    weatherChart.destroy();
  }

  weatherChart = new Chart(chartCanvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: dataMap[parameter].label,
          data: dataMap[parameter].data,
          borderWidth: 2,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: "#e5e7eb"
          }
        }
      },
      scales: {
        x: {
          ticks: { color: "#94a3b8" }
        },
        y: {
          ticks: { color: "#94a3b8" }
        }
      }
    }
  });
}

// Event listeners
selectorEl.addEventListener("change", () => {
  updateChart(selectorEl.value);
});

// Init
fetchData();
setInterval(fetchData, UPDATE_INTERVAL);
