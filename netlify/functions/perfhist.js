let firebase = require('./firebase')

exports.handler = async function(event) {

  let returnValue = []

  // get connection to firebase in memory
  let db =firebase.firestore()

  //TO-DO:
  //accept an exercise type in the querystringparameter (type, whatever)
  let userId = event.queryStringParameters.userId
  let exerciseName = event.queryStringParameters.exerciseName


  //TO DO:
  // perform a query against the firestore for exercise with that name
  let exerciseQuery = await db.collection(`exercises`).where(`exercise`, `==`, exerciseName).get()

  // perform a query against the firestore for activities with that exercise
  

  // perform a query against the firestore for all the workouts
  let workoutsQuery = await db.collection(`workouts`).where(`date`, `==`, date).get()

  // retreive the documents from the query
  let workouts = workoutsQuery.docs

  // loop through the workouts
  for (let workoutIndex=0; workoutIndex < workouts.length; workoutIndex++) {
    // get the id from the 
    let workoutId = workouts[workoutIndex].id

    // get the data from the document
    let workoutData = workouts[workoutIndex].data()

    // perform a query against the firestore for all activiites with this workout id
    let activitiesQuery = await db.collection(`activities`).where(`workoutId`, `==`, workoutId).get()

    // retrieve the documents from the query
    let activities = activitiesQuery.docs

    // Loop through the activities
    for (let activitiesIndex=0; activitiesIndex < activities.length; activitiesIndex++) {
      // get the id from the document
      let activityId = activities[activiitesIndex].id 

      // Get the data from the document
      let activityData = activities[activiitesIndex].data()

      let exerciseId = activityData.exerciseId
      console.log(exerciseId)

      // performa a query against the firestore for the name 
      let exerciseRef = await db.collection(`exercises`).doc(exerciseId).get()

      let exercise = exerciseRef.data()
      
      // Create an object to be added to the return value
      let activityObject = {
        workoutId: workoutId,
        workoutDate: workoutData.date,
        activityId: activityId,
        exerciseName: exercise,
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