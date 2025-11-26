document.getElementById("refresh").addEventListener("click", fetchWeather);

async function fetchWeather() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();

    document.getElementById("temp").textContent = data.temp;
    document.getElementById("hum").textContent = data.hum;
    document.getElementById("press").textContent = data.press;

  } catch (err) {
    alert("Gagal ambil data: " + err.message);
  }
}

fetchWeather();
