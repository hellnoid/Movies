var slide=["https://image-resizer-cloud-api.akamaized.net/image/C6DE0F89-3C79-4E94-9324-913D1BA65563/0-3x1.jpg?width=1920",
"https://image-resizer-cloud-api.akamaized.net/image/58873AFE-D16F-4ADD-8EA7-658462587A83/0-3x1.jpg?width=1920",
"https://image-resizer-cloud-api.akamaized.net/image/29EC91CB-23FD-49F7-8094-608D216E0231/0-3x1.jpg?width=1920",
"https://image-resizer-cloud-api.akamaized.net/image/A2D5FA05-208D-45CC-9394-7AA4BEA8ED8F/0-3x1.jpg?width=1920","https://image-resizer-cloud-api.akamaized.net/image/AB4E98DA-CAA5-48C0-81A8-DB20084EE026/0-3x1.jpg?width=1920","https://image-resizer-cloud-api.akamaized.net/image/FFD5F949-E501-4229-9B53-795C5B42178E/0-3x1.jpg?width=1920"]

var movList=[{url:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/PK_poster.jpg/220px-PK_poster.jpg",name:"P.K",rate:"9"},{url:"https://movieposters2.com/images/1647580-b.jpg",name:"Twilight",rate:"9.9"},
{url:"https://m.media-amazon.com/images/M/MV5BODk1NzZiNTktZmIzMi00NzM1LTllMGEtOTg1NWE4NTUwZmIxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",name:"Ragini MMS",rate:"9.6"},{url:"https://m.media-amazon.com/images/I/81W03BksEjL._AC_SL1500_.jpg",name:"One Piece",rate:"8.9"},
{url:"https://m.media-amazon.com/images/I/81JmKHx9zpL._SY741_.jpg",name:"Dragon Ball",rate:"8.8"},
{url:"https://ngs-space1.sgp1.digitaloceanspaces.com/am/uploads/mediaGallery/image/1644515657225.jpg-org",name:"Shaktimaan",rate:"9.0"},
{url:"https://m.media-amazon.com/images/I/A1Hff76Fx1L._SL1500_.jpg",name:"The Time Machine",rate:"10"},
{url:"https://pbs.twimg.com/media/FSUkmp7VEAAKeEK?format=jpg&name=4096x4096",name:"Avatar",rate:"9.99"},
{url:"https://m.media-amazon.com/images/M/MV5BZDQyODUwM2MtNzA0YS00ZjdmLTgzMjItZWRjN2YyYWE5ZTNjXkEyXkFqcGdeQXVyMTI2MzY1MjM1._V1_.jpg",name:"Minions",rate:"9.7"}
]

var x;

window.onload =function (){
   // console.log("yo");
    var img=document.createElement("img");
    var i=0;
    
    x=setInterval(function(){
        img.setAttribute("src",slide[i]);
        i++;
        if(i===slide.length){
            i=0;
        }
    },2000)
    document.querySelector("#slideshow").append(img)


    
}

display(movList);

function display(moList){
    document.querySelector("#movies").innerHTML="";
    for(var j=0;j<moList.length;j++){
        var movdiv= document.createElement("div");
        movdiv.setAttribute("class","movdiv")
    
        var poster= document.createElement("img");
        poster.setAttribute("src",moList[j].url);
        
        var details=document.createElement("div");
        details.setAttribute("class","info");
    
        var name=document.createElement("h2");
        name.innerText=moList[j].name;
    
        var IMDB=document.createElement("p");
        IMDB.innerText="IMDB";
    
        var star= document.createElement("img");
        star.setAttribute("src","https://cdn-icons-png.flaticon.com/512/2107/2107957.png");
    
        var rating=document.createElement("p");
        rating.innerText=moList[j].rate;
    
        details.append(name,IMDB,star,rating);
        movdiv.append(poster,details);
    
        document.querySelector("#movies").append(movdiv);
    
        }
}

var but1=document.createElement("button");
but1.innerText="H2L";

var but2=document.createElement("button");
but2.innerText="L2H";

document.querySelector("#sort-buttons").append(but1,but2);

but1.addEventListener("click",h2l);
but2.addEventListener("click",l2h);
function h2l(){
    movList.sort(function(a,b){
        if(a.rate==b.rate){
            return 0;
        }
        if(a.rate<b.rate){
           return -1;
        }
            return 1;
       // return a.rate - b.rate;
    })

    display(movList);
}

function l2h(){
    movList.sort(function(a,b){
        if(a.rate==b.rate){
            return 0;
        }
        if(a.rate<b.rate){
           return 1;
        }
            return -1;
    })

    display(movList);
}

//document.querySelector("#search").addEventListener("change",doSearch);
document.querySelector("#cross").addEventListener("click",bl);
function bl(){
    document.querySelector("#list").style.display="none";
    document.querySelector("#selectedMovie").style.display="none";
    document.querySelector("#cross").style.display="none";
}
async function doSearch(){
try {
    document.querySelector("#list").style.display="flex";
    let apikey="5ed83e50";
    let name=document.querySelector("#search").value;
    let url=`http://www.omdbapi.com/?apikey=${apikey}&s=${name}`;
    let res=await fetch(url);
    let data=await res.json();
    //console.log(data);
    if(data.Response=='True'){
    displayList(data.Search);
    }
    else{
        document.querySelector("#list").innerHTML="";
        let er=document.createElement("p");
        er.innerText=data.Error;
        er.style.color="white";
        document.querySelector("#list").append(er);
    }
    
} catch (error) {
    
}
}
function displayList(movieList){
   // console.log(movieList);
    document.querySelector("#list").innerHTML="";
    movieList.forEach(element => {
        let naam=document.createElement("p");
        naam.innerText=element.Title;
        naam.style.color="white";
        document.querySelector("#list").append(naam);
        naam.addEventListener("click",function mov(){
            document.querySelector("#cross").style.display="block";
            document.querySelector("#selectedMovie").style.display="flex";
            document.querySelector("#selectedMovie").innerHTML="";
         
            let div1=document.createElement("div");

            let imag=document.createElement("img");
            imag.src=element.Poster;

            div1.append(imag);


            let div2=document.createElement("div");
            let tit=document.createElement("h1");
             tit.innerText=element.Title;

             let imd=document.createElement("p");
             imd.innerText="IMDB     "+element.imdbID;
      
             let yer=document.createElement("p");
             yer.innerText="Year    "+element.Year;

            div2.append(tit,imd,yer);
            console.log(movieList);
            document.querySelector("#selectedMovie").append(div1,div2);
        });
    });
}
let timeId ;
function debounce(func,delay){
    if(timeId){
        clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
        func();
    }, delay);
}