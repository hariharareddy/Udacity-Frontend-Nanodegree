const dotenv = require('dotenv')
dotenv.config()
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors')
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('NLP app listening on port 8081!')
})

const analyseNlp = async (arg) => {
    console.log(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=auto&verbose=y&url=${arg.url}`)
    const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=auto&verbose=y&url=${arg.url}`)
    try {
        const data = await response.json()
        console.log(data)
        return data
    }
    catch(error) {
        console.log("Error occured: ", error)
    }
}

app.post('/analyse', (req, res) => {
    const data = req.body;
    console.log(data);
    analyseNlp(data).then((result) =>{
        res.send(result);
    })
    
})
// app.get('/test', function (req, res) {
//     res.send(mockAPIResponse)
// })
