
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
    let date = event.queryStringParameters.date

    console.log(exerciseName)
    // establish a connection firebase in memory

    let db = firebase.firestore()

    // perform a query against the firestore for the exercise that matches the exercise name
    let exerciseQuery = await db.collection(`exercises`).where(`exercise`, `==`, exerciseName).get()

    // retreive the documents from the query
    let exercise = exerciseQuery.docs[0]
    let exerciseId = exercise.id 
    console.log(exerciseId)
    // Search for a workout with that user ID and for that date
    let workoutIdQuery = await db.collection(`workouts`).where(`date`, `==`, date).where(`userId`, `==`, userId).get()
    // Retrieve workout ID
    let workout = workoutIdQuery.docs[0]
    let workoutId = workout.id
    console.log(workoutId)

    // create a new set in the activities database

    let returnValue = {
        exerciseName: exerciseName,
        exerciseId: exerciseId,
        repsOrTime: repsOrTime,
        weight: weight,
        rating: rating,
        userId: userId,
        workoutId: workoutId 
    }

    await db.collection(`activities`).add(returnValue)



    // return value of our lambda
    return {
        statusCode: 200,
        body: JSON.stringify(returnValue)
    }

}