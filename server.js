const express = require('express');
require('dotenv').config();
const mysql = require('mysql2')
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'https://facecapture.onrender.com'  // only allow requests from this domain
  }));

app.use(bodyParser.json({ limit: '50mb' })); 

const connection = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12766563',
  database: 'sql12766563',
  password: '8LeRWFWC7P'
})

connection.connect((err)=>{
  if (err) {
    console.error('Error connecting to DB:', err)
    return;
  }
  console.log('Connected to the Mysql Database!')
})

// Connect to MongoDB (ensure MongoDB is running locally or use MongoDB Atlas)
// mongoose.connect('mongodb://localhost:27017/Attandance', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.log('MongoDB connection error:', err));

// Define a schema for storing images
// const imageSchema = new mongoose.Schema({
//   imageData: { type: String, required: true },
//   imageId: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now}
// });

// const Image = mongoose.model('Image', imageSchema);

// Middleware to parse JSON
app.use(bodyParser.json());

// Route to save image
app.post('/save_image', (req, res) => {
  const { imageDataUrl, id } = req.body;
  console.log(req.body)

  connection.query(`Insert into attandance (image, imageID) values ('${imageDataUrl}','${id}');`, (err, results, fields) =>{
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database error', details: err });
    }
    // console.log('Results:', res.json());
    return res.status(200).json({'results':true});
  })
  // Create a new image document and save to database
  // const newImage = new Image({ imageData: imageDataUrl, imageId: id });
  
  // newImage.save()
  //   .then(() => {
  //       res.json({ message: imageDataUrl})
  //   })
  //   .catch(err => res.status(500).json({ error: 'Error saving image' }));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
