
// allow us to use firebase

let firebase = require(`./firebase`)    

exports.handler = async function(event){
    console.log(event)

    // get the querystring parameters and store in memory
    let exercise = event.queryStringParameters.exercise
    let repsOrTime = event.queryStringParameters.repsOrTime
    let weight = event.queryStringParameters.weight
    let rating = event.queryStringParameters.rating
    let workoutId = event.queryStringParameters.workoutId 

    // establish a connection firebase in memory

    let db = firebase.firestore()

    // create a new set

    await db.collection(`activities`).add({
        exerciseId: exerciseId,
        repsOrTime: repsOrTime,
        weight: weight,
        rating: rating,
        workoutId: workoutId      
    })



    // return value of our lambda
    return {
        statusCode: 200,
    }

}