import React, {useState, useEffect, Component, useRef, useCallback} from 'react'
import 'firebase/firestore';
import { FirestoreCollection } from "@react-firebase/firestore";
import { Router } from "@reach/router"
import PropertyTemplate from "../../templates/property-page"
import Layout from '../../components/Layout'
import PropFeatures from '../../components/PropFeatures'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import queryString from 'query-string'
import Loading from '../../components/Loading'
import SideBarModal from '../../components/SideBarModal'
import StickyBox from "react-sticky-box";
import { Col } from 'react-bootstrap';
import GoogleMapComponent from '../../components/GoogleMapComponent';
import ReactBnbGallery from 'react-bnb-gallery';
import { gsap } from "gsap";
import DatePicker from '../../components/DatePicker'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

gsap.registerPlugin(gsap);

const Properties = React.memo((props) => {

    const [show, setShow]=useState(false)
    const [showSidebarModal, setShowSidebarModal] = useState(false)
    const [photos, setPhotos] =useState([])
    const [sort, setSort] = useState("")
    const [data, setData] = useState(null);
    const [winterLets, setWinterLets] = useState([])
    const [searchOperator, setSearchOperator] = useState("not-in")
    const [propertyIds, setPropertyIds] = useState([])
    const [stickyStyle, setStickyStyle] = useState({position:"absolute"})
    const [dates, setDates] = useState(null)
    const [horizontalExpanded, setHorizontalExpanded] = useState(false)
    const [filterExpanded, setFilterExpanded] = useState(true)
    
    const [amenitiesList, setAmenitiesList] = useState({
        hasPool: false,
        isWheelchairAccessible: false,
       allowsPets: false,
       hasAirConditioning: false,
       hasBarbecue: false,
       hasElevator: false,
       hasGarden: false,
       hasInternetWifi: false,
    })

    const container = useRef(null)
    const datePicker = useRef(null)

    useEffect(() => {
        return () => {
        }
    }, [props.state.searchArray.from, amenitiesList])

//Call hostfully api here if date search 
    useEffect(() => {
        props.handlePathChange(window.location.href)
        return () => {
            setPropertyIds([])
            setAmenitiesList({
                hasPool: false,
                isWheelchairAccessible: false,
                allowsPets: false,
                hasAirConditioning: false,
                hasBarbecue: false,
                hasElevator: false,
                hasGarden: false,
                hasInternetWifi: false,
            })
            setShow(false)
            setShowSidebarModal(false)
            setPhotos([])
            setSort("")
            setData(null);
            setWinterLets([])
            setSearchOperator("not-in")
            setStickyStyle({position:"absolute"})
            setDates(null)
            setHorizontalExpanded(false)
            setFilterExpanded(true)
        }
    }, [])

    useEffect(() => {
        if(props.state.searchArray.from?.[0] && props.state.searchArray.to[0]){
            try{
            const uri = `https://api.hostfully.com/v2/properties?checkInDate=${props.state.searchArray.from[0]}&checkOutDate=${props.state.searchArray.to[0]}&limit=100&agencyUid=ab8e3660-1095-4951-bad9-c50e0dc23b6f`
        
            fetch(uri, {
            headers:{
            "X-HOSTFULLY-APIKEY": process.env.GATSBY_HOSTFULLY_API_KEY
                }
            })
                .then(response => {
                    
                    return response.text()
                })
                .then(data => {
                setPropertyIds(JSON.parse(data).propertiesUids)
                })
            setDates({from: props.state.searchArray.from[0], to: props.state.searchArray.to[0]})    
        }
        catch(err){
        }
        }
        if(!props.state.searchArray.from && !props.state.searchArray.to){
            setDates(null)
            setPropertyIds([])
        }
        return () => {
            
        }
    }, [props.state.path, props.state.searchArray.from, props.state.searchArray.to])

    useEffect(() => {
        if(data){
            props.filterList(data);
        }
    }, [data])


    const handleGalleryClick = useCallback((photos) => {
        setShow(true);
        setPhotos(photos);
    }, [photos])

    const handleClose = useCallback(() => {
        setShow(false)
    });


    const handleSort = useCallback((sort) => {
        setSort(sort)
    }, [sort])

    const handleNewIds = useCallback((ids) =>{
        setPropertyIds(ids)
    })

    const handleTotalDays = useCallback((total) => {
        
    })

    const handleExpand = useCallback(() => {
        setHorizontalExpanded(!horizontalExpanded);
        setFilterExpanded(!horizontalExpanded && filterExpanded? false: filterExpanded)
    })

    const handleFilterExpand = useCallback(() =>{
        setFilterExpanded(!filterExpanded)
    })


    const handleSidebarModal = useCallback(()=>{
        setShowSidebarModal(!showSidebarModal)
    })

    const handleAmenityChange = useCallback((amenity) => {
        let list = amenitiesList;
        list[amenity] = !amenitiesList[`${amenity}`]
        setAmenitiesList({...list})
    })



    useScrollPosition(({ prevPos, currPos }) => {
        if(container.current.getBoundingClientRect().top < 0 && stickyStyle.position === "absolute"){
            setStickyStyle({position: "fixed"})
        }
        if(container.current.getBoundingClientRect().top > 0 && stickyStyle.position === "fixed"){
            setStickyStyle({position: "absolute"})
        }
      })


        return(
            <div ref={container}>
                <FirestoreCollection path="/Properties/">
                    {data => {       
                        return (!data.isLoading && data.value) ?  
                        <>
                        {setData(data.value)}

                        <Container style={{width:"100vw", maxWidth:"none"}} >
                            {props.state.searchArray.from && props.state.searchArray.to &&
                            <DatePicker from={props.state.searchArray.from[0]} to={props.state.searchArray.to[0]} handleDateChange={props.handleDateChange} handleNewIds={handleNewIds} handleTotalDays={handleTotalDays} handleClearDates={props.handleClearDates}
                            className="top-date-picker" style={stickyStyle}
                            /> }
                            <Row>
                                <Col xs={12} md={horizontalExpanded? 6 : 3} id="filter-sidebar" style={{transition:"all 1s"}}>
                                <StickyBox>
                                    <Container fluid style={{
                                        display: "flex",
                                        justifyContent: "space-between"}}>
                                            <div style={{display:"flex", flexWrap:"nowrap", margin: "auto 10px auto 0"}}>
                                        <Form.Group style={{margin:"10px auto"}}>
                                            <Form.Control as="select" onChange={(e)=>handleSort(e.target.value)} size="sm">
                                                <option value="">Sort By</option>
                                                <option value="price-min">Daily Rate € &#8594; €€€</option>
                                                <option value="price-max">Daily Rate €€€ &#8594; €</option>
                                                <option value="bedrooms-min">Bedrooms Increasing</option>
                                                <option value="bedrooms-max">Bedrooms Decreasing</option>
                                                <option value="a-z">A &#8594; Z</option>
                                                <option value="z-a">Z &#8594; A</option>
                                            </Form.Control>
                                        </Form.Group>
                                        </div>
                                        <div className="expandBtn" style={{float:"right", margin:"10px auto"}} onClick={handleSidebarModal}>  
                                                <p style={{margin: "auto"}}>Show Filters</p>
                                                <FontAwesomeIcon icon={faChevronRight} style={{margin:"auto 5px"}}/> 
                                        </div>
                                    </Container>
                                <GoogleMapComponent isMarkerShown="true" lat={37.150231} lng={-7.6457664} list={data.value} state={props.state} propertyIds={propertyIds} amenitiesList={amenitiesList} height={"95vh"}/>
                                <div className="expandBtn filterExpand" onClick={handleExpand}>
                                    {horizontalExpanded ? 
                                    <>
                                        <p>Shrink</p>
                                        <FontAwesomeIcon icon={faChevronLeft} style={{margin:"auto 5px"}}/>
                                    </> 
                                    :
                                    <>
                                        <p>Expand</p> 
                                    <FontAwesomeIcon icon={faChevronRight} style={{margin:"auto 5px"}}/> 
                                    </>}
                                </div>
                                </StickyBox>
                                </Col>
                                <Col xs={12} md={horizontalExpanded? 6 : 9} style={{transition:"all 1s"}}>
                                <PropFeatures gridItems={data} state={props.state} handleGalleryClick={handleGalleryClick} sort={sort} winterLets={winterLets} propertyIds={propertyIds} dates={dates} amenitiesList={amenitiesList}/>
                                </Col>
                            </Row>
                            <ReactBnbGallery
                                show={show}
                                photos={photos.map((photo,index)=>{return(photo.url)})}
                                onClose={handleClose}
                                /> 
                        </Container>
                        <SideBarModal 
                            show={showSidebarModal} 
                            close={handleSidebarModal}
                            data= {data} 
                            handleChange={props.handleChange} 
                            amenitiesList={amenitiesList}
                            handleAmenityChange= {handleAmenityChange}
                            state={props.state}
                            handleSliderChange={props.handleSliderChange}
                            handleSelectDeselectAll={props.handleSelectDeselectAll}/>
                        </> : <Loading /> 
                    }}
                </FirestoreCollection>
            </div>
        )
})



export default class PropertiesPage extends Component {
    constructor(props){
        super(props);
        this.state={
            city:{},
            type:{},
            dateStart:"",
            dateFinish:"",
            amenities:[],
            bedrooms: [1, 10],
            bathrooms: [1, 10],
            filteredSearch: {},
            searchArray: [],
            dataLength: 0,
            path: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.filterList = this.filterList.bind(this);
        this.handleSelectDeselectAll = this.handleSelectDeselectAll.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handlePathChange = this.handlePathChange.bind(this);
        this.handleClearDates = this.handleClearDates.bind(this);
    }


    handlePathChange(path){
        this.setState({path: path})
       const filterValues = queryString.parse(this.props.location.search);
       const keys = Object.keys(filterValues)
       keys.forEach(key =>{
           if(key == "bedrooms"){
                this.setState((state, props)=>({
                    ...state,
                    bedrooms: [parseInt(filterValues[key]), filterValues[key]+1 <11 ? filterValues[key] + 1: 10]
                }), ()=>{
                })
           }
           else{
        let searchArray = filterValues[key];
        searchArray = (Array.isArray(searchArray)?searchArray:[searchArray]);
           this.setState((state, props)=>({
               ...state,
               searchArray:{
                   ...state.searchArray,
                   [`${key}`]:searchArray
               },
               filteredSearch: {
                   ...state.filteredSearch,
                   [`${key}`]: true
               }
           }), ()=>{
           })
        }
           
       })
    }

    

    componentDidMount(){
        const path = window.location.href
        this.handlePathChange(path)
    } 

    filterList(props){

            let filterTypes = ["city", "type"]
            filterTypes.forEach(filterType => {
                let list = {}
                let filter = []
                props.map(prop=>{
                    filter.push(prop[filterType])
                })
                filter = [... new Set(filter)]
                filter.sort()
                filter.forEach((item, index)=>{
                    let exists = ((!!this.state.searchArray[filterType] && this.state.searchArray[filterType].indexOf(item) !== -1) == this.state.filteredSearch[filterType] || !this.state.filteredSearch[filterType])
                    list[item] = exists;
                })
                this.setState({
                    [filterType]: list
                },()=>{

                    this.setState({dataLength : props.length})
                })   
            })   
    }


    handleChange (e, type){
        let target = e.target.value
        this.setState((prevState, currentProps) => ({
            ...prevState,
            [type] : {...prevState[type],
                [target]: !this.state[type][target] }
        }), ()=>{
            }
        )
    }

    handleDateChange (date){
        this.setState((prevState, currentProps) => ({
            ...prevState,
            searchArray: {...prevState.searchArray,
            from:[date.from],
            to:[date.to]}
        }))
    }
    
    handleSelectDeselectAll(type, seldesel){
        Object.keys(this.state[type]).forEach((key, index)=>{
            this.setState((prevState, currentProps) => ({
                ...prevState,
                [type] : {...prevState[type],
                [key] : seldesel}
            })
            )
        }, ()=>{})

    }

    handleClearDates () {
        this.setState((prevState, currentProps) => {
            let newState = prevState
            delete newState.searchArray.from
            delete newState.searchArray.to
            newState.filteredSearch.from = false
            newState.filteredSearch.to = false
           
            return newState
            })
    }


    handleSliderChange(array, type){
        this.setState({
            [`${type}`]: array
        })
    }


    render() {

        return (
            <Layout pathKey={this.state.path} propTitle="Smartavillas - Algarve Property Listings" propDescription="Smartavillas.com specialise in helping Property Owners to provide their guests with good quality accommodation - at affordable prices - in the Eastern Algarve, with Tavira being the focal point. With dozens of properties, from Villas to seaside Apartments, Smartavillas offers the best the Algarve has to offer.">
                <Router>
                        <PropertyTemplate path="/properties/:id" 
                        handlePathChange= {this.handlePathChange}/>
                        <Properties path ="/properties" 
                        state={this.state} 
                        handleChange={this.handleChange} 
                        filterList={this.filterList} 
                        filterSearch={this.state.amenities}
                        handleSliderChange={this.handleSliderChange}
                        handleSelectDeselectAll={this.handleSelectDeselectAll}
                        handleDateChange= {this.handleDateChange}
                        handlePathChange= {this.handlePathChange}
                        handleClearDates= {this.handleClearDates}/>
                        
                </Router>       
            </Layout> 
          );
    }
}