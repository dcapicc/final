let firebase = require('./firebase')

exports.handler = async function(event) {

  let returnValue = []

    // get connection to firebase in memory
    let db =firebase.firestore()

    let date = event.queryStringParameters.date
    let userId = event.queryStringParameters.userId

    // perform a query against the firestore for all activiites
    let activitiesQuery = await db.collection(`activities`).get()

    // .where(`workoutId`, `==`, date).where(`userId`, `==`, userId)

    // retrieve the documents from the query
    let activities = activitiesQuery.docs

    // Loop through the activities
    for (let activiitesIndex=0; activiitesIndex < activities.length; activiitesIndex++) {
        // get the id from the document
        let activityId = activities[activiitesIndex].id 

        // Get the data from the document
        let activityData = activities[activiitesIndex].data()

        // Create an object to be added to the return value
        let activityObject = {
            id: activityId,
            date: activityData.workoutId,
            exercise: activityData.exerciseId,
            repsOrTime: activityData.repsOrTime,
            weight: activityData.weight,
            rating: activityData.rating

        }

        // add the object to the return value
        returnValue.push(activityObject)
    }




  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}