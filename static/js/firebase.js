// Initialize when every page loaded.

console.log("Firebase initialization start.");

// Initialize Firebase
var config = {
     apiKey: "AIzaSyCFrCY90QeV_F2vqI4ZNpCmtPu3TxttJ28",
     authDomain: "camp-project-ac382.firebaseapp.com",
     databaseURL: "https://camp-project-ac382.firebaseio.com",
     projectId: "camp-project-ac382",
     storageBucket: "camp-project-ac382.appspot.com",
     messagingSenderId: "470156386455"
};
firebase.initializeApp(config);

// Get database object
var database = firebase.database();

// Global functionality

// Private Function.
/**
 * Give a specific team number and return it's location in database.
 * @param { Int } team 
 */
function getReference(team) {
    return database.ref(`teams/${team}`)
}

/**
 * Update specific key's value in database.
 * @param { Int } team 
 * @param { Object{name : value} } payload
 */
function updateData(team, payload) {
    var teamRef = getReference(team);
    teamRef.update(payload);
    console.log(`Update ${payload} of team ${team}`);
}

/**
 * Register value event to retrieve data.
 * @param { Int } team 
 * @param { Function } handler 
 */
function registerValueEvent(team, handler) {
    getReference(team).on("value", handler);
}
// Card functionality



// // Test.
// registerValueEvent(0, snap => {
//     console.log(snap.val());
// })