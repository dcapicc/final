let firebase = require('./firebase')

exports.handler = async function(event) {
  let returnValue = [] 

    // get the querystring parameters
    let date = event.queryStringParameters.date
    let userId = event.queryStringParameters.userId
    console.log(date)
    // establish a connection to firebase in memory
    let db = firebase.firestore()
    // Search for existing workouts with same date and user
    let workoutsQuery = await db.collection(`workouts`).where(`date`, `==`, date).where(`userId`, `==`, userId).get()
    // Save results
    let workouts = workoutsQuery.docs
    // If workout doesn't exist already create one
    if (workouts.length == 0) {
      // create a new workout
      db.collection(`workouts`).add({
      date: date,
      userId: userId
  })

    }
    

  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}