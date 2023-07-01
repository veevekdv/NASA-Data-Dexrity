import  './Landing.css';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import RelatedArticles from '../RelatedArticles'
import Footer from '../../components/Footer/Footer';
import Dropdown from 'react-bootstrap/Dropdown';
import map from '../../assets/images/solarMap.jpg';


const Landing = () => {
    return (
        <div className="Landing">
          <Header></Header>
          <head>      <meta name="description" content="Nasa data on renewable energys"></meta> </head>

          <div className="content container-fluid m-0 p-0">
        <div className="row p-0 m-0 parentRow full_height">
          <div className="col-md-9 d-flex p-0 m-0">
            <div className="row m-0 p-0 full_height">
              <div className="col-12 left_content m-0 p-0 title-row">
                <div className="card bg-transparent title_box left_content m-0 p-0 p-4" >
                  <h5 className="card-title left m-0 d-flex display-5 text-white">Energy Explorer</h5>
                </div>
              </div>


              <div className="col-12 left_content pl-5 text-row">

                <div className="left_content m-0 p-0 mission-row">
                  <div className="card bg-transparent title_box left_content m-0 p-0 p-4 border-0" >
                    <h5 className="card-title left m-0 d-flex display-5 blue_text">Mission Statement</h5>
                    <p className="card-text mission_statement my-3 pe-5">
                    Our mission is to utilize NASA data to educate and inform the public about renewable energy sources, promoting sustainable living and a greener future for all through accessible and user-friendly resources and interactive tools. 
                    </p>
                  </div>
                </div>
                <div className="left_content m-0 p-0 mission-row">
                  <div className="card bg-transparent title_box left_content m-0 p-0 p-4 border-0" >
                    <h5 className="card-title left m-0 d-flex display-5 blue_text">Description</h5>
                    <p className="card-text description my-3 pe-5">
                      Our website is dedicated to using NASA's research and data to educate and inform the public about the benefits and advancements in renewable energy. We believe in a sustainable future for all and strive to make learning about clean energy accessible and engaging for everyone. Our interactive tools and resources will help you understand and explore the possibilities of a greener planet.
                    </p>
                  </div>
                </div>
                
                <RelatedArticles> </RelatedArticles>
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
 
export default Landing;