import React, { useState } from 'react';
import { BiSearch, BiX } from 'react-icons/bi';
import logo_hover from './assets/images/logo_hover.png';
import logo from './assets/images/logo.png';
import './index.css';

const Header = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [logoImage, setLogoImage] = useState(logo_hover);

  const handleSearchClick = () => {
    setIsSearching(!isSearching);
    setSearchValue('');
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
          <a href="https://www.earthdata.nasa.gov/learn/pathfinders">
          <img src={logoImage} alt="" />
            </a>
        </div>
        <ul className="navbar-nav">
          {!isSearching && (
            <>
              <li className="nav-item">
                <a href="/" className="nav-link">
                  Data
                </a>
              </li>
              <li className="nav-item">
                <a href="/energies" className="nav-link">
                  Topics
                </a>
              </li>
              <li className="nav-item">
                <a href="/about" className="nav-link">
                  Learn
                </a>
              </li>
              <li className="nav-item">
                <a href="/contact" className="nav-link">
                  Engage
                </a>
              </li>
              <li className="nav-item">
                <a href="/contact" className="nav-link">
                  About
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
