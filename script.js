const PASSWORD="voyage"

let map
let markers=[]



function login(){

let p=document.getElementById("password").value

if(p===PASSWORD){

document.getElementById("login").style.display="none"
document.getElementById("site").style.display="block"

init()

}else{

alert("mauvais mot de passe")

}

}



function toggleMenu(){

document.getElementById("menu").classList.toggle("open")

}



function init(){

initMap()
loadTrips()
loadGallery()

}



/* CARTE */

function initMap(){

map=L.map('map').setView([20,0],2)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

let saved=JSON.parse(localStorage.getItem("markers"))||[]

saved.forEach(addMarker)

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

})

markers.push(marker)

}



/* VOYAGES */

function addTrip(){

let country=document.getElementById("country").value
let city=document.getElementById("city").value
let date=document.getElementById("date").value

let trips=JSON.parse(localStorage.getItem("trips"))||[]

trips.push({country,city,date})

localStorage.setItem("trips",JSON.stringify(trips))

loadTrips()

}



function loadTrips(){

let timeline=document.getElementById("timeline")

timeline.innerHTML=""

let trips=JSON.parse(localStorage.getItem("trips"))||[]

trips.sort((a,b)=>new Date(b.date)-new Date(a.date))

trips.forEach(t=>{

let div=document.createElement("div")

div.className="trip"

div.innerHTML="🌍 "+t.country+" - "+t.city+" ("+t.date+")"

timeline.appendChild(div)

})

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



function clearData(){

if(confirm("supprimer tout le blog ?")){

localStorage.clear()

location.reload()

}

}
