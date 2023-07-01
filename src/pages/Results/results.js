import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import '../../App.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
function Results() {
    const [query, setQuery] = useState('');
    const [articles, setArticles] = useState([]);
    const [powerplants, setPowerplants] = useState([]);
    const [maps, setMaps] = useState([]);

    useEffect(() => {
      const searchParams = new URLSearchParams(window.location.search);
      const query = searchParams.get('query');
      setQuery(query);

      const fetchData = async () => {
        try {
          const response = await fetch('/node/api/search/' + query);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const jsonData = await response.json();
          let refData;
          if(jsonData[0].length>3){
             refData=await jsonData[0].slice(0,3);
          }
          else{
             refData=await jsonData[0];
          }
          setPowerplants(refData);
          setArticles(jsonData[1]);
          setMaps(jsonData[2]);
          console.log(jsonData);
          console.log(jsonData[0]);
          console.log(jsonData[1]);
          console.log(jsonData[2]);
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error here
        }
      };

      
      fetchData();
    }, []);

  
  
const ArticleCard = ({ Heading, Authors, Link, Background }) => {
  return (
    <div className="card">
      <h3>{Heading}</h3>
      <p>{Background}</p>
      <p>{Authors}</p>
      <a href={Link}>{Link}</a>
    </div>
  );
};



const PowerplantCard = ({ name, country_long, url }) => {
  return (
    <div className="card">
      <h6>{name} in {country_long}</h6>
      <p>{url}</p>
    </div>
  );
};


const MapCard = ({ imageUrl, EnergyType }) => {

  let alttext = `Map listing powerplant locations with energy type ${EnergyType}`;
  
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const loadImage = async () => {
      const imageModule = await import(`./${imageUrl}`);
      setImageSrc(imageModule.default);
    };
    loadImage();
  }, [imageUrl]);

  return (
    <div className="card">
      {imageSrc && <img src={imageSrc} alt={alttext} />}
    </div>
  );
};



//This CardList component still needs to be completed
const CardList = ({type, data}) => {
  if(type === 'article') {
    return (
      <div className="card-list">
        {data.map((item, index) => (
          <div className="my-3" key={index}>
            <ArticleCard Heading={item.Heading} Authors={item.Authors} Link={item.Link} Background={item.Background} />
          </div>
        ))}
      </div>
    );
  }
  if(type === 'powerplant') {
    return (
      <div className="card-list">
        {data.map((item, index) => (
          <div className="my-3" key={index}>
            <PowerplantCard name={item.name} country_long={item.country_long} url={item.url} />
          </div>
        ))}
      </div>
    );
  } 
  console.log(type);
  if(type === 'maps') {
    console.log("this is a map type");
    return (
      <div className="card-list">
        {data.map((item, index) => (
          <div className="my-3" key={index}>
            <MapCard imageUrl={item.pathInProject} EnergyType={item.EnergyType} />
          </div>
        ))}
      </div>
    );
  }
};



  return (
    <div className='Results'>
        <Header></Header>
      <div className="content container-fluid m-0 p-0">
          <div className="row p-0 m-0 parentRow full_height">
            <div className="col-md-9 d-flex p-0 m-0">
              <div className="row m-0 p-0 full_height">
                <div className="col-12 bg-danger left_content m-0 p-0 title-row">
                  <div className="card bg-transparent title_box left_content m-0 p-0 p-4" >
                    <h5 className="card-title left m-0 d-flex display-5 text-white">Search Results for "{query}": </h5>
                  </div>
                </div>
                <div className="col-12 left_content m-0 p-0 info-row">
                  <div className="card bg-white info_box left_content my-2 px-5" >
                    <div className="card-body">
                        <a href="/node/solar" className="btn btn-primary">Solar</a>

                        <h6 className="card-title left m-0 d-flex display-5 text-black"> Found Articles</h6>
                        <CardList type='article' data={articles} />
                    </div>
                    <div className="card-body">
                        <h6 className="card-title left m-0 d-flex display-5 text-black"> Found Powerplants</h6>
                        <CardList type='powerplant' data={powerplants} />
                    </div>
                    <div className="card-body">
                        <h6 className="card-title left m-0 d-flex display-5 text-black"> Found Maps</h6>
                        <CardList type='maps' data={maps} />
                      
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

export default Results;