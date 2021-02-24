//Create an object
var object = {
    name : "My name",
    arms: 2,
    legs :2
}

//store it in local storage
localStorage.setItem(object.name, JSON.stringify(object))

//Create a promise that, if successful, passes to object to 
//.then and, on failure, passes a failure string to .catch
var promise = new Promise((success, failure) => {
    var subject = JSON.parse(localStorage.getItem(object.name)) //Change object.name to produce a failure state

    console.log(subject) //Just a test

    if (subject) {
        success(subject)
    } else {
        failure("Oh no!")
    }

})

//Take in the object, add a property, then set it on local storage
var addProperty = myObject => {
    myObject.tummy = "too big"
    console.log(myObject)
    localStorage.setItem(myObject.name, JSON.stringify(myObject))
    console.log(localStorage)
}

//Here's the promise chain
promise.then(response => addProperty(response))
promise.catch(failString => console.log(failString))