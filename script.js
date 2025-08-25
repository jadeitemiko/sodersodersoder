// Language translations
const translations = {
  en: {
    siteTitle: "Södermalm Guide",
    eat: "Eat",
    eatIntro: "Discover the best restaurants and cafés in Södermalm.",
    eatMore: "Sample hidden gems, from vegan bistros to classic Swedish dining.",
    drink: "Drink",
    drinkIntro: "Bars, pubs, and late-night spots worth a visit.",
    drinkMore: "From craft cocktails to cozy wine bars.",
    do: "Do",
    doIntro: "Cultural experiences, shopping, and things to do.",
    doMore: "Explore galleries, bookstores, and local design shops.",
    events: "Events",
    eventsIntro: "What’s happening tonight and this week in Södermalm.",
    plan: "Plan your day",
    readMore: "Read more"
  },
  sv: {
    siteTitle: "Södermalmsguiden",
    eat: "Äta",
    eatIntro: "Upptäck de bästa restaurangerna och caféerna på Södermalm.",
    eatMore: "Prova dolda pärlor, från veganska bistron till klassisk svensk husmanskost.",
    drink: "Dricka",
    drinkIntro: "Barer, pubar och nattliv värda ett besök.",
    drinkMore: "Från kreativa cocktails till mysiga vinbarer.",
    do: "Göra",
    doIntro: "Kulturella upplevelser, shopping och saker att göra.",
    doMore: "Utforska gallerier, bokhandlar och lokala designbutiker.",
    events: "Evenemang",
    eventsIntro: "Det som händer ikväll och den här veckan på Södermalm.",
    plan: "Planera din dag",
    readMore: "Läs mer"
  }
};

// Set language
function setLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach(el => {
    const key = el.getAttribute("data-lang");
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
}

// Read more toggle
function toggleReadMore(button) {
  const section = button.previousElementSibling;
  section.style.display = section.style.display === "block" ? "none" : "block";
  button.innerText = section.style.display === "block"
    ? (button.getAttribute("data-lang") === "readMore" && button.innerText === "Read more" ? "Show less" : "Visa mindre")
    : (button.getAttribute("data-lang") === "readMore" && button.innerText === "Show less" ? "Read more" : "Läs mer");
}

// Distance/time widget (simple placeholder)
// In production: use Google Maps Distance Matrix API
function getDistanceFromMedborgarplatsen() {
  const userLocation = { lat: 59.315, lng: 18.07 }; // Placeholder for testing
  const medborgarplatsen = { lat: 59.3143, lng: 18.0734 };

  // Simple Euclidean calc (not real travel time!)
  const distance = Math.sqrt(
    Math.pow(userLocation.lat - medborgarplatsen.lat, 2) +
    Math.pow(userLocation.lng - medborgarplatsen.lng, 2)
  ) * 111; // approx km per lat/lng degree

  document.getElementById("distance").innerText =
    `You are about ${distance.toFixed(2)} km from Medborgarplatsen (straight line).`;
} 
  if (typeof google === "undefined" || !google.maps) {
    document.getElementById("distance").innerText =
      "Google Maps API not loaded. Add your API key to enable distance/time calculation.";
    return;
  }

  const service = new google.maps.DistanceMatrixService();
  const origin = { lat: 59.3143, lng: 18.0734 }; // Medborgarplatsen

  // Use user’s location
  navigator.geolocation.getCurrentPosition(pos => {
    const destination = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    };

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: 'WALKING'
      },
      (response, status) => {
        if (status === 'OK') {
          const result = response.rows[0].elements[0];
          document.getElementById("distance").innerText =
            `From Medborgarplatsen: ${result.distance.text}, ${result.duration.text} walking.`;
        } else {
          document.getElementById("distance").innerText = "Distance data unavailable.";
        }
      }
    );
  }, () => {
    document.getElementById("distance").innerText = "Location access denied.";
  });
}
// Call on load
document.addEventListener("DOMContentLoaded", () => {
  setLanguage("en"); // default
  getDistanceFromMedborgarplatsen(); // fallback (straight-line calc)
  loadGoogleDistance(); // <-- uncomment once API key is ready
});

