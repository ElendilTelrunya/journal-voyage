const PASSWORD="voyage"

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



function init(){

loadCategories()

loadGallery()

initMap()

}



/* CATEGORIES */

function addCategory(){

let name=document.getElementById("newCategory").value

let cats=JSON.parse(localStorage.getItem("cats"))||{}

cats[name]=[]

localStorage.setItem("cats",JSON.stringify(cats))

loadCategories()

}



function addSub(){

let parent=document.getElementById("parentCategory").value

let sub=document.getElementById("newSub").value

let cats=JSON.parse(localStorage.getItem("cats"))

cats[parent].push(sub)

localStorage.setItem("cats",JSON.stringify(cats))

loadCategories()

}



function loadCategories(){

let cats=JSON.parse(localStorage.getItem("cats"))||{}

let ul=document.getElementById("categories")

let select=document.getElementById("parentCategory")

ul.innerHTML=""

select.innerHTML=""

for(let c in cats){

let li=document.createElement("li")

li.innerHTML="<b>"+c+"</b>"

ul.appendChild(li)

let opt=document.createElement("option")

opt.value=c

opt.innerText=c

select.appendChild(opt)

cats[c].forEach(s=>{

let sub=document.createElement("li")

sub.innerText=" - "+s

ul.appendChild(sub)

})

}

}



/* CARTE */

function initMap(){

let map=L.map('map').setView([20,0],2)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

let visited=JSON.parse(localStorage.getItem("visited"))||[]

map.on("click",function(e){

let lat=e.latlng.lat

let lng=e.latlng.lng

visited.push([lat,lng])

localStorage.setItem("visited",JSON.stringify(visited))

L.circle([lat,lng],{

radius:500000,

color:"grey",

fillColor:"grey",

fillOpacity:0.5

}).addTo(map)

})

visited.forEach(v=>{

L.circle(v,{

radius:500000,

color:"grey",

fillColor:"grey",

fillOpacity:0.5

}).addTo(map)

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
