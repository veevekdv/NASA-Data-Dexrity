import React, { useEffect, useState } from 'react';
import '../../App';
import Header from '../../components/Header/Header';
import map from '../../assets/images/solarMap.jpg';
import legend from '../../assets/images/solarLegend.jpg';
import Sidebar from '../../components/Sidebar/Sidebar';
import Dropdown from 'react-bootstrap/Dropdown';
import Footer from '../../components/Footer/Footer';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';




const Solar = () => {
  const history = useHistory();
  const [solarData, setSolarData] = useState(null);
  const [displayAll, setDisplayAll] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [randomElements, setRandomElements] = useState([]);

  useEffect(() => {
    const fetchSolarData = async () => {
      const response = await fetch('/node/api/data/Solar');
      const data = await response.json();
      setSolarData(data);
    };

    fetchSolarData();
  }, []);

  useEffect(() => {
    const randomElements = getRandomElements();
    setRandomElements(randomElements);
  }, [solarData, selectedCountry]);

  const handleCountryChange = ({ target: { value } }) => {
    setSelectedCountry(value);
  };
  

  const displayAllJSON = () => {
    history.push('/node/api/data/Solar');
  };

  const downloadJSON = async () => {
    let url = '/node/api/data/Solar';
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
    link.download = selectedCountry ? `${selectedCountry}_solar_data.json` : 'solar_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  const getRandomElements = () => {
    if (!solarData || solarData.length === 0) return [];
  
    let filteredData = solarData;
    if (selectedCountry) {
      filteredData = solarData.filter(data => data.country_long === selectedCountry);
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
  
  

  
  // const randomElements = getRandomElements();
  

  // console.log(`Data length: ${solarData.length}`);
  // console.log(`First 5 entries: ${JSON.stringify(solarData.slice(0, 5))}`);
  return (
    <div className="Solar">
      <Header></Header>
      <head>      <meta name="description" content="Solar energy Explaination and Data from Nasa"></meta> </head>
      <div className="content container-fluid m-0 p-0">
        <div className="row p-0 m-0 parentRow full_height">
          <div className="col-md-9 d-flex bg-success p-0 m-0">
            <div className="row m-0 p-0 full_height">
              <div className="col-12 bg-danger left_content m-0 p-0 title-row">
                <div className="card bg-transparent title_box left_content m-0 p-0 p-4" >
                  <h5 className="card-title left m-0 d-flex display-5 text-white">Solar Energy</h5>
                </div>
              </div>
              <div className="col-12 bg-dark left_content m-0 p-0 info-row">
                <div className="card bg-white info_box left_content m-0 px-5" >
                  <div className="card-body">
                    <p className="card-text">A renewable energy resource that easily comes to mind is solar. To put it simply, solar power is energy from the sun that's converted into thermal or electrical energy using photovoltaic panels or mirrors that concentrate the solar radiation. These are measured as power (or rate of energy/sunlight) per unit area. As a renewable source of power, solar energy has an important role in reducing greenhouse gas emissions and mitigating climate change, which is critical to protecting humans, wildlife, and ecosystems. Solar energy can also improve air quality and reduce water use from energy production.</p>
                    <div className="row info full_height p-0 mb-3">
                      <div className="col-4 full_height">


                        <div className="h2">2019 Data</div>
                        <img src={legend} alt="solar legend" className='fluid legend w-70'/>
                        <ul className='py-4 data'>
                          <li>Compiled from 2019 data by Global Solar Atlas 2.0, this data map from The World Bank displays the photovoltaic power potential (PVOUT) of countries based each country's daily and yearly totals. This is measured by kilowatt hour (kWh) per kilowatt peak (kWp).</li>
                          <li>The legend displayed at the bottom of the map indicates a sliding scale of PVOUT. Leftmost purple indicates least PVOUT, while rightmost red indicates most PVOUT in comparison with all the other countries.</li>
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
                            {solarData && [...new Set(solarData.map(data => data.country_long))].map(country => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </div>


                          <img src={map} alt="solar map" className='fluid map_image'/>
                          {solarData && (
                            <div className='text-center'>
                              {selectedCountry ? (
                                <p>There are {solarData.filter(data => data.country_long === selectedCountry).length} solar power plants in this dataset from {selectedCountry}.</p>
                              ) : (
                                <p>There are {solarData.length} solar power plants in this dataset.</p>
                              )}
                            </div>
                          )}

                          <div className='solar-random'>
                          {randomElements.length > 0 && (
                            <div className='text-left'>
                              <h3>Here are some solar power plants:</h3>
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
                            <button className="btn text-white" onClick={() => window.location.href = '/node/api/data/Solar'}>Display All</button>
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


export default Solar;
