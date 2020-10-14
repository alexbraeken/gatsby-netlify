import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

const BackToTop = () => {

    const [showButton, setShowButton] = useState(false);
    const [buttonStyle, setButtonStyle] = useState({
        transition: 'all 300ms ease-in',
        transform: 'translate( 0, 500%)'
      })

    useScrollPosition(({ prevPos, currPos }) => {
        const isShow = -900 > currPos.y;
        console.log(currPos);
        if (isShow !== showButton) setShowButton(isShow)

        const shouldBeStyle = {
            visibility: isShow ? 'visible' : 'hidden',
            transition: `all 300ms ${isShow ? 'ease-in' : 'ease-out'}`,
            transform: isShow ? 'none' : 'translate( 0, 500%)'
          }
      
        if (JSON.stringify(shouldBeStyle) !== JSON.stringify(buttonStyle)) 
            return setButtonStyle(shouldBeStyle)
      }, [showButton, buttonStyle])

      const handleClick = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    return (
        <Button variant="outline-dark" className="back-to-top" style={{...buttonStyle}} onClick={handleClick}><FontAwesomeIcon icon={faArrowUp}/></Button>
    )
}

export default BackToTop