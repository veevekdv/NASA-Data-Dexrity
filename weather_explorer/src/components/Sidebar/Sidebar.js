import React, { useState } from 'react';
import './sidebarStyle.css';

const Accordion = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="accordion">
      <button className="accordion-title" onClick={toggleAccordion}>
        {title}
        <span className={isExpanded ? "icon minus" : "icon plus"} />
      </button>
      {isExpanded && <div className="accordion-content">{children}</div>}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div id="menu">
      <div className='menu-item my-3'>
        <h3>Navigation</h3>
        <a href="/node">Home</a>
        <br />
        <a href="/node/solar">Solar</a>
        <br />
        <a href="/node/wind">Wind</a>
        <br />
        <a href="/node/hydro">Hydro</a>
        <br />
        <a href="/node/geo">Geothermal</a>
        <br />
      </div>

      <hr className="solid" />

      <div className='menu-item'>
        <h3>FAQ</h3>
        <Accordion title="What data does this cover?">
          <p>Our project covers data related to renewable energy sources, including solar, wind, hydro, and geothermal.</p>
        </Accordion>
        <Accordion title="What format for data download?">
          <p>The data can be downloaded as a JSON or a CSV file</p>
        </Accordion>
        <Accordion title="What resources does this use?">
          <p>Links to the full archive</p>
        </Accordion>
        <Accordion title="How often is the map updated?">
          <p>Yearly</p>
        </Accordion>
      </div>

      <hr className="solid" />

      <div className='menu-item'>
        <h3>Data Archives</h3>
        <button className='btn text-white' onClick={() => window.location.href = '/node/api/data/Solar'}>Solar</button>
        <button className='btn text-white' onClick={() => window.location.href = '/node/api/data/Wind'}>Wind</button>
        <button className='btn text-white' onClick={() => window.location.href = '/node/api/data/Hydro'}>Hydro</button>
      </div>
    </div>
  );
};

export default Sidebar;
