
// allow us to use firebase

let firebase = require(`./firebase`)    

exports.handler = async function(event) {
    console.log(event)

    // get the querystring parameters and store in memory
    let exerciseName = event.queryStringParameters.exerciseName
    let repsOrTime = event.queryStringParameters.repsOrTime
    let weight = event.queryStringParameters.weight
    let rating = event.queryStringParameters.rating
    let userId = event.queryStringParameters.userId
    let date = event.queryStringParameters.newWorkoutDate

    // establish a connection firebase in memory

    let db = firebase.firestore()

    // create a new set

    await db.collection(`activities`).add({
        exerciseName: exerciseName,
        repsOrTime: repsOrTime,
        weight: weight,
        rating: rating,
        userId: userId,
        date: date  
    })



    // return value of our lambda
    return {
        statusCode: 200,
    }

}