//api = 1a641d808917430aaaeaced3e7148914
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then((res) => console.log("service worker registered"))
        .catch((err) => console.log("service worker not registered", err));
    });
  }
  
  function showNotification() {
    Notification.requestPermission((result) => {
      if (result === "granted") {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification("News Notification", {
            body: "Notification from Live News App",
            icon: "./images/logo.png",
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: "vibration-sample",
          });
        });
      }
    });
  }
  
  showNotification();



async function getNews () {
    await fetch ("https://newsapi.org/v2/top-headlines?country=us&apiKey=1a641d808917430aaaeaced3e7148914")
    .then (d => d.json())

    .then (response => {
        console.log(response.articles)
        for (let i = 0; i < response.articles.length; i++){
            console.log(response.articles[i].title)

            const output = document.getElementById("output")

            if (response.articles[i].urlToImage){
                var image = response.articles[i].urlToImage           
             }
             else {
                var image = "./images/notavailable.jpg" 
             }

            try {
                output.innerHTML += `<div style="margin-top: 5%;" class="card text-bg-dark w-50 mx-auto h-50">
                <img src="${image}" class="card-img" alt="...">
                <div class="card-img-overlay">
                  <h5 class="card-title">${response.articles[i].title}</h5>
                  <p class="card-text">${response.articles[i].description}</p>
                  <p class="card-text"><small>${response.articles[i].publishedAt}</small></p>
                  <a href="${response.articles[i].url}" class="btn btn-outline-light read_btn" target="_blank">Read More</a>
                </div>
              </div>`
            }
            catch{
                console.log(err)
            }
        }
    })
}

getNews();