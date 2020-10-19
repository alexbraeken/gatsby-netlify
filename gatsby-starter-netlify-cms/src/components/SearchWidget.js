import React, {useEffect, useState} from 'react'


const SearchWidget = (props) => {


    return(
        <>
        <div id="searchwidget"></div>
        <script>
            {`var searchwidget = new SearchWidget('searchwidget', 'https://platform.hostfully.com/vacation-rental-properties/smartavillas.com', {"lang":"US","fields":["checkIn","checkOut","guests"],"maximumGuests":30,"daysBetweenDates":7,"openInNewTab":false,"backgroundColorButton":"#FFFFFF","colorButton":"#000000"});
        console.log(SearchWidget)`}
        </script>
        </>
    )
}

export default SearchWidget