import logo from './logo.svg';
import './App.css';
import Header from './Header';
import map from './assets/images/solarMap.jpg';
import Sidebar from './components/Sidebar/Sidebar';
import Dropdown from 'react-bootstrap/Dropdown';
import { BrowserRouter as Router, Route, Switch,useSearchParams } from 'react-router-dom';
import Solar from './pages/Solar/Solar';
import Wind from './pages/Wind/Wind';
import Hydro from './pages/Hydro/Hydro';
import Geo from './pages/Geo/Geo';
import Landing from './pages/Landing/Landing';
import Api from './pages/Api/api';
import Results from './pages/Results/results';



function App() {
  return (

    <Router>

          <div className="App">
            <div className="content">
              <Switch>
                <Route exact path="/node">
                  <Landing></Landing>
                </Route>
                <Route exact path="/node/solar">
                  <Solar />
                </Route>
                <Route path="/node/wind">
                  <Wind></Wind>
                </Route>
                <Route path="/node/hydro">
                  <Hydro></Hydro>
                </Route>
                <Route path="/node/geo">
                  <Geo></Geo>
                </Route>
                <Route path="/node/api">
                  <Api></Api>
                </Route>
                <Route path="/results">
                  <Results></Results>
                </Route>
                
              </Switch>
            </div>
          </div>


    </Router>

  );
}


export default App;
