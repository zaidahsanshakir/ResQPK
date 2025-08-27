let otpVerified = false;

// 📩 Send OTP (static)
function sendOTP() {
  const contact = document.getElementById("contact").value.trim();
  if (!contact) {
    alert("Please enter your contact number first.");
    return;
  }
  document.getElementById("otpMessage").classList.remove("hidden");
  alert("Static OTP sent: 1234 (for demo)");
}

// ✅ Verify OTP
function verifyOTP() {
  const otpInput = document.getElementById("otpInput").value.trim();
  if (otpInput === "1234") {
    otpVerified = true;
    alert("OTP Verified ✅ You can now book.");
    document.getElementById("bookBtn").disabled = false;
  } else {
    alert("Invalid OTP ❌");
  }
}

// 🚑 Book Service
function bookService(type) {
  const name = document.getElementById("name").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!name || !contact) {
    alert("⚠️ Please fill all fields.");
    return;
  }
  if (!otpVerified) {
    alert("⚠️ Please verify your phone number with OTP first.");
    return;
  }

  document.getElementById("booking").style.display = "none";
  document.getElementById("details").classList.remove("hidden");

  // Driver + vehicle info
  const drivers = { ambulance: "Ali Khan" };
  const vehicles = { ambulance: "Toyota Hiace" };

  document.getElementById("driverName").innerText = drivers[type];
  document.getElementById("vehicleBrand").innerText = vehicles[type];

  // Start 10-min timer
  startTimer(10 * 60);

  // Show map
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const map = L.map('map').setView([lat, lon], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);

      L.marker([lat, lon]).addTo(map).bindPopup("📍 You are here").openPopup();
    });
  }
}

function startTimer(seconds) {
  let timer = seconds;
  const display = document.getElementById("timer");
  const interval = setInterval(() => {
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    display.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
    if (--timer < 0) {
      clearInterval(interval);
      display.textContent = "Arrived 🚑";
    }
  }, 1000);
}

function callDriver() {
  window.location.href = "tel:+923001234567";
}

function whatsappDriver() {
  window.open("https://wa.me/923001234567", "_blank");
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}
