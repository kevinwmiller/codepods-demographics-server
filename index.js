const express = require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser())

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/api/test', (req, res) => {
	res.send({ express: 'From the Express Backend' });
});




app.listen(port, () => console.log(`Listening on port ${port}`));