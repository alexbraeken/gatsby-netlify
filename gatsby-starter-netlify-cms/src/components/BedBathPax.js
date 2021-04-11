import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBed, faShower } from '@fortawesome/free-solid-svg-icons';

//Bed, bath and pax component
const BedBathPax = (prop) => {
    return (
        <div className="header-icons" style={{margin:"auto", color:prop.color}}>
              <div className="icon-info">
                  <FontAwesomeIcon icon={faBed} style={{margin:"auto"}}/>
                      <span className="tooltiptext">Bedrooms</span>
                      <div className="text-number">
                          <h3>{prop.bedrooms}</h3>
                      </div>
              </div>
              <div className="icon-info">
              <FontAwesomeIcon icon={faShower} style={{margin:"auto"}}/>
                  <span className="tooltiptext">Bathrooms</span>
                  <div className="text-number">
                      <h3>{prop.bathrooms}</h3>
                  </div>
              </div>
              <div className="icon-info">
              <FontAwesomeIcon icon={faUsers} style={{margin:"auto"}}/>
                  <span className="tooltiptext">Sleeps</span>
                  <div className="text-number">
                      <h3>{prop.baseGuests}</h3>
                  </div>
              </div>
            </div>
    )
}

export default BedBathPax