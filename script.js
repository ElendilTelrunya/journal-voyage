function toggleMenu() {
let menu = document.getElementById("menu");
menu.classList.toggle("open");
}

function showPage(page){

document.querySelectorAll(".page").forEach(p=>{
p.style.display="none";
});

if(page==="map"){
document.getElementById("mapPage").style.display="block";
}

if(page==="albums"){
document.getElementById("albumsPage").style.display="block";
}

if(page==="concerts"){
document.getElementById("concertsPage").style.display="block";
}

}

var map = L.map('map').setView([20,0],2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);


let visitedCountries = JSON.parse(localStorage.getItem("visitedCountries")) || {};

fetch("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson")
.then(res => res.json())
.then(data => {

L.geoJSON(data,{

style:function(feature){

let name = feature.properties.ADMIN;

if(visitedCountries[name]){

return{
color:"#555",
fillColor:"#999",
fillOpacity:0.7
};

}

return{
color:"#333",
fillColor:"#ccc",
fillOpacity:0.2
};

},

onEachFeature:function(feature,layer){

let name = feature.properties.ADMIN;

layer.on("click",function(){

visitedCountries[name] = true;

localStorage.setItem(
"visitedCountries",
JSON.stringify(visitedCountries)
);

layer.setStyle({
fillColor:"#999",
fillOpacity:0.7
});

});

layer.bindPopup(name);

}

}).addTo(map);

});
