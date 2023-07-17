import React from 'react'
import {useTranslation} from 'gatsby-plugin-react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBed, faShower } from '@fortawesome/free-solid-svg-icons';

//Bed, bath and pax component
const BedBathPax = (prop) => {

    const {t} = useTranslation(['translation']);

    return (
        <div className="header-icons" style={{color:prop.color}}>
              <div className="icon-info">
                  <FontAwesomeIcon icon={faBed} />
    <span className="tooltiptext">{t("Bedrooms")}</span>
                      <div className="text-number">
                          <h3>{prop.bedrooms}</h3>
                      </div>
              </div>
              <div className="icon-info">
              <FontAwesomeIcon icon={faShower} />
                  <span className="tooltiptext">{t("Bathrooms")}</span>
                  <div className="text-number">
                      <h3>{prop.bathrooms}</h3>
                  </div>
              </div>
              <div className="icon-info">
              <FontAwesomeIcon icon={faUsers} />
                  <span className="tooltiptext">{t("Sleeps")}</span>
                  <div className="text-number">
                      <h3>{prop.baseGuests}</h3>
                  </div>
              </div>
            </div>
    )
}

export default BedBathPax