const express = require('express');
const app = express();
const port = 3000;
const mongoose = require("mongoose");
require('dotenv').config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbURI = 'mongodb+srv://' + dbUser + ':' + dbPassword + '@pathfinderdata.xkgkdkz.mongodb.net/data';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) // remove deprication warnings
  .then((result) => { console.log("connected"); app.listen(port);})
  .catch((err) => console.log(err));
const PowerPlant = require('./models/PowerPlant')
const Articles = require('./models/Articles')
const Images = require('./models/Images')
const { convertDataToCSV } = require('./functions/dataPathFunctions.js');

const bodyParser = require('body-parser');

const fs = require("fs");
const { parse } = require("csv-parse");
app.use(bodyParser.json());
const path = require('path');


fs.createReadStream("./data/mydata.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", async function (row) {
//    Create an instance of the DataPath model and save the data to the database
    const data = new PowerPlant({
      country: row[0],
      country_long: row[1],
      name: row[2],
      gppd_idnr: row[3],
      capacity_mw: row[4],
      latitude: row[5],
      longitude: row[6],
      primary_fuel: row[7],
      other_fuel1: row[8],
      other_fuel2: row[9],
      other_fuel3: row[10],
      commissioning_year: row[11],
      owner: row[12],
      source: row[13],
      url: row[14],
      geolocation_source: row[15],
      wepp_id: row[16],
      year_of_capacity_data: row[17],
      generation_gwh_2013: row[18],
      generation_gwh_2014: row[19],
      generation_gwh_2015: row[20],
      generation_gwh_2016: row[21],
      generation_gwh_2017: row[22],
      generation_gwh_2018: row[23],
      generation_gwh_2019: row[24],
      generation_data_source: row[25],
      estimated_generation_gwh_2013: row[26],
      estimated_generation_gwh_2014: row[27],
      estimated_generation_gwh_2015: row[28],
      estimated_generation_gwh_2016: row[29],
      estimated_generation_gwh_2017: row[30],
      estimated_generation_note_2013: row[31],
      estimated_generation_note_2014: row[32],
      estimated_generation_note_2015: row[33],
      estimated_generation_note_2016: row[34],
      estimated_generation_note_2017: row[35],
    });
//     console.log(data.country_long);
//     // await data.save(); // Save the data to the databaseß
  })
  .on("end", function () {
    console.log("done");
  });


// handle GET request for all data - Mei
app.get('/api/data', async (req, res) => {
  try {
    const data = await PowerPlant.find();
    res.json(data);
    console.log(data.length);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting data');
  }
});

app.use(express.static(path.join(__dirname, '..', 'build')));

// handle GET request for data - Mei
app.get('/api/data/:energyType', async (req, res) => {
  const energyType = req.params.energyType;
  try {
    const data = await PowerPlant.find({ primary_fuel: energyType });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting data');
  }
});


// handle GET request for data - Mei
app.get('/api/data/:energyType/:location', async (req, res) => {
  const energyType = req.params.energyType;
  const location = req.params.location;
  try {
    const data = await PowerPlant.find({ primary_fuel: energyType, country_long: location });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting data');
  }
});



// handle POST request to add new data - Sheyi
app.post('/api/data/:energytype', (req, res) => {
  const newData = new PowerPlant({
    name: req.body.name,
    location: req.body.location,
    energyType: req.body.energyType,
    data: req.body.data
  });
  newData.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error adding data');
    } else {
      res.send('Data added successfully');
    }
  });
});

// handle PUT request to add new data - Rashona
app.put('/api/data', async (req, res) => {
  try {
    const powerplantName = req.body.name;
    const newFuel = req.body.primary_fuel;

    const powerplants = mongoose.model('powerplants', new mongoose.Schema ({
        name: String,
         primary_fuel: String
    }));

    await powerplants.create({ name: powerplantName });

    const filter = { name: powerplantName };
    const update = { primary_fuel: newFuel };

    const entry = await powerplants.findOneAndUpdate(filter, update, {
      new: true
    });

    console.log("done with findOneAndUpdate");
    console.log(entry.name);
    console.log(entry.primary_fuel);
    //console.log(entry);

    res.status(200).json(entry).end();
    return entry;

  } catch(error) {
    console.error(error);
    res.status(500).send('Error updating power plant data');
    console.log(error);}
  });
//Map GET requests - Veevek
app.get('/api/maps/:energyType', async (req, res) => {
  const energyType = req.params.energyType;
  try {
    const image = await Images.findOne({EnergyType: energyType});
    if (!image) {
      res.status(404).send('File not found');
      return;
    }
    const imagePath = path.join(__dirname, image.pathInProject); // Construct the full path to the image file

    // Send the image file as a response
    res.setHeader('Content-type', 'image/jpg');
    res.sendFile(imagePath);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

// API endpoint for downloading map data
app.get('/api/download-map/:energyType', async (req, res) => {
  const energyType = req.params.energyType;
  try {
    const image = await Images.findOne({ EnergyType: energyType });
    if (!image) {
      res.status(404).send('File not found');
      return;
    }
    const imageName = path.basename(image.pathInProject); // Extract the image name from the file path
    const imagePath = path.join(__dirname, image.pathInProject);

    // Send the image file as a downloadable attachment
    res.setHeader('Content-Disposition', `attachment; filename=${imageName}`);
    res.setHeader('Content-Type', 'image/jpeg');
    res.sendFile(imagePath);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

//Searchability - Yash
app.get('/api/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const regex = new RegExp(query, "i");

    const Powerplantresults = await PowerPlant.find({ $or: [{ name: regex }, { country: regex },{country_long: regex}] });
    const Articleresults = await Articles.find({ $or: [{ Heading: regex }, { Link: regex },{Authors: regex},{Background:regex},{Journal:regex}] });
    const Imageresults = await Images.find( {EnergyType:regex} );
    let arr = [];
    arr.push(Powerplantresults);
    arr.push(Articleresults);
    arr.push(Imageresults);
    const results = arr;

    if (results.length === 0) {
      res.status(404).send('Data not found');
    } else {
      res.json(results);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Helper function to convert data to CSV formatxx
// Handle GET request for the root path
app.get('/', (req, res) => {
  // Send the index.html file as a response
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});
