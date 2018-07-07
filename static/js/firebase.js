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
// Global Variable declaration.
var time = 1;

// Private Function.
/**
 * Give a specific team number and return it's location in database.
 * @param { Int } team 
 */
function getReference(team) {
    return database.ref(`teams/${team}`)
}

function getEventReference(team) {
    return database.ref(`changes/${team}`);
}

function registerEventsValue(team, handler) {
    getEventReference(team).on('value', handler);
}

function updateEvent(team, payload) {
    var teamEventRef = getEventReference(team);
    teamEventRef.update(payload);
}

function resetEvent() {
    for(let i = 0; i < 8; i++) {
        getEventReference(i).set({
            "team": i + 1,
            "target": -1,
            "kindofCard": "None"
        })
    }
}

/**
 * Update specific key's value in database.
 * @param { Int } team 
 * @param { Object {name : value} } payload
 */
function updateData(team, payload) {
    var teamRef = getReference(team);
    // Detect negative number.
    for(let v in payload) {
        if (payload[v] < 0) {
            payload[v] = 0;
        }
    }
    teamRef.update(payload);
}

/**
 * Register value event to retrieve data.
 * @param { Int } team 
 * @param { Function } handler 
 */
function registerValueEvent(team, handler) {
    getReference(team).on("value", handler);
}

/**
 * Subtract team's money throught specific number of money.
 * @param { Int } targetTeam 
 * @param { Int } originalNum 
 * @param { Int } substractNum 
 */
function substractByNumber(targetTeam, originalNum, substractNum) {
    var payload = {
        "money": originalNum - substractNum
    };
    updateData(targetTeam, payload);
}

/**
 * Subtrack team's money through percentage of it's money.
 * @param { Int } targetTeam 
 * @param { Int } originalNum 
 * @param { Float } percent 
 */
function substractByPercent(targetTeam, originalNum, percent) {
    var payload = {
        "money": originalNum - Math.ceil(originalNum * percent)
    }
    updateData(targetTeam, payload);
}

// Money Card functionality.

/**
 * Add team's money by specific number of money.
 * @param { Int } targetTeam 
 * @param { Int } originalNum 
 * @param { Int } addNumber 
 */
function addMoneyByNumber(targetTeam, originalNum, addNumber) {
    var payload = {
        "money": originalNum + addNumber
    }
    updateData(targetTeam, payload);
}

/**
 * Add money by multiply.
 * @param { Int } targetTeam 
 * @param { Int } originalNum 
 * @param { Float } multiply 
 */
function addMoneyByMultiply(targetTeam, originalNum, multiply) {
    var payload = {
        "money": Math.ceil(originalNum * multiply) + originalNum
    }
    updateData(targetTeam, payload);
}

/**
 * reset all Data.
 */

function resetAllData() {
    for(let i = 0; i < 8; i++) {
        getReference(i).set({
            "team": i+1,
            "money":0,
            "atk": 0,
            "def": 0,
            "sp": 0,
            "usedCardNum" : 0,
            "atkTimes": 0,
            "defTimes": 0,
            "spTimes": 0,
            "lastRank": 0,
            "curRank": 0
        })
    }
}

function resetEvent() {
    for(let i = 0; i < 8; i++) {
        getEventReference(i).set({
            'kindofCard': 'None',
            "target": -1,
            "team": i+1
        })
    }
}

// AttackCard functionality.

function attackCardNumber(targetTeam, originalNum, substract) {
    substractByNumber(targetTeam, originalNum, substract);
}

function attackCardPercent(targetTeam, originalNum, percent) {
    substractByPercent(targetTeam, originalNum, percent);
}

function attackCardRandomNumber(targetTeam, originalNum) {
    var above = 100 * time;
    var under = 300 * time;
    var substract = Math.floor(Math.random() * (under - above + 1)) + above;

    substractByNumber(targetTeam, originalNum, substract);
}

function attackCardRandomPercent(targetTeam, originalNum) {
    var above = 0.1 * time;
    var under = 0.15 * time;
    var substractP = Math.random() * (under - above) + above;

    substractByPercent(targetTeam, originalNum, substractP);
}

// Addcard

function addCardNumber(targetTeam, originalNum, add) {
    addMoneyByNumber(targetTeam, originalNum, add);
}

function addCardPercent(targetTeam, originalNum, percent) {
    addMoneyByMultiply(targetTeam, originalNum, percent);
}

function addCardRandomNumber(targetTeam, originalNum) {
    var above = 100 * time;
    var under = 300 * time;
    var add = Math.floor(Math.random() * (under - above + 1)) + above;

    addMoneyByNumber(targetTeam, originalNum, add);
}

function addCardRandomPercent(targetTeam, originalNum) {
    var above = 0.1 * time;
    var under = 0.15 * time;
    var addP = Math.random() * (under - above) + above;

    addMoneyByMultiply(targetTeam, originalNum, addP);
}

// Natural Event
// To all Team effect.
var list = [500, 500, 500, 500, 500, 500, 500, 500]; // for Test only.

function addMoneyToAllTeamByNumber(number, originalNumList) {
    for (let i = 0; i < 8; i++) {
        addMoneyByNumber(i, originalNumList[i], number);
    }
}

function addMoneyToAllTeamByPercent(percent, originalNumList) {
    for (let i = 0; i < 8; i++) {
        addMoneyByMultiply(i, originalNumList[i], percent);
    }
}

function substractMoneyToAllTeamByNumber(number, originalNumList) {
    for (let i = 0; i < 8; i++) {
        substractByNumber(i, originalNumList[i], number);
    }
}

function substractMoneyToAllTeamByPercent(percent, originalNumList) {
    for (let i = 0; i < 8; i++) {
        substractByPercent(i, originalNumList[i], percent);
    }
}

function addRandomMoneyToAllTeamByNumber(originalNumList) {
    for (let i = 0; i < 8; i++) {
        addCardRandomNumber(i, originalNumList[i]);
    }
}

function addRandomMoneyToAllTeamByPercent(originalNumList) {
    for (let i = 0; i < 8; i++) {
       addCardRandomPercent(i, originalNumList[i]);
    }
}

function substractRandomMoneyToAllTeamByNumber(originalNumList) {
    for (let i = 0; i < 8; i++) {
        attackCardRandomNumber(i, originalNumList[i]);
    }
}

function substractRandomMoneyToAllTeamByPercent(originalNumList) {
    for (let i = 0; i < 8; i++) {
        attackCardRandomPercent(i, originalNumList[i]);
    }
}

// Boss random.
function RandomMoneyToAllTeamByNumber(originalNumList) {
    var above = -300 * time;
    var under = 300 * time;

    for (let i = 0; i < 8; i++) {
        var random = Math.floor(Math.random() * (under - above + 1)) + above;
        var payload = {
            "money" : originalNumList[i] + random
        }
        updateData(i, payload);
    }
}

function RamdomMoneyToAllTeamByPercent(originalNumList) {
    var above = -0.15 * time;
    var under = 0.15 * time;

    for (let i = 0; i < 8; i++) {
        var random = Math.random() * (under - above) + above;
        var payload = {
            "money" : Math.ceil(originalNumList[i] + originalNumList[i] * random)
        }
        updateData(i, payload);
    }
}
