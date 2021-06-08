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
    //get a reference to the user-entered exercise 
    let exerciseInput = document.querySelector(`#exercise-filter`)

    let exerciseType = exerciseInput.value
    
    //get a reference to the get act button
    let activitiesButton = document.querySelector(`.get-activities`)
    // add event listener to listen on click
    if (activitiesButton) {
      activitiesButton.addEventListener(`click`, async function (event) {
        //ignore default 
        event.preventDefault()

        //call backend
        let perfHistUrl = `/.netlify/functions/perfhist?userId=${user.uid}&exerciseName=${exerciseName}`

        // Fetch the url, wait for a response, store the response in memory
        let response = await fetch(perfHistUrl)

        // Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json()

        // Write the json-formatted data to the console in Chrome
        console.log(json)

        //TO DO: get the history chart, then upate the table by adding the HTML 

      })
    }

    // Date Filter
    // get a reference to the date filter
    let dateFilter = document.querySelector(`#date-filter`)
    // add event listener for the post comment button
    if (dateFilter) {
      dateFilter.addEventListener(`change`, async function (event) {
        // ignore default
        event.preventDefault()
        // get a reference to the input
        let dateSelected = document.querySelector(`#workout-date`)
        // get the date
        let date = dateSelected.value
        console.log(date)
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


      // Add row
        // get a reference to the "Add Row" button
    let addRowButton = document.querySelector(`#add-row`)

    // listen for the clicking of the "Add Row" button
    addRowButton.addEventListener(`click`, async function(event) {
      
      console.log(event)
      
      // prevent the default behavior (submitting the form)
      // event.preventDefault()

      // // get a reference to the input holding the image URL
      // let imageUrlInput = document.querySelector(`#image-url`)

      // // store the user-inputted image URL in memory
      // let imageUrl = imageUrlInput.value

      // // create the URL for our "create post" lambda function
      // let url = `/.netlify/functions/addrow?exerciseId=${user.displayName}&imageUrl=${imageUrl}`

      // // fetch the URL, wait for the response, store the response in memory
      // let response = await fetch(url)

      // // refresh the page
      // location.reload()


      // let exerciseId = event.queryStringParameters.exerciseId
      // let repsOrTime = event.queryStringParameters.repsOrTime
      // let weight = event.queryStringParameters.weight
      // let rating = event.queryStringParameters.rating
      // let workoutId = event.queryStringParameters.workoutId 


    })


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
