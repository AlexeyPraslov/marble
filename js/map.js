<<<<<<< HEAD
// Инициализация карты
const map = L.map("map", {
    center: [55.749521, 37.605267],
    zoom: 16,
    zoomControl: true,
    attributionControl: false,
    scrollWheelZoom: false,
});

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "",
    maxZoom: 19,
}).addTo(map);

// Создаем маркер с PNG изображением
const markerIcon = L.icon({
    iconUrl: "./images/logo.webp",
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
});

L.marker([55.749521, 37.605267], {
    icon: markerIcon,
}).addTo(map);
=======
// Инициализация карты
const map = L.map("map", {
    center: [55.749521, 37.605267],
    zoom: 16,
    zoomControl: true,
    attributionControl: false,
    scrollWheelZoom: false,
});

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "",
    maxZoom: 19,
}).addTo(map);

// Создаем маркер с PNG изображением
const markerIcon = L.icon({
    iconUrl: "./images/logo.webp",
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
});

L.marker([55.749521, 37.605267], {
    icon: markerIcon,
}).addTo(map);
>>>>>>> a0bb7fa97bc5c2aeb3dae7e377919fd1eaf43a9d
