$(document).ready( function(){
    "use strict";

    // url for Glitch Movie API
    const url = "https://silver-mango-flute.glitch.me/movies"
    const mainRow = $('.main-row')
    const loading = $('.loading')
    // const refreshPage = $('.fetch-data')
    const addBtn = $('#addMovie')
    let mainHTML = ""
    // const movieApiURL = `http://www.omdbapi.com/?apikey=${omdbKey}&`

    // refreshPage.click(() => {
    // })

    // fetch(`http://www.omdbapi.com/?apikey=${omdbKey}?t=SavingPrivateRyan`)
    //     .then(res => res.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.error(error))

    const fetchData = () => {
        loading.toggle('hidden')
        mainRow.toggle('hidden')
            fetch(url)
                .then(res => res.json())
                .then(loading.toggle('hidden'))
                .then(data => {
                    console.log(data)
                    renderHTML(data);
                    mainRow.toggle('hidden');
                })
                .catch(error => console.error(error))
    }

    $(window).ready(fetchData());

    const renderHTML = data => {
        mainHTML = ""
        for(let ele of data) {
            mainHTML += `<div id="movie${ele.id}" class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card" style="width: 18rem;">
            <img src="${ele.poster}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${ele.title}</h5>
                    <p class="card-text">${ele.plot}</p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Rating: ${ele.rating}</li>
                        <li class="list-group-item">Release Year: ${ele.year}</li>
                        <li class="list-group-item">Genres: ${ele.genre}</li>
                    </ul>
                    <button class="btn btn-primary edit-data${ele.id}" data-toggle="modal" data-target="#editModal${ele.id}">Edit</button>
                    <button id="deleteMovie${ele.id}" class="btn btn-primary mb-2">Delete</button>  
<!--                    <div class="edit${ele.id} hidden">-->

                    <div class="modal fade" id="editModal${ele.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit ${data.title}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                            <input id="titleInput${ele.id}" type="text" class="form-control mb-2 mr-sm-2" placeholder="${ele.title}">
                            <label class="sr-only">Username</label>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Rating</div>
                        </div>
                        <select id="ratingSelect${ele.id}" class="form-control">\`
                    console.log(ele.rating);
                    if(ele.rating === '1'){
                        mainHTML += \`<option selected>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>\`
                    } else if(ele.rating === '2') {
                         mainHTML += \`<option>1</option>
                            <option selected>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>\`
                    } else if(ele.rating === '3') {
                         mainHTML += \`<option>1</option>
                            <option>2</option>
                            <option selected>3</option>
                            <option>4</option>
                            <option>5</option>\`
                    } else if(ele.rating === '4') {
                         mainHTML += \`<option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option selected>4</option>
                            <option>5</option>\`
                    } else if(ele.rating === '5') {
                         mainHTML += \`<option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option selected>5</option>\`
                    }
                    mainHTML += \`</select>
                    </div>
           
                                </div>
                                <div class="modal-footer">
                                     <button id="editMovie${ele.id}" class="btn btn-primary mb-2">Submit</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                  
                </div></div></div></div></div>`
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
            $(`.edit-data${ele.id}`).click(function () {
                $(`.edit${ele.id}`).toggle('hidden')
            })
            $(`#editMovie${ele.id}`).click(function () {
                $(`#editMovie${ele.id}`).attr('disabled');
                let userTitle = $(`#titleInput${ele.id}`).val()
                let userRating = $(`#ratingSelect${ele.id}`).val()
                let userMovie = {
                    title: userTitle,
                    rating: userRating
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
        }
    }



    const deleteOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
    }





    //THIS CHECKS THE OBJECT AT SPECIFIED ID
    // fetch(`${url}/10`)
    //     .then(res => res.json())
    //     .then(data => console.log(data))


    //ADD BUTTON COMPLETE
    addBtn.click(() => {
        addBtn.attr('disabled');
        let userTitle = $('#titleInput').val()
        let userRating = $('#ratingSelect').val()
        let userMovie = {
            title: userTitle,
            rating: userRating
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



})
