/* Global Variables */
const apiKey = "&appid=8ba9b73993cd752541cb6438c5880d2c&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', doAction);

// function to perform action
function doAction(event) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feel-input').value;
    const countryCode = document.getElementById('country-dropdown').value;
    document.getElementById('zip').value = "";
    document.getElementById('feel-input').value = "";   
    fetchWeatherData(baseURL, zipCode, countryCode, apiKey)
    .then((data) => {
        postData('/add', {temperature: data.main.temp, date: newDate, userResponse: feelings})
    })

    .then(() => retrieveData());
}


/* Function to GET Web API Data*/
const fetchWeatherData = async (baseURL, zip, countryCode, apiKey) => {
    const url = baseURL + zip + "," + countryCode + apiKey;
    const response = await fetch(url);

    try {
        const fetchedData = await response.json();
        return fetchedData;
    }
    catch(error) {
        console.log("Error occurred: "+error);
    }
}

/* Function to POST data */
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    }
    catch(error) {
        console.log("error", error);
    }
}

/* Function to GET Project Data */
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML ='Temperature is ' + Math.round(allData.temperature) + '°';
    document.getElementById('date').innerHTML = 'Date: ' + allData.date;
    document.getElementById('content').innerHTML = 'You are feeling ' + allData.userResponse;
    }
    catch(error) {
      console.log("error", error);
    }
   }