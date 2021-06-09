let firebase = require('./firebase')

exports.handler = async function(event) {

  let returnValue = []

  // get connection to firebase in memory
  let db =firebase.firestore()

  //TO-DO:
  //accept an exercise type in the querystringparameter (type, whatever)
  let userId = event.queryStringParameters.userId
  let exerciseName = event.queryStringParameters.exerciseName

  // perform a query against the firestore for exercise with that name
  let exerciseQuery = await db.collection(`exercises`).where(`exercise`, `==`, exerciseName).get()

  let exercises = exerciseQuery.docs

  for (let exercisesIndex=0; exercisesIndex < exercises.length; exercisesIndex++) {

    // Get the Id
    let exercisesId = exercises[exercisesIndex].id

      // perform a query against the firestore for activities with that exercise
    let activitiesQuery =  await db.collection(`activities`).where(`exerciseId`, `==`, exercisesId).get()
    
    let activities = activitiesQuery.docs

    // Loop through the activities
    for (let activitiesIndex=0; activitiesIndex < activities.length; activitiesIndex++) {
      // get the id from the document
      let activityId = activities[activitiesIndex].id 

      // Get the data from the document
      let activityData = activities[activitiesIndex].data()

      // Get a reference to the workout ID
      let workoutId = activityData.workoutId

      // perform a a query against the firestore for the name 
      let dateRef = await db.collection(`workouts`).doc(workoutId).get()

      let date = dateRef.data()

      // Create an object to be added to the return value
      let activityObject = {
        workoutId: workoutId,
        workoutDate: date,
        activityId: activityId,
        repsOrTime: activityData.repsOrTime,
        weight: activityData.weight,
        rating: activityData.rating
      }

      // add the object to the return value
      returnValue.push(activityObject)

    }

  }

  

  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}