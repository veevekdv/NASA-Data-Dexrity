import React, { useState, createContext } from 'react';
import { BiSearch, BiX } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import logo_hover from '../../assets/images/logo-white-no-background.png';
import logo from '../../assets/images/logo-yellow-no-background.png';
import '../../index.css';

const Header = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [logoImage, setLogoImage] = useState(logo_hover);
  
  const history = useHistory();

  const handleSearchClick = () => {
    setIsSearching(!isSearching);
    setSearchValue('');
  };

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {

    console.log(searchValue);
    
    history.push(`/results?query=${searchValue}`);
  
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleMouseEnter = () => {
    setLogoImage(logo);
  };

  const handleMouseLeave = () => {
    setLogoImage(logo_hover);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <div className="logo-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <a href="/node">
          <img src={logoImage} alt="Energy Explorer LOGO" />
            </a>
        </div>
        <ul className="navbar-nav">
          {!isSearching && (
            <>
              <li className="nav-item">
                <a href="/node/solar" className="nav-link">
                  Data
                </a>
              </li>
              
              <li className="nav-item">
                <a href="/node/api" className="nav-link">
                  API
                </a>
              </li>
            </>
          )}
          <li className="nav-item">
            <div className={"input-group " + (isSearching ? "search-open" : "")}>
              <input
                type="text"
                className={"form-control " + (isSearching ? "show" : "hide")}
                placeholder="Search"
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleKeypress}
              />
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSearchClick}
              >
                {isSearching ? <BiX /> : <BiSearch />}
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
