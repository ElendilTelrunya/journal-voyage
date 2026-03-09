const PASSWORD="voyage";
let visitedCountries = JSON.parse(localStorage.getItem("visitedCountries")) || {};

function login(){
  if(document.getElementById("password").value === PASSWORD){
    document.getElementById("login").style.display="none";
    document.getElementById("site").style.display="block";
    init();
  } else alert("Mauvais mot de passe");
}

function toggleMenu(){document.getElementById("menu").classList.toggle("open");}
function closeMenu(){document.getElementById("menu").classList.remove("open");}

function init(){
  showHome();
  loadGallery();
  loadCategories();
  initSVGMap();
}

function showHome(){ showSection("homePage") }
function showMap(){ showSection("mapPage") }
function showCategories(){ showSection("categoryPage") }
function showSection(id){
  ["homePage","mapPage","categoryPage"].forEach(s => document.getElementById(s).classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  closeMenu();
}

/* svgMap */
function initSVGMap(){
  let svgmap = new svgMap({
    targetElementID: "svgMap",
    data: {
      data: {
        visited: {
          name: "Visité",
          format: "{0}",
          svgClass: "visited",
          value: "non"
        }
      },
      applyData: "visited",
      values: visitedCountries
    },
    interactive: true,
    onCountryClick: function(countryCode){
      visitedCountries[countryCode] = visitedCountries[countryCode] === "oui" ? "non" : "oui";
      localStorage.setItem("visitedCountries", JSON.stringify(visitedCountries));
      svgmap.updateChoropleth(visitedCountries);
    }
  });
}

/* CATEGORIES */
function addCategory(){
  let name=document.getElementById("newCategory").value.trim();
  let cats=JSON.parse(localStorage.getItem("cats"))||{};
  if(name && !cats[name]) cats[name]=[];
  localStorage.setItem("cats",JSON.stringify(cats));
  loadCategories();
}

function addSub(){
  let parent=document.getElementById("parentCategory").value;
  let sub=document.getElementById("newSub").value.trim();
  let cats=JSON.parse(localStorage.getItem("cats"))||{};
  if(parent && sub) cats[parent].push(sub);
  localStorage.setItem("cats",JSON.stringify(cats));
  loadCategories();
}

function loadCategories(){
  let cats=JSON.parse(localStorage.getItem("cats"))||{};
  let ul=document.getElementById("categories"), select=document.getElementById("parentCategory");
  ul.innerHTML=""; select.innerHTML="";
  for(let c in cats){
    let li=document.createElement("li"); li.innerText=c;
    li.onclick=()=>{ alert("Catégorie : "+c); closeMenu(); }
    ul.appendChild(li);
    let opt=document.createElement("option"); opt.value=c; opt.innerText=c; select.appendChild(opt);
    cats[c].forEach(s => {
      let sub=document.createElement("li"); sub.innerText=" - "+s;
      sub.onclick=()=>{ alert("Sous-catégorie : "+s); closeMenu(); }
      ul.appendChild(sub);
    });
  }
}

/* MEDIA */
function addMedia(){
  let input=document.createElement("input"); input.type="file"; input.accept="image/*,video/*";
  input.onchange=e=>{
    let reader=new FileReader();
    reader.onload=function(){
      let media=JSON.parse(localStorage.getItem("media"))||[];
      media.push(reader.result);
      localStorage.setItem("media",JSON.stringify(media));
      loadGallery();
    }
    reader.readAsDataURL(e.target.files[0]);
  }
  input.click();
}

function loadGallery(){
  let gallery=document.getElementById("gallery"); gallery.innerHTML="";
  JSON.parse(localStorage.getItem("media"))?.forEach((m,i)=>{
    let div=document.createElement("div"); div.className="media";
    let del=document.createElement("button"); del.className="delete"; del.innerText="X"; del.onclick=()=>{
      let media=JSON.parse(localStorage.getItem("media")); media.splice(i,1);
      localStorage.setItem("media",JSON.stringify(media)); loadGallery();
    }
    if(m.includes("video")){let v=document.createElement("video"); v.src=m; v.controls=true; div.appendChild(v);}
    else{let img=document.createElement("img"); img.src=m; div.appendChild(img);}
    div.appendChild(del); gallery.appendChild(div);
  });
}
