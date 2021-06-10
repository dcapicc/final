firebase.auth().onAuthStateChanged(async function (user) {
  if (user) {
    // Signed in
    console.log(`signed in as ${user.uid}`)

    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
      <button class="text-pink-500 text-right underline sign-out">Sign Out</button>
    `

    // get a reference to the sign out button
    let signOutButton = document.querySelector(`.sign-out`)

    // handle the sign out button click
    signOutButton.addEventListener(`click`, function (event) {
      // sign out of firebase authentication
      firebase.auth().signOut()

      // redirect to the home page
      document.location.href = `index.html`
    })

    // Get Activities button
    //get a reference to the get act button
    let activitiesButton = document.querySelector(`.get-activities`)
    // add event listener to listen on click
    if (activitiesButton) {
      activitiesButton.addEventListener(`click`, async function (event) {
        //ignore default 
        event.preventDefault()
        
        // get a reference to the input
        let exerciseSelected = document.querySelector(`#exercise-filter`)
        // get the date
        let exercise = exerciseSelected.value

        console.log(exercise)

        //call backend
        let perfHistUrl = `/.netlify/functions/perfhist?userId=${user.uid}&exerciseName=${exercise}`

        // Fetch the url, wait for a response, store the response in memory
        let activityResponse = await fetch(perfHistUrl)

        // Ask for the json-formatted data from the response, wait for the data, store it in memory
        let activityList = await activityResponse.json()

        // Write the json-formatted data to the console in Chrome
        console.log(activityList)

        //get the history chart, then upate the table by adding the HTML
        
        let perfHistElement = document.querySelector(`#history-chart`)
        
        for (let i=0; i < activityList.length; i++) {

          let repsOrTimeResult = activityList[i].repsOrTime
          let workoutDateResult = activityList[i].workoutDate
          let weightResult = activityList[i].weight
          let ratingResult = activityList[i].rating
          //TO DO: ADD THE REST OF THE VARIABLES
          
          //replace element's contents 
          perfHistElement.insertAdjacentHTML(`beforeend`, `
          <tr>
            <td class="border border-blue-800 text-center">${workoutDateResult}</td>
            <td class="border border-blue-800 text-center">${repsOrTimeResult}</td>
            <td class="border border-blue-800 text-center">${weightResult}</td>
            <td class="border border-blue-800 text-center">${ratingResult}</td>
          </tr>
          `)
        }
       
        

      })
    }

    // NEW WORKOUT BUTTON
    // get a reference to the new workout button
    let newWorkoutButton = document.querySelector(`#start-workout`)

    // get a reference to the date of the new workout to pass along to "add row" function

    let newWorkoutDate

    if (newWorkoutButton) {
      // Add event listener for the new workout button
      newWorkoutButton.addEventListener(`click`, async function(event) {

        // ingore default behavior
        event.preventDefault()

        // get a reference to the input
        let dateSelected = document.querySelector(`#workout-date`)
        // get the date
        let date = dateSelected.value

        // // store the date to pass along to the add row function

        // newWorkoutDate = date

        // get a new url
        let newWorkoutUrl = `/.netlify/functions/new_workout?date=${date}&userId=${user.uid}`
        
        // Get the response
        let newWorkoutResponse = await fetch(newWorkoutUrl)
        // Ask for the json-formatted data
        let newWorkoutJson = await newWorkoutResponse.json()
        console.log(newWorkoutJson)
        console.log(`Workout created for ${date}`)

      
      })
    }

    // DATE FILTER
    // get a reference to the date filter
    let dateFilter = document.querySelector(`#date-filter`)

    // add event listener for the post comment button
    if (dateFilter) {
      dateFilter.addEventListener(`change`, async function(event) {
        // ignore default
        event.preventDefault()

      
        // get a reference to the input
        let dateSelected = document.querySelector(`#workout-date`)
        // get the date
        let date = dateSelected.value
        // console.log(date)
        // Build the url for our date filter API
        let url = `/.netlify/functions/date_filter?userId=${user.uid}&date=${date}`
        // Get the response
        let response = await fetch(url)
        // Ask for the json-formatted data
        let json = await response.json()
        console.log(json)

        // Get a reference to the workout chart
        let workoutChart = document.querySelector(`#workout-chart`)

          // Loop through the json data
          for (let workoutIndex = 0; workoutIndex < json.length; workoutIndex++) {
            // Store each set in memory
            let set = json[workoutIndex]

            
            workoutChart.insertAdjacentHTML(`beforeend`, `
              
              <tr>
                <td class="border border-blue-800 text-center">${set.exerciseName.exercise}</td>
                <td class="border border-blue-800 text-center">${set.repsOrTime}</td>
                <td class="border border-blue-800 text-center">${set.weight}</td>
                <td class="border border-blue-800 text-center">${set.rating}</td>
              </tr>
            `)


          }
      })
    
    }

    //  // ADD ROW/SET
      
    // get a reference to the "Add Row" button
    let addRowButton = document.querySelector(`#add-row`)
    // listen for the clicking of the "Add Row" button
    
    if(addRowButton){
      addRowButton.addEventListener(`click`, async function(event) {

        // prevent the default behavior (submitting the form)
        event.preventDefault()
        console.log(event)

        // // get a reference to the exercise
        let exerciseInput = document.querySelector(`#exercise`)

        // store the user-inputted exercise in memory
        let exerciseName = exerciseInput.value
        // console.log (exerciseName)

        // get reference to reps/time

        let repsOrTimeInput = document.querySelector(`#repsOrTime`)

        // store the user-inputted reps/time in memory
        let repsOrTime = repsOrTimeInput.value
        // console.log(repsOrTime)

        // get reference to the weight
        let weightInput = document.querySelector(`#weight`)

        // store the user-inputted image URL in memory
        let weight = weightInput.value
        // console.log(weight)

        // get reference to the rating
        let ratingInput = document.querySelector(`#rating`)

        // store the user-inputted image URL in memory
        let rating = ratingInput.value

        // get a reference to the input
        let dateSelected = document.querySelector(`#workout-date`)
        // get the date
        let date = dateSelected.value
        // console.log(rating)
        // console.log(user.uid)
        // console.log(newWorkoutDate)

      // // create the URL for our "create post" lambda function
      let addRowUrl = `/.netlify/functions/addrow?exerciseName=${exerciseName}&repsOrTime=${repsOrTime}&weight=${weight}&rating=${rating}&userId=${user.uid}&date=${date}`
      // console.log(addRowUrl)

      // // fetch the URL, wait for the response, store the response in memory
      let addRowResponse = await fetch(addRowUrl)

      // let addRowJson = await addRowResponse.json()


      })
    }

     } else {
      // Signed out
      console.log('signed out')

      // Initializes FirebaseUI Auth
      let ui = new firebaseui.auth.AuthUI(firebase.auth())

      // FirebaseUI configuration
      let authUIConfig = {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: 'index.html'
      }

      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    
  }
})
