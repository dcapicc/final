let firebase = require('./firebase')

exports.handler = async function(event) {
  let returnValue = [] 

    // get the querystring parameters
    let date = event.queryStringParameters.date
    console.log(date)
    // establish a connection to firebase in memory
    let db = firebase.firestore()

    // create a new workout
    db.collection(`workouts`).add({
        date: date
    })



  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}