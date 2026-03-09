const PASSWORD="Cybelle-1"

let map
let markers=[]


function login(){

let p=document.getElementById("password").value

if(p===PASSWORD){

document.getElementById("login").style.display="none"
document.getElementById("site").style.display="block"

init()

}else{

alert("Mauvais mot de passe")

}

}


function toggleMenu(){

document.getElementById("menu").classList.toggle("open")

}

function closeMenu(){

document.getElementById("menu").classList.remove("open")

}


function init(){

initMap()
loadGallery()

}


/* NAVIGATION */

function showHome(){

document.getElementById("homePage").classList.remove("hidden")
document.getElementById("mapPage").classList.add("hidden")
document.getElementById("categoryPage").classList.add("hidden")

closeMenu()

}

function showMap(){

document.getElementById("homePage").classList.add("hidden")
document.getElementById("mapPage").classList.remove("hidden")
document.getElementById("categoryPage").classList.add("hidden")

closeMenu()

}

function showCategories(){

document.getElementById("homePage").classList.add("hidden")
document.getElementById("mapPage").classList.add("hidden")
document.getElementById("categoryPage").classList.remove("hidden")

closeMenu()

}



/* CARTE */

function initMap(){

map=L.map('map').setView([20,0],2)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

let saved=JSON.parse(localStorage.getItem("markers"))||[]

saved.forEach(addMarker)

map.on("click",function(e){

addMarker([e.latlng.lat,e.latlng.lng])

saveMarkers()

})

}


function addMarker(coords){

let marker=L.circle(coords,{
radius:500000,
color:"grey",
fillColor:"grey",
fillOpacity:0.5
}).addTo(map)

marker.on("click",function(){

map.removeLayer(marker)

markers=markers.filter(m=>m!==marker)

saveMarkers()

})

markers.push(marker)

}


function saveMarkers(){

let data=markers.map(m=>[m.getLatLng().lat,m.getLatLng().lng])

localStorage.setItem("markers",JSON.stringify(data))

}



/* MEDIA */

function addMedia(){

let input=document.createElement("input")

input.type="file"

input.accept="image/*,video/*"

input.onchange=e=>{

let file=e.target.files[0]

let reader=new FileReader()

reader.onload=function(){

let media=JSON.parse(localStorage.getItem("media"))||[]

media.push(reader.result)

localStorage.setItem("media",JSON.stringify(media))

loadGallery()

}

reader.readAsDataURL(file)

}

input.click()

}


function loadGallery(){

let gallery=document.getElementById("gallery")

gallery.innerHTML=""

let media=JSON.parse(localStorage.getItem("media"))||[]

media.forEach((m,i)=>{

let div=document.createElement("div")

div.className="media"

let del=document.createElement("button")

del.className="delete"

del.innerText="X"

del.onclick=()=>deleteMedia(i)

if(m.includes("video")){

let v=document.createElement("video")

v.src=m

v.controls=true

div.appendChild(v)

}else{

let img=document.createElement("img")

img.src=m

div.appendChild(img)

}

div.appendChild(del)

gallery.appendChild(div)

})

}


function deleteMedia(i){

let media=JSON.parse(localStorage.getItem("media"))

media.splice(i,1)

localStorage.setItem("media",JSON.stringify(media))

loadGallery()

}
