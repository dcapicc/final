let firebase = require('./firebase')

exports.handler = async function(event) {

    let returnValue = [] // sample only...

    // get connection to firebase in memory
    let db =firebase.firestore()

    let exercisesQuery = await db.collection(`exercises`).get()  

    let exercises = exercisesQuery.docs

    for (let exercisesIndex=0; exercisesIndex < exercises.length; exercisesIndex++) {

        let exerciseData = exercises[exercisesIndex].data()

        let exercise = exerciseData.exercise

        let exerciseObject = {
            exercise: exercise
        }
        
        returnValue.push(exerciseObject)
    }

  
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}