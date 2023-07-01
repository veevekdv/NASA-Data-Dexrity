import React, { useEffect, useState } from 'react';
import '../../App';
import Header from '../../components/Header/Header';
import map from '../../assets/images/hydroMap.jpg';
import legend from '../../assets/images/hydroLegend.jpg';
import Sidebar from '../../components/Sidebar/Sidebar';
import Dropdown from 'react-bootstrap/Dropdown';
import Footer from '../../components/Footer/Footer';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Hydro = () => {

    const history = useHistory();
  const [hydroData, setHydroData] = useState(null);
  const [displayAll, setDisplayAll] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [randomElements, setRandomElements] = useState([]);

  useEffect(() => {
    const fetchHydroData = async () => {
      const response = await fetch('/node/api/data/Hydro');
      const data = await response.json();
      setHydroData(data);
    };

    fetchHydroData();
  }, []);

  useEffect(() => {
    const randomElements = getRandomElements();
    setRandomElements(randomElements);
  }, [hydroData, selectedCountry]);

  const handleCountryChange = ({ target: { value } }) => {
    setSelectedCountry(value);
  };
  
  const displayAllJSON = () => {
    history.push('/node/api/data/Hydro');
  };

  const downloadJSON = async () => {
    let url = '/node/api/data/Hydro';
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
    link.download = selectedCountry ? `${selectedCountry}_hydro_data.json` : 'hydro_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  const getRandomElements = () => {
    if (!hydroData || hydroData.length === 0) return [];
  
    let filteredData = hydroData;
    if (selectedCountry) {
      filteredData = hydroData.filter(data => data.country_long === selectedCountry);
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
    <div className="Hydro">
      <Header></Header>
      <head>      <meta name="description" content="Hydro Explaination and Data from Nasa"></meta> </head>
      <div className="content container-fluid m-0 p-0">
        <div className="row p-0 m-0 parentRow full_height">
          <div className="col-md-9 d-flex bg-success p-0 m-0">
            <div className="row m-0 p-0 full_height">
              <div className="col-12 bg-danger left_content m-0 p-0 title-row">
                <div className="card bg-transparent title_box left_content m-0 p-0 p-4" >
                  <h5 className="card-title left m-0 d-flex display-5 text-white">Hydro Energy</h5>
                </div>
              </div>
              <div className="col-12 bg-dark left_content m-0 p-0 info-row">
                <div className="card bg-white info_box left_content m-0 px-5" >
                  <div className="card-body">
                    <p className="card-text">Hydropower, or water power, is the use of falling or fast-running water to produce electricity or to power machines. It's harnessed by converting the kinetic energy of a water source into power. Hydraulic power is calculated as density multiplied by volume multiplied by the acceleration due to gravity multiplied by distance.</p>
                    <div className="row info full_height p-0 mb-3">
                      <div className="col-4 full_height">


                        <div className="h2">2019 Data</div>
                        <img src={legend} alt="hydro legend" className='fluid legend w-70'/>
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
                            {hydroData && [...new Set(hydroData.map(data => data.country_long))].map(country => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </div>

                          <img src={map} alt="Hydro map" className='fluid map_image'/>
                          {hydroData && (
                            <div className='text-center'>
                              {selectedCountry ? (
                                <p>There are {hydroData.filter(data => data.country_long === selectedCountry).length} hydro power plants in this dataset from {selectedCountry}.</p>
                              ) : (
                                <p>There are {hydroData.length} hydro power plants in this dataset.</p>
                              )}
                            </div>
                          )}
                                                    <div className='hydro-random'>
                          {randomElements.length > 0 && (
                            <div className='text-left'>
                              <h3>Here are some hydro power plants:</h3>
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
                            <button className="btn text-white" onClick={() => window.location.href = '/node/api/data/Hydro'}>Display All</button>
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


export default Hydro;
