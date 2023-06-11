/* Global Variables */
const apiKey = "&appid=8ba9b73993cd752541cb6438c5880d2c&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate);
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', doAction);

// function to perform action
function doAction(event) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feel-input').value;
    document.getElementById('zip').value = "";
    document.getElementById('feel-input').value = "";   
    fetchWeatherData(baseURL, zipCode, apiKey)
    .then((data) => {
        postData('/add', {temperature: data.main.temp, date: newDate, userResponse: feelings})
    })

    .then(() => retrieveData());
}


/* Function to GET Web API Data*/
const fetchWeatherData = async (baseURL, zip, apiKey) => {
    const url = baseURL + zip + ",IN" + apiKey;
    console.log(url);
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
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementsByClassName('temp').innerHTML = Math.round(allData.temperature)+ 'degrees';
    document.getElementsByClassName('content').innerHTML = allData.userResponse;
    document.getElementsByClassName('date').innerHTML =allData.date;
    console.log("updated data")
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }