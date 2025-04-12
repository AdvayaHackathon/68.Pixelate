const images = {
    hotel: [
      "img/non-veg.jpg",
      "img/mutton1.jpg",
      "img/parota1.jpg"
    ],
    homestay: [
      "img/veg1.jpg",
      "img/veg2.jpg",
      "img/veg3.jpg"
    ],
    resort: [
      "img/swwet1.jpg",
      "img/sweet2.jpg",
      "img/sweet3.jpg"
    ]
  };
  
  const qrCodes = {
    hotel: [
      "img/briyani.jpg",
      "img/mutton.jpg",
      "img/parota.jpg"
    ],
    homestay: [
      "img/pongal.jpg",
      "img/ragi.jpg",
      "img/idili.jpg"
    ],
    resort: [
      "img/kolu.jpg",
      "img/adhi.jpg",
      "img/akria.jpg"
    ]
  };
  
  let currentType = 'hotel';
  let qrVisible = false;
  
  function showContent(type) {
    currentType = type;
    qrVisible = false;
  
    const imageContainer = document.getElementById("imageContainer");
    const qrContainer = document.getElementById("qrContainer");
  
    imageContainer.innerHTML = "";
    qrContainer.innerHTML = "";
    qrContainer.style.display = "none";
  
    images[type].forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      imageContainer.appendChild(img);
    });
  }
  
  function toggleQR() {
    const qrContainer = document.getElementById("qrContainer");
    qrContainer.innerHTML = "";
  
    qrCodes[currentType].forEach(src => {
      const qr = document.createElement("img");
      qr.src = src;
      qr.alt = "QR code";
      qrContainer.appendChild(qr);
    });
  
    qrContainer.style.display = qrVisible ? "none" : "flex";
    qrVisible = !qrVisible;
  }
  
  window.onload = () => {
    showContent('hotel');
  };
  