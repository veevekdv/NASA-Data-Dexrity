import React, { useEffect, useState } from 'react';
import '../../App';
import Header from '../../components/Header/Header';
import map from '../../assets/images/windMap.jpg';
import legend from '../../assets/images/windLegend.jpg';
import Sidebar from '../../components/Sidebar/Sidebar';
import Dropdown from 'react-bootstrap/Dropdown';
import Footer from '../../components/Footer/Footer';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Wind = () => {
  const history = useHistory();
  const [windData, setWindData] = useState(null);
  const [displayAll, setDisplayAll] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [randomElements, setRandomElements] = useState([]);

  useEffect(() => {
    const fetchWindData = async () => {
      const response = await fetch('/node/api/data/Wind');
      const data = await response.json();
      setWindData(data);
    };

    fetchWindData();
  }, []);

  useEffect(() => {
    const randomElements = getRandomElements();
    setRandomElements(randomElements);
  }, [windData, selectedCountry]);

  const handleCountryChange = ({ target: { value } }) => {
    setSelectedCountry(value);
  };

  const displayAllJSON = () => {
    history.push('/node/api/data/Wind');
  };

  const downloadJSON = async () => {
    let url = '/node/api/data/Wind';
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
    link.download = selectedCountry ? `${selectedCountry}_wind_data.json` : 'wind_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  const getRandomElements = () => {
    if (!windData || windData.length === 0) return [];

    let filteredData = windData;
    if (selectedCountry) {
      filteredData = windData.filter(data => data.country_long === selectedCountry);
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
    <div className="Wind">
      <Header></Header>
      <head>      <meta name="description" content="Wind energy Explaination and Data from Nasa"></meta> </head>
      <div className="content container-fluid m-0 p-0">
        <div className="row p-0 m-0 parentRow full_height">
          <div className="col-md-9 d-flex bg-success p-0 m-0">
            <div className="row m-0 p-0 full_height">
              <div className="col-12 bg-danger left_content m-0 p-0 title-row">
                <div className="card bg-transparent title_box left_content m-0 p-0 p-4" >
                  <h5 className="card-title left m-0 d-flex display-5 text-white">Wind Energy</h5>
                </div>
              </div>
              <div className="col-12 bg-dark left_content m-0 p-0 info-row">
                <div className="card bg-white info_box left_content m-0 px-5" >
                  <div className="card-body">
                    <p className="card-text">Another renewable energy is wind energy. These are harnessed by windmills or wind turbines which transforms the kinetic energy of wind into mechanical energy. Then with a generator, this mechanical energy is transformed into electrical energy. Wind-generated electricity is measured in kilowatt-hours. Wind is an important renewable energy source as it is abundant and inexhaustible while providing electricity without burning any fuel or polluting the air.</p>
                    <div className="row info full_height p-0 mb-3">
                      <div className="col-4 full_height">


                      <div className="h2">2019 Data</div>
                      <img src={legend} alt="wind legend" className='fluid legend w-70'/>
                        <ul className='py-4 data mb-5'>
                          <li>The Gigawatt hour, abbreviated as GWh, is a unit of energy that represents one billion (1 000 000 000) watt-hours and is equal to one million kilowatt-hours.</li>
                          <li>Gigawatt hours are mostly used as a measurement of the output of large electric power stations.</li>
                          <li>One gigawatt could power 10 million watt bulbs. With a much lower energy consumption, one gigawatt could power 100 million LED lights.</li>
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
                            {windData && [...new Set(windData.map(data => data.country_long))].map(country => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </div>

                          <img src={map} alt="Wind map" className='fluid map_image'/>
                          {windData && (
                            <div className='text-center'>
                              {selectedCountry ? (
                                <p>There are {windData.filter(data => data.country_long === selectedCountry).length} wind power plants in this dataset from {selectedCountry}.</p>
                              ) : (
                                <p>There are {windData.length} wind power plants in this dataset.</p>
                              )}
                            </div>
                          )}
                                                    <div className='wind-random'>
                          {randomElements.length > 0 && (
                            <div className='text-left'>
                              <h3>Here are some wind power plants:</h3>
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
                            <button className="btn text-white" onClick={() => window.location.href = '/node/api/data/Wind'}>Display All</button>
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


export default Wind;
