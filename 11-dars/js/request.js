// api
const API = "https://randomuser.me/api/?results=9";

// for leader
const overlay = document.getElementById("overlay");

//toggle loader
let loaderToggle = (toggle) => {
  if (toggle) {
    overlay.classList.remove("hidden");
  } else {
    overlay.classList.add("hidden");
  }
};

let getdata = (resource) => {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      if (request.readyState < 4) {
        loaderToggle(true);
        console.log("Loading...");
      } else if (request.readyState == 4 && request.status == 200) {
        let data = JSON.parse(request.responseText);
        console.log(data.results);
        loaderToggle(false);
      } else if (request.readyState == 4) {
        console.log("Error!!!");
        loaderToggle(false);
      }
    });

    request.open("GET", resource);
    request.send();
  });
};

//load
let reload = () => {
  getdata(API)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => { 
      console.log(err);
    });
};
// document.addEventListener("DOMContentLoaded",reload)
