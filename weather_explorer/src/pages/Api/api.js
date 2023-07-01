import "../Landing/Landing.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import RelatedArticles from "../RelatedArticles";
import Footer from "../../components/Footer/Footer";

const Api = () => {
  return (
    <div className="Landing">
      <Header></Header>

      <div className="content container-fluid m-0 p-0">
        <div className="row p-0 m-0 parentRow full_height">
          <div className="col-md-9 d-flex p-0 m-0">
            <div className="row m-0 p-0 full_height">
              <div className="col-12 left_content m-0 p-0 title-row">
                <div className="card bg-transparent title_box left_content m-0 p-0 p-4">
                  <h5 className="card-title left m-0 d-flex display-5 text-white">
                    API Documentation: Endpoints
                  </h5>
                </div>
              </div>

              <div className="pl-5 pt-5 ms-4 mt-3">
                <div>
                    <h5 className="card-title left m-0 d-flex display-5 blue_text">
                    1. /api/data/:energyType
                    </h5>
                    <p className="card-text mission_statement my-3 pe-5">
                    Method: GET
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Description: This API endpoint retrieves data about power plants based on the type of energy used.
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Parameters: 
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;energyType (required) - string: The type of energy used in the power plant.
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Response:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    If successful:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Status code: 200
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Response body: An array of objects representing the power plants that use the specified type of energy. 
                    &emsp;Each object contains information about the power plant, including its name, primary fuel, location, and data.
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    If the specified energyType is not found:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Status code: 404
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Response body: "Data not found"
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    If an error occurs:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Status code: 500
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Response body: "Error getting data"
                    </p>
                </div>

                <div>
                    <h5 className="card-title left m-0 d-flex display-5 blue_text">
                    2. /api/data/:energyType/:location
                    </h5>
                    <p className="card-text mission_statement my-3 pe-5">
                    Method: GET
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Description: This API endpoint retrieves data about power plants based on the type of energy used and their location.
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Parameters:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;energyType (required) - string: The type of energy used in the power plant.
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;location (required) - string: The location of the power plant.
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Response:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    If successful:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Status code: 200
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Response body: An array of objects representing the power plants that use the specified type of energy and are located in the specified country. 
                    &emsp;Each object contains information about the power plant, including its name, primary fuel, location, and data.
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    If the specified energyType or location is not found:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Status code: 404
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Response body: "Data not found"
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    If an error occurs:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Status code: 500
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Response body: "Error getting data"
                    </p>
                </div>

                <div>
                    <h5 className="card-title left m-0 d-flex display-5 blue_text">
                    3. /api/data/:energyType
                    </h5>
                    <p className="card-text mission_statement my-3 pe-5">
                    Method: POST
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Description: This API endpoint adds new data about a power plant to the database.
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Parameters:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;energyType (required) - string: The type of energy used in the power plant.
                    &emsp;Request body:

                    &emsp;&emsp;name (required) - string: The name of the power plant. <br />
                    &emsp;&emsp;location (required) - string: The country where the power plant is located. <br />
                    &emsp;&emsp;data (required) - object: Additional data about the power plant. <br />
                    </p>
                  
                    <p className="card-text mission_statement my-3 pe-5">
                    Response:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    If successful:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Status code: 200
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Response body: "Data added successfully"
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    If an error occurs:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Status code: 500
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Response body: "Error getting data"
                    </p>
                </div>

                <div>
                    <h5 className="card-title left m-0 d-flex display-5 blue_text">
                    /api/data/:energyType
                    </h5>
                    <p className="card-text mission_statement my-3 pe-5">
                    Method: PUT
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Description: This API endpoint updates data about a power plant in the database.
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Parameters:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;energyType (required) - string: The type of energy used in the power plant.
                    Request body:

                    &emsp;name (required) - string: The new name of the power plant.
                    &emsp;location (required) - string: The new country where the power plant is located.
                    &emsp;data (required) - object: The new additional data about the power plant.
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Response:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    If successful:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Status code: 200
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Response body: "Data updated successfully"
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    If the specified energyType is not found:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Status code: 404
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Response body: "Data not found"
                    </p>

                    <p className="card-text mission_statement my-3 pe-5">
                    If an error occurs:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Status code: 500
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Response body: "Error updating data"
                    </p>
                </div>

                <div>
                    <h5 className="card-title left m-0 d-flex display-5 blue_text">
                    /api/maps/:energyType
                    </h5>
                    <p className="card-text mission_statement my-3 pe-5">
                    Method: GET
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Description: This endpoint is used to fetch the image file based on the energy type provided in the URL parameter. It accepts a GET request and returns the image file in response. If the image file is not found for the provided energy type, it returns a 404 Not Found error response.
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Parameters:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;energyType (required): Energy type for which the image file is requested. It should be a string value.
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Response:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Content-Type: image/jpeg
                    &emsp;Response body: Binary image data
                    &emsp;Status codes: 200 OK, 404 Not Found, 500 Internal Server Error
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Example usage:
                    &emsp;GET /api/maps/solar
                    &emsp;Response: Returns the image file for solar energy type.
                    </p>
                </div>


                <div>
                    <h5 className="card-title left m-0 d-flex display-5 blue_text">
                    /api/download-map/:energyType
                    </h5>
                    <p className="card-text mission_statement my-3 pe-5">
                    Method: GET
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Description: This endpoint is used to download the image file based on the energy type provided in the URL parameter. It accepts a GET request and returns the image file as a downloadable attachment. If the image file is not found for the provided energy type, it returns a 404 Not Found error response.
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Parameters:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">        
                    &emsp;energyType (required): Energy type for which the image file is requested. It should be a string value.
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Response:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Content-Disposition: attachment; filename=[image name]
                    &emsp;Content-Type: image/jpeg
                    &emsp;Response body: Binary image data
                    &emsp;Status codes: 200 OK, 404 Not Found, 500 Internal Server Error
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Example usage:
                    &emsp;GET /api/download-map/wind
                    &emsp;Response: Downloads the image file for wind energy type.Returns the image file for solar energy type.
                    </p>
                </div>

                <div>
                    <h5 className="card-title left m-0 d-flex display-5 blue_text">
                    /api/search/:query
                    </h5>
                    <p className="card-text mission_statement my-3 pe-5">
                    Method: GET
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Description: This endpoint is used to search for data from three different collections - PowerPlant, Articles, and Images. It accepts a GET request and returns the search results in response. The search is case-insensitive and looks for the provided query parameter in different fields of each collection. If no results are found for the provided query, it returns a 404 Not Found error response.
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Parameters:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">        
                    &emsp;query (required): Query string to search for data. It should be a string value.
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Response:
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    &emsp;Response body: JSON array of search results from three different collections - PowerPlant, Articles, and Images. Each object in the array represents a search result and contains different fields based on the collection it belongs to.
                    &emsp;Status codes: 200 OK, 404 Not Found, 500 Internal Server Error
                    </p>
                    <p className="card-text mission_statement my-3 pe-5">
                    Example usage:
                    &emsp;GET /api/search/coal
                    &emsp;Response: Returns search results containing the word "coal" from three different collections - PowerPlant, Articles, and Images.
                    </p>
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
};

export default Api;
