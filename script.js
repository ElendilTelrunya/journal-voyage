// Menu
function toggleMenu(){
  let menu = document.getElementById("menu");
  menu.classList.toggle("open");

  let content = document.getElementById("content");
  content.style.marginLeft = menu.classList.contains("open") ? "250px" : "0px";
}

// Pages
function showPage(page){
  document.querySelectorAll(".page").forEach(p=>p.style.display="none");
  if(page==="map") document.getElementById("mapPage").style.display="block";
  if(page==="albums") document.getElementById("albumsPage").style.display="block";
  if(page==="concerts") document.getElementById("concertsPage").style.display="block";
}

// Carte interactive avec markers
var map = L.map('map').setView([20,0],2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);

// Pays visités
let visitedCountries = JSON.parse(localStorage.getItem("visitedCountries")) || {};

// Liste simplifiée de pays
let countries = [
  {name:"France", coords:[46.603354,1.888334]},
  {name:"Italie", coords:[41.87194,12.56738]},
  {name:"Espagne", coords:[40.463667,-3.74922]},
  {name:"Japon", coords:[36.204824,138.252924]}
];

// Ajouter les markers
countries.forEach(c=>{
  let color = visitedCountries[c.name] ? "gray" : "blue";
  let marker = L.circleMarker(c.coords, {
    color: color,
    fillColor: color,
    fillOpacity:0.8,
    radius:8
  }).addTo(map);

  marker.bindPopup(c.name);

  marker.on("click", function(){
    visitedCountries[c.name] = true;
    localStorage.setItem("visitedCountries", JSON.stringify(visitedCountries));
    marker.setStyle({color:"gray", fillColor:"gray"});
  });
});

// Albums photos
let albums = JSON.parse(localStorage.getItem("albums")) || {};

// Ajouter un pays
function addCountry(){
  let country = prompt("Nom du pays :");
  if(!country) return;
  if(!albums[country]) albums[country] = {};
  saveAlbums();
  renderAlbums();
}
// Ajouter une ville à un pays
function addCity(country){
  let city = prompt("Nom de la ville :");
  if(!city) return;
  if(!albums[country][city]) albums[country][city] = [];
  saveAlbums();
  renderAlbums();
}

// Ajouter une photo
function addPhoto(country, city){
  let url = prompt("URL de la photo :");
  if(!url) return;
  albums[country][city].push(url);
  saveAlbums();
  renderAlbums();
}

// Sauvegarder
function saveAlbums(){
  localStorage.setItem("albums", JSON.stringify(albums));
}

// Afficher les albums
function renderAlbums(){
  let container = document.getElementById("albumGrid");
  container.innerHTML = "";

  for(let country in albums){
    for(let city in albums[country]){
      albums[country][city].forEach(url=>{
        let img = document.createElement("img");
        img.src = url;
        img.alt = `${city}, ${country}`;
        container.appendChild(img);
      });
    }
  }
}

// Initial render
renderAlbums();

// Concerts (provisoire)
let concerts = JSON.parse(localStorage.getItem("concerts")) || [];

function addConcert(){
  let concert = prompt("Nom du concert :");
  if(!concert) return;
  concerts.push(concert);
  localStorage.setItem("concerts", JSON.stringify(concerts));
  renderConcerts();
}

function renderConcerts(){
  let container = document.getElementById("concertList");
  container.innerHTML = "";
  concerts.forEach(c=>{
    let div = document.createElement("div");
    div.textContent = c;
    container.appendChild(div);
  });
}

renderConcerts();
