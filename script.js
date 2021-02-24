/*First, see if a movie is in localStorage, if not pull it from the API, 
then display the poster on the page.

As written, it return a movie of your chouse if it's already in storage, 
or Crimson Tide if we have to pull from the API.

You can do the work involved in replacing Crimson Tide as the movie from the API
*/


//Check first if the movie is stored
var pullFromStorage = title => {
    return new Promise((success, failure) => {
        var movieString = localStorage.getItem(title) //gets the movie from storage
        // console.log(movieString)

        /*If the movie is there, convert it to a JSON object so that we can work with it
          See .then below*/
        if (movieString) {
            var movieObject = convertToJson(movieString)
            /*triggering the success function passed in above moves this to the .then
              and passes in the movieObject as a param to the .then*/
            success(movieObject)
        } else {
            /*triggering the failure function passed in above moves this to the .catch
              and passes in the title as a param to the .then*/
            failure(title)
        }
    })
}

//Called in pullFromStorage, this converts a movie stored locally to a JSON object
var convertToJson = (storage) => {
    var movieJson = JSON.parse(storage)
    console.log(movieJson)
    return movieJson
}

/* If a movie isn't found locally, this function is triggered by the .catch. 
   It returns the result of saveToLocalStorage to the next .then in the chain (posterToPage)*/
var pullFromApi = (title) => {
    return fetch('http://www.omdbapi.com/?apikey=5e70a208&t=Crimson+Tide') //You'll have to do some work here to place a string in the query params
        .then(response => response.json())
        .then(data => saveToLocalStorage(data))

}

/* Triggered by pullFromApi, this takes in a JSON object of a movie 
   from the API and sets the movie to local storage to be used later*/
var saveToLocalStorage = (data) => {
    console.log(data)
    // localStorage.clear()
    localStorage.setItem(data.Title, JSON.stringify(data))
    // localStorage.setItem("title", JSON.stringify(data)) //Here's an example of hard-coding a key name for this object
    // console.log(localStorage)

    /*We return the data since it's already a JSON object so the 
      next link in the chain, posterToPage, can do its thing*/
    return data
}

// Takes in a JSON object and displays the poster on the page
var posterToPage = (movie) => {
    console.log(movie)
    var poster = document.createElement("img")
    // console.log(poster)
    poster.src = movie.Poster
    // console.log(poster)
    document.body.appendChild(poster)
}


/*This initiates the chain of events asynchronously.
  Since pullFromStorage expects to take in a string, 
  this is where we enter our movie name*/
pullFromStorage("Angels in the Outfield")
    .catch(title => pullFromApi(title)) //Based on our current code, you'll get the movie from above if it's stored locally or Crimson Tide from the API if not
    .then(movie => posterToPage(movie))

//Our initial code that proved we can pull from an API
// fetch('http://www.omdbapi.com/?apikey=5e70a208&t=the+jungle+book')
//     .then(response => response.json())
//     .then(data => console.log(data))
