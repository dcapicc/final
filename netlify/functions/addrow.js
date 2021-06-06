
// allow us to use firebase

let firebase = require(`./firebase`)    


// create variable to listen for a click on button

let rowButton = document.querySelector(`#add-row`)

// create function to respond for add row button click

rowButton.addEventListener(`click`, async function(event){

    // create form to take in data
    

    // establish a connection firebase in memory

    let db = firebase.firestore()


    // create an empty array for our return value

    let returnValue = []

    // create a new set

    db.collection(`activities`).add({
        rating: rating,
        repsOrTime: repsOrTime,
        weight: weight,
        workoutId: workoutId
    })



    // return value of our lambda
    return {
        statusCode: 200,
        body: JSON.stringify(returnValue)
    }

})