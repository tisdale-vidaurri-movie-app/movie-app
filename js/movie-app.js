$(document).ready( function(){
    "use strict";

    // url for Glitch Movie API
    const url = "https://silver-mango-flute.glitch.me/movies"
    const mainRow = $('.main-row')
    const loading = $('.loading')
    const addBtn = $('#addMovie')
    let modalContainer = $('.modal-container')
    let mainHTML = ""
    let modalHTML = ""
    const deleteOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const movieApiURL = `https://api.themoviedb.org/3/search/movie?/api_key=${omdbKey}`

    fetch(`${movieApiURL}SavingPrivateRyan&callback=?`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))

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
        modalHTML = ""
        createModal(data)
        for(let ele of data) {
            mainHTML += `<div class="col-12 col-md-6 col-lg-4 movie-columns">
                            <div class="card" style="width: 18rem;">
                                <img id="movie${ele.id}" src="${ele.poster}" class="card-img-top" alt="Movie Poster" style="height: 100%; width: auto">
                                <div class="info${ele.id} hidden">
                                <div class="card-body">
                                <h5 class="card-title">${ele.title}</h5>
                                <p class="card-text">${ele.plot}</p>
                                <p class="card-text">Rating: ${ele.rating}</p>
                                <p class="card-text">Release Year: ${ele.year}</p>
                                <p class="card-text">Genres: ${ele.genre}</p>
                                <button class="btn-block btn btn-warning edit-data${ele.id}" data-toggle="modal" data-target="#editModal${ele.id}">Edit</button>
                                <button id="deleteMovie${ele.id}" class="btn-block btn btn-warning">Delete</button>
                            </div></div></div></div>`
        }
        mainRow.html(mainHTML)
        for(let ele of data) {
            $(`#deleteMovie${ele.id}`).click(function () {
                $(`#deleteMovie${ele.id}`).attr('disabled')
                let userDelete = confirm(`Are you sure you want to delete ${ele.title}?`)
                // DELETE FETCH
                if(userDelete){
                    fetch(`${url}/${ele.id}`, deleteOptions)
                        .then(res => res.json())
                        .then(data => console.log(data))
                        .then(fetchData())
                        .then($(`#deleteMovie${ele.id}`).removeAttr('disabled'))
                        .catch(error => console.error(error))
                } else {
                    $(`#deleteMovie${ele.id}`).removeAttr('disabled')
                }
            })
            $(`#editMovie${ele.id}`).click(function () {
                $(`#editMovie${ele.id}`).attr('disabled');
                let userTitle = $(`#titleInput${ele.id}`).val()
                let userRating = $(`#ratingSelect${ele.id}`).val()
                let userYear = $(`#yearInput${ele.id}`).val()
                let userGenre = $(`#genreInput${ele.id}`).val()
                let userPlot = $(`#plotInput${ele.id}`).val()
                let userMovie = {
                    title: userTitle,
                    rating: userRating,
                    year: userYear,
                    genre: userGenre,
                    plot: userPlot
                }
                const patchOptions = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userMovie)
                }
                fetch(`${url}/${ele.id}`, patchOptions)
                    .then(res => res.json())
                    .then(data => console.log(data))
                    .then(fetchData())
                    .then($(`#editMovie${ele.id}`).removeAttr('disabled'))
                    .catch(error => console.error(error))
            })
            $(`#movie${ele.id}`).click(function(){
                $(`.info${ele.id}`).toggle('hidden')
                $(`#movie${ele.id}`).toggle('hidden')
            })
            $(`.info${ele.id}`).click(function(){
                $(`.info${ele.id}`).toggle('hidden')
                $(`#movie${ele.id}`).toggle('hidden')
            })
        }
    }

    const createModal = data => {
        for(let ele of data) {
            modalHTML += `<div class="modal fade" id="editModal${ele.id}" tabindex="-1" role="dialog" aria-labelledby="${ele.id}ModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="${ele.id}ModalLabel">Edit ${ele.title}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <input id="titleInput${ele.id}" type="text" class="form-control mb-2 mr-sm-2" placeholder="${ele.title}">
                                        <input id="yearInput${ele.id}" type="text" class="form-control mb-2 mr-sm-2" placeholder="${ele.year}">
                                        <input id="genreInput${ele.id}" type="text" class="form-control mb-2 mr-sm-2" placeholder="${ele.genre}">
                                        <div class="input-group mb-2 mr-sm-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">Rating</div>
                                            </div>
                                            <select id="ratingSelect${ele.id}" class="form-control">`
            if (ele.rating === '1') {
                modalHTML += `<option selected>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>`
            } else if (ele.rating === '2') {
                modalHTML += `<option>1</option>
                         <option selected>2</option>
                         <option>3</option>
                         <option>4</option>
                         <option>5</option>`
            } else if (ele.rating === '3') {
                modalHTML += `<option>1</option>
                          <option>2</option>
                          <option selected>3</option>
                          <option>4</option>
                          <option>5</option>`
            } else if (ele.rating === '4') {
                modalHTML += `<option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option selected>4</option>
                          <option>5</option>`
            } else if (ele.rating === '5') {
                modalHTML += `<option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option selected>5</option>`
            }
            modalHTML += `</select>
                            </div>
                           <textarea id="plotInput${ele.id}" type="text" class="form-control mb-2 mr-sm-2" placeholder="${ele.plot}"></textarea>
                  <div class="modal-footer">
                       <button id="editMovie${ele.id}" class="btn btn-primary" data-dismiss="modal">Submit</button>
                       <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div></div></div></div></div>`
        }
        modalContainer.html(modalHTML)
    }

    //ADD BUTTON COMPLETE
    addBtn.click(() => {
        addBtn.attr('disabled');
        let userTitle = $('#titleInput').val()
        let userRating = $('#ratingSelect').val()
        let userYear = $('#yearInput').val()
        let userGenre = $('#genreInput').val()
        let userPlot = $('#plotInput').val()
        let userMovie = {
            title: userTitle,
            rating: userRating,
            year: userYear,
            genre: userGenre,
            plot: userPlot,
            poster: 'https://m.media-amazon.com/images/M/MV5BOTk5ODg0OTU5M15BMl5BanBnXkFtZTgwMDQ3MDY3NjM@._V1_SX300.jpg'
        }
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userMovie)
        }
        fetch(url, postOptions)
            .then(res => res.json())
            .then(data => console.log(data))
            .then(fetchData())
            .then(addBtn.removeAttr('disabled'))
            .catch(error => console.error(error))
    })

    fetchData();

})
