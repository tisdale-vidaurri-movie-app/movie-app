$(document).ready( function(){
"use strict";

// url for Glitch Movie API
const url = "https://silver-mango-flute.glitch.me/movies"
const mainRow = $('.main-row')
const loading = $('.loading')
const refreshPage = $('.fetch-data')
    let mainHTML = ""

    refreshPage.click(() => {
        fetchData()
    })

    const fetchData = () => {
        loading.toggle('hidden')
        mainRow.toggle('hidden')
        setTimeout(function(){
            fetch(url)
                .then(res => res.json())
                .then(loading.toggle('hidden'))
                .then(data => {
                    renderHTML(data);
                    mainRow.toggle('hidden');
                })

                .catch(error => console.error(error))
        }, 2000)

    }

    const renderHTML = data => {
        mainHTML = ""
        console.log(mainRow.html());
        for(let ele of data) {
            mainHTML += `<div class="col-12 col-sm-6 col-md-4 col-lg-3"
            <div class="card" style="width: 18rem;">
            <img src="${ele.poster}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${ele.title}</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Rating: ${ele.rating}</li>
                        <li class="list-group-item">Release Year: ${ele.year}</li>
                        <li class="list-group-item">Genres: ${ele.genre}</li>
                    </ul>
                    <p class="card-text">${ele.plot}</p>
                </div>
        </div></div>`
        }
        mainRow.html(mainHTML)
    }

console.log("test");
})
