// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;
// Setup Server
const server = app.listen(port, listening);
function listening() {
    console.log(`listening on localhost with port ${port}`);
}

//Get route that returns the projectData object
app.get("/all", (req, res) => {
    res.status(200).send(projectData);
})

//POST route to add incoming data to projectData
const postData = (req, res) => {
    projectData = req.body;
    res.send(projectData);
}
app.post('/add', postData);
