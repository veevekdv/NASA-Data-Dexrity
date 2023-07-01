import React, { useEffect, useState } from 'react';
import '../../App.css';
import Header from '../../components/Header/Header';
import map from '../../assets/images/geoMap.jpg';
import legend from '../../assets/images/geoLegend.jpg';
import Sidebar from '../../components/Sidebar/Sidebar';
import Dropdown from 'react-bootstrap/Dropdown';
import Footer from '../../components/Footer/Footer';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const Geo = () => {
  const history = useHistory();
  const [geoData, setgeoData] = useState(null);
  const [displayAll, setDisplayAll] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [randomElements, setRandomElements] = useState([]);

  useEffect(() => {
    const fetchgeoData = async () => {
      const response = await fetch('/node/api/data/Geothermal');
      const data = await response.json();
      setgeoData(data);
    };

    fetchgeoData();
  }, []);

  useEffect(() => {
    const randomElements = getRandomElements();
    setRandomElements(randomElements);
  }, [geoData, selectedCountry]);

  const handleCountryChange = ({ target: { value } }) => {
    setSelectedCountry(value);
  };
  
  const displayAllJSON = () => {
    history.push('/node/api/data/Geothermal');
  };

  const downloadJSON = async () => {
    let url = '/node/api/data/Geothermal';
    if (selectedCountry) {
      url += `/${selectedCountry}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = selectedCountry ? `${selectedCountry}_geo_data.json` : 'geo_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  const getRandomElements = () => {
    if (!geoData || geoData.length === 0) return [];
  
    let filteredData = geoData;
    if (selectedCountry) {
      filteredData = geoData.filter(data => data.country_long === selectedCountry);
    }
    
    if (filteredData.length <= 5) {
      return filteredData;
    } else {
      const elements = [];
      while (elements.length < 5) {
        const randomIndex = Math.floor(Math.random() * filteredData.length);
        const randomElement = filteredData[randomIndex];
        if (!elements.includes(randomElement)) {
          elements.push(randomElement);
        }
      }
      return elements;
    }
  };

  return (
    <div className="Geo">
      <Header></Header>
      <head>      <meta name="description" content="Geothermal energy Explaination and Data from Nasa"></meta> </head>
      <div className="content container-fluid m-0 p-0">
        <div className="row p-0 m-0 parentRow full_height">
          <div className="col-md-9 d-flex bg-success p-0 m-0">
            <div className="row m-0 p-0 full_height">
              <div className="col-12 bg-danger left_content m-0 p-0 title-row">
                <div className="card bg-transparent title_box left_content m-0 p-0 p-4" >
                  <h5 className="card-title left m-0 d-flex display-5 text-white">Geothermal Energy</h5>
                </div>
              </div>
              <div className="col-12 bg-dark left_content m-0 p-0 info-row">
                <div className="card bg-white info_box left_content m-0 px-5" >
                  <div className="card-body">
                    <p className="card-text">Geothermal energy is the thermal energy in the Earth's crust which originates from the formation of the planet and from radioactive decay of materials. Utilizing geothermal energy is location restricted and can be risk environmental side effects or trigger earthquakes. Geothermal energy is leveraged using heat pumps and ground loops; the size of geothermal pumps is measured in tonnes, with 1 ton equaling 12,000 btu/h, and is determined by the facility’s heating or cooling demand profile. Geothermal systems are highly efficient and require minimal to no upkeep while being environmentally friendly as a renewable energy source.</p>
                    <div className="row info full_height p-0 mb-3">
                      <div className="col-4 full_height">


                      <div className="h2">2019 Data</div>
                      <img src={legend} alt="geo legend" className='fluid legend w-70'/>
                      <ul className='py-4 data'>
                          <li>Optimal geothermal suitability distribution produced by the Maximum Entropy model using all parameters.</li>
                          <li>Warmer colors indicate higher suitability scores.</li>
                          <li>Dots indicate geothermal power plants in the test set whose suitability is not predicted by the model.</li>
                          <li>Parameters included  (a) carbon dioxide, (b) elevation, (c) depth, (d) global heat flow, (e) sediment thickness, (f) surface air temperature, (g) precipitation, (h) groundwater resources, (i) earthquake depth, (j) magnitude, and (k) density, distance from (l) convergent, (m) transform, and (n) diffuse lines, (o) operative and planned geothermal power plants.</li>
                        </ul>
                      </div>
                      <div className="col-8 full_height d-flex">
                        <div className="container-fluid h-100 my-auto">
                        <div className="d-flex justify-content-between row">
                        <Dropdown className='col-5 drop-down-button-cool h-100'>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Download
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={downloadJSON}>JSON</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">CSV</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Form.Group controlId="countrySelect" className='col-5 drop-down-button-cool h-100 mt-2'>
                          <Form.Control as="select" value={selectedCountry} onChange={handleCountryChange} className='drop-down-button-cool h-100'>
                            <option value="">Select a country</option>
                            {geoData && [...new Set(geoData.map(data => data.country_long))].map(country => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </div>

                          <img src={map} alt="Geo map" className='fluid map_image'/>
                          {geoData && (
                            <div className='text-center'>
                              {selectedCountry ? (
                                <p>There are {geoData.filter(data => data.country_long === selectedCountry).length} geothermal power plants in this dataset from {selectedCountry}.</p>
                              ) : (
                                <p>There are {geoData.length} geothermal power plants in this dataset.</p>
                              )}
                            </div>
                          )}
                                                    <div className='geo-random'>
                          {randomElements.length > 0 && (
                            <div className='text-left'>
                              <h3>Here are some geo power plants:</h3>
                              <ul>
                                {randomElements.map((data) => (
                                  <li key={data._id}>
                                    <strong>{data.name}</strong> in&nbsp;
                                    {data.country_long} <strong>|</strong>&nbsp;
                                    Capacity: {data.capacity_mw.toFixed(2)} MW <strong>|</strong> 
                                    <strong> Commissioning Year:</strong> {data.commissioning_year ? Math.round(data.commissioning_year) : "Unavailable"}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                            <button className="btn text-white" onClick={() => window.location.href = '/node/api/data/Geothermal'}>Display All</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 d-flex  justify-content-center m-0 p-0">

            <Sidebar></Sidebar>

          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}


export default Geo;
