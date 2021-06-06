firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')

    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
      <button class="text-pink-500 text-right underline sign-out">Sign Out</button>
    `

    // get a reference to the sign out button
    let signOutButton = document.querySelector(`.sign-out`)

    // handle the sign out button click
    signOutButton.addEventListener(`click`, function(event) {
      // sign out of firebase authentication
      firebase.auth().signOut()

      // redirect to the home page
      document.location.href = `index.html`
    })

    // Date Filter
      // get a reference to the date filter
      let dateFilter = document.querySelector(`#date-filter`)
      // add event listener for the post comment button
      dateFilter.addEventListener(`change`, async function(event){
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
          for (let workoutIndex=0; workoutIndex < json.length; workoutIndex++) {
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
