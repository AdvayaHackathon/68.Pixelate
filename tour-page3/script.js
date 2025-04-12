function showGallery(type) {
  // Hide all galleries
  document.querySelectorAll('.img-gallery').forEach(gallery => {
    gallery.style.display = 'none';
  });
  // Show selected gallery
  document.getElementById(`${type}-gallery`).style.display = 'flex';
}
const images = ["ooty2.jpeg", "ooty.webp", "img/guduchi.jpg"];
const videos = ["", "img/video2.mp4", "video3.mp4"];

let imgIndex = 0;
let vidIndex = 0;

function showImage(index) {
  document.getElementById("imageBox").src = images[index];
}

function showVideo(index) {
  const video = document.getElementById("videoBox");
  video.querySelector("source").src = videos[index];
  video.load();
}

function nextImage() {
  imgIndex = (imgIndex + 1) % images.length;
  showImage(imgIndex);
}

function prevImage() {
  imgIndex = (imgIndex - 1 + images.length) % images.length;
  showImage(imgIndex);
}

function nextVideo() {
  vidIndex = (vidIndex + 1) % videos.length;
  showVideo(vidIndex);
}

function prevVideo() {
  vidIndex = (vidIndex - 1 + videos.length) % videos.length;
  showVideo(vidIndex);
}

// Highlight active sections in options
document.addEventListener('DOMContentLoaded', function() {
  const optionLinks = document.querySelectorAll('.options a');
  const sections = {};
  
  // Get all sections referenced in options
  optionLinks.forEach(link => {
    const sectionId = link.getAttribute('href').substring(1);
    sections[sectionId] = document.getElementById(sectionId);
  });

  function checkActiveSections() {
    const scrollPosition = window.scrollY;
    
    optionLinks.forEach(link => {
      const sectionId = link.getAttribute('href').substring(1);
      const section = sections[sectionId];
      
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= (sectionTop - 200) && 
            scrollPosition < (sectionTop + sectionHeight - 200)) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }
  
  window.addEventListener('scroll', checkActiveSections);
  checkActiveSections(); // Run once on load
});
const map = L.map('poi-map').setView([11.1271, 78.6569], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let searchMarkers = L.layerGroup().addTo(map);
let userMarker = null;
let routingControl = null;
let watchId = null;
let currentDestination = null;

function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (
      location.protocol !== 'https:' &&
      location.hostname !== 'localhost' &&
      location.hostname !== '127.0.0.1'
    ) {
      const errMsg = 'Geolocation must be accessed over HTTPS or on localhost/127.0.0.1';
      alert(errMsg);
      return reject(new Error(errMsg));
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve([position.coords.latitude, position.coords.longitude]),
        (error) => reject(error),
        { timeout: 1000 }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
      reject(new Error('Geolocation not supported'));
    }
  });
}

function buildOverpassQuery(category, lat, lon, radius = 1000) {
  let queryFilter = '';
  switch (category) {
    case 'bank':
      queryFilter = 'node["amenity"="bank"]';
      break;
    case 'atm':
      queryFilter = 'node["amenity"="atm"]';
      break;
    case 'resort':
      queryFilter = 'node["tourism"="resort"]';
      break;
  }
  return `[out:json];
    ${queryFilter}(around:${radius},${lat},${lon});
    out;`;
}

async function searchPOIs(category) {
  try {
    const [lat, lon] = await getUserLocation();

    map.setView([lat, lon], 13);
    if (!userMarker) {
      userMarker = L.marker([lat, lon]).addTo(map).bindPopup('<b>You are here!</b>').openPopup();
    } else {
      userMarker.setLatLng([lat, lon]);
    }

    searchMarkers.clearLayers();

    const query = buildOverpassQuery(category, lat, lon);
    const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.elements.length > 0) {
      data.elements.forEach((element) => {
        const name = element.tags?.name || category.charAt(0).toUpperCase() + category.slice(1);
        const marker = L.marker([element.lat, element.lon])
          .addTo(searchMarkers)
          .bindPopup(`<b>${name}</b><br>Click marker to navigate`);
        marker.on('click', () => startRealTimeNavigation(element.lat, element.lon));
      });
    } else {
      alert(`No ${category} locations found within 1000 meters.`);
    }
  } catch (error) {
    console.error('Search failed:', error);
  }
}

function startRealTimeNavigation(destLat, destLon) {
  currentDestination = [destLat, destLon];

  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
  }

  watchId = navigator.geolocation.watchPosition(
    (position) => {
      const userLatLng = [position.coords.latitude, position.coords.longitude];

      if (!userMarker) {
        userMarker = L.marker(userLatLng).addTo(map).bindPopup("You're here!");
      } else {
        userMarker.setLatLng(userLatLng);
      }

      map.setView(userLatLng, 15);
      updateRoute(userLatLng, currentDestination);
    },
    (err) => {
      console.error('Real-time tracking error:', err);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 5000
    }
  );
}

function updateRoute(from, to) {
  if (routingControl) {
    map.removeControl(routingControl);
  }

  routingControl = L.Routing.control({
    waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
    routeWhileDragging: false,
    addWaypoints: false,
    draggableWaypoints: false,
    createMarker: () => null
  }).addTo(map);
}

