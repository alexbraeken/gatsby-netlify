import React, {useState, useEffect, Component, useCallback} from 'react'
import { graphql } from 'gatsby'
import 'firebase/firestore';
import { FirestoreCollection } from "@react-firebase/firestore";
import { Router, useLocation } from "@reach/router"
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet'

gsap.registerPlugin(gsap);

const Properties = React.memo((props) => {

    const [show, setShow]=useState(false)
    const [showSidebarModal, setShowSidebarModal] = useState(false)
    const [photos, setPhotos] =useState([])
    const [sort, setSort] = useState("")
    const [data, setData] = useState(null);
    const [winterLets, setWinterLets] = useState([])
    const [advancedSearch, setAdvancedSearch] = useState(false)
    const [propertyIds, setPropertyIds] = useState([])
    const [propList, setPropList] = useState([])
    const [dates, setDates] = useState(null)
    const [horizontalExpanded, setHorizontalExpanded] = useState(false)
    const [filterExpanded, setFilterExpanded] = useState(true)
    const [cardDisplayNum, setCardDisplayNum] = useState(null)
    const [fetchError, setFetchError] = useState(false)
    
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

    const {t} = useTranslation(['properties', 'translation', 'amenities', 'calendar']);
    const {language} = useI18next();



    useEffect(() => {
        return () => {
        }
    }, [props.state.searchArray.from, amenitiesList])


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
            
            setDates(null)
            setHorizontalExpanded(false)
            setFilterExpanded(true)
            setPropList([])
        }
    }, [])
    
//Call hostfully api here if date search 
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
                .catch((error) => {
                    setFetchError(true)
                });
            setDates({from: props.state.searchArray.from[0], to: props.state.searchArray.to[0]})
            setAdvancedSearch(true)    
        }
        catch(err){
        }
        }
        if(!props.state.searchArray.from && !props.state.searchArray.to){
            setDates(null)
            setPropertyIds([])
            setAdvancedSearch(false)
        }
        return () => {
            
        }
    }, [props.state.path, props.state.searchArray.from, props.state.searchArray.to])

    useEffect(() => {
        if(data){
            props.filterList(data);
        }
    }, [data])

    useEffect(() => {
        const amenities = []
        Object.keys(amenitiesList).forEach(amenity => {
            return amenitiesList[amenity] ? amenities.push(amenity) : null
        })


        const list = []
        if(data){
            data.forEach((item, index) => {
                let amenityBool = []
                
                if(amenities.length > 0 && item.amenities){
                    amenities.forEach(amenity => {
                        amenityBool.push(item.amenities[`${amenity}`])
                    })
                }else{
                    amenityBool.push(true)
                }
                if((props.state.city[item.city])
                    && (props.state.type[item.type])
                    && (props.state.bedrooms[0] <= parseInt(item.bedrooms))
                    && (parseInt(item.bedrooms) <= props.state.bedrooms[1])
                    && (props.state.bathrooms[0] <= parseInt(item.bathrooms)) 
                    && (parseInt(item.bathrooms) <= props.state.bathrooms[1])
                    && (advancedSearch === (propertyIds.indexOf(item.uid) !== -1))
                    && !amenityBool.includes(false)){  
                    list.push(item)
                } 
            })
            
    
            switch(sort){
                case "price-min": list.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.baseDailyRate > b.baseDailyRate) ? 1 : ((b.baseDailyRate > a.baseDailyRate) ? -1 : 0))));
                break;
                case "price-max": list.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.baseDailyRate < b.baseDailyRate) ? 1 : ((b.baseDailyRate < a.baseDailyRate) ? -1 : 0))));
                break;
                case "bedrooms-min": list.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.bedrooms > b.bedrooms) ? 1 : ((b.bedrooms > a.bedrooms) ? -1 : 0))));
                break;
                case "bedrooms-max" : list.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.bedrooms < b.bedrooms) ? 1 : ((b.bedrooms < a.bedrooms) ? -1 : 0))));
                break;
                case "a-z": list.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))));
                break;
                case "z-a": list.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))));
                break;
                default: list.sort((a, b)=>(a === null)? 1 : ((b === null)? -1 : ((a.rank > b.rank) ? -1 : ((b.rank > a.rank) ? 1 : 0))));
            }
    
            setPropList(list)
        }
        
        return () => {
            setPropList([])
        }
    }, [data, advancedSearch, props.state, sort, propertyIds, amenitiesList])


    const handleGalleryClick = useCallback((photos) => {
        setShow(true);
        setPhotos(photos);
    }, [])

    const handleClose = () => {
        setShow(false)
    };


    const handleSort = useCallback((sort) => {
        setSort(sort)
    }, [])

    const handleNewIds = (ids) =>{
        setPropertyIds(ids)
    }


    const handleExpand = () => {
        setHorizontalExpanded(!horizontalExpanded);
        setFilterExpanded(!horizontalExpanded && filterExpanded? false: filterExpanded)
    }


    const handleSidebarModal = ()=>{
        setShowSidebarModal(!showSidebarModal)
    }

    const handleAmenityChange = useCallback((amenity) => {
        let list = amenitiesList;
        list[amenity] = !amenitiesList[`${amenity}`]
        setAmenitiesList({...list})
    }, [amenitiesList])

    const handleDisplayNumChange = (displayNum) => {
        setCardDisplayNum(displayNum)
    }



        return(
            <div>
                <FirestoreCollection path="/Properties/">
                    {data => {       
                        return (!data.isLoading && data.value) ?  
                        <>
                        {setData(data.value)}

                        <Container style={{width:"100vw", maxWidth:"none", minHeight: "100vh"}} >
                            <Row>
                                <Col xs={12} md={horizontalExpanded? 6 : 3} id="filter-sidebar" style={{transition:"all 1s"}}>
                                <StickyBox>
                                    <Container fluid style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        height: "6vh",
                                        minHeight: "55px"}}>
                                            <div style={{display:"flex", flexWrap:"nowrap", margin: "auto 10px auto 0"}}>
                                        <Form.Group style={{margin:"10px auto"}}>
                                            <Form.Control as="select" onChange={(e)=>handleSort(e.target.value)} size="sm">
                                                <option value="">{t("Sort By")}</option>
                                                <option value="price-min">{t("Daily Rate")}€ &#8594; €€€</option>
                                                <option value="price-max">{t("Daily Rate")}€€€ &#8594; €</option>
                                                <option value="bedrooms-min">{t("Bedrooms")} {t("Increasing")}</option>
                                                <option value="bedrooms-max">{t("Bedrooms")} {t("Decreasing")}</option>
                                                <option value="a-z">A &#8594; Z</option>
                                                <option value="z-a">Z &#8594; A</option>
                                            </Form.Control>
                                        </Form.Group>
                                        </div>
                                        <div className="expandBtn" role="button" tabindex="0" style={{float:"right", margin:"10px auto"}} onClick={handleSidebarModal} onKeyDown={(e)=>{if(e.key === 'Enter'){handleSidebarModal()}}}>  
                                                <p style={{margin: "auto"}}>{t("Filters")}</p>
                                                <FontAwesomeIcon icon={faChevronRight} style={{margin:"auto 5px"}}/> 
                                        </div>
                                    </Container>
                                <GoogleMapComponent isMarkerShown="true" lat={37.150231} lng={-7.6457664} list={propList} state={props.state} propertyIds={propertyIds}  height={"94vh"} cardDisplayNum={cardDisplayNum}/>
                                <div className="expandBtn filterExpand" role="button" tabindex="0" onClick={handleExpand} onKeyDown={(e)=>{if(e.key === 'Enter'){handleExpand()}}} >
                                    {horizontalExpanded ? 
                                    <>
                                        <p>{t("Shrink")}</p>
                                        <FontAwesomeIcon icon={faChevronLeft} style={{margin:"auto 5px"}}/>
                                    </> 
                                    :
                                    <>
                                        <p>{t("Expand")}</p> 
                                    <FontAwesomeIcon icon={faChevronRight} style={{margin:"auto 5px"}}/> 
                                    </>}
                                </div>
                                </StickyBox>
                                </Col>
                                <Col xs={12} md={horizontalExpanded? 6 : 9} style={{transition:"all 1s", overflowX:"hidden"}}>
                                <PropFeatures propList={propList} state={props.state} handleGalleryClick={handleGalleryClick} winterLets={winterLets} dates={dates} amenitiesList={amenitiesList} handleDateChange={props.handleDateChange} handleNewIds={handleNewIds}  handleClearDates={props.handleClearDates} handleDisplayNumChange={handleDisplayNumChange} fetchError={fetchError}/>
                                </Col>
                            </Row>
                            <ReactBnbGallery
                                show={show}
                                photos={photos.map((photo,index)=>{return({photo: photo.url, caption: photo.description})})}
                                onClose={handleClose}
                                />
                                <Helmet>
                                    <style>
                                        {`.gallery .gallery-control--next, .gallery .gallery-control--prev{
                                            border: none;
                                        }`}
                                    </style>
                                </Helmet> 
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
                        </> 
                        : 
                        <>
                            <Container style={{width:"100vw", maxWidth:"none"}} >
                            <Row>
                                <Col xs={12} md={3} id="filter-sidebar">
                                <div className="placeholder-box blink" style={{height:"100%", minHeight:"90vh"}}></div>
                                </Col>
                                <Col>
                                    <Loading />
                                </Col> 
                                </Row>
                            </Container>
                        </>
                    }}
                </FirestoreCollection>
            </div>
        )
})



const PropertiesClass = class extends React.Component {
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
            path: '',
            t: null,
            navClass: null
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
        if(path){
            this.setState({path: path})
            const filterValues = queryString.parse(this.props.path.search);
            const keys = Object.keys(filterValues)
            keys.forEach(key =>{
                if(key === "bedrooms"){
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
    }

    

    componentDidMount(){
        const path = window.location.href
        this.handlePathChange(path)
    } 

    componentDidUpdate(prevProps){
        
        if(this.props !== prevProps){
            const path = window.location.href
            const propPage = path.match(/(?:\/properties\/)([^\?]+)(?=\?*)/)
            if(propPage?.[1].length > 1){
                this.setState({navClass: 'gradient'})
            }else{
                this.setState({navClass: ''})
            }
        }
    }

    filterList(props){

            let filterTypes = ["city", "type"]
            filterTypes.forEach(filterType => {
                let list = {}
                let filter = new Set()
                props.forEach(prop=>{
                    filter.add(prop[filterType])
                })
                filter = [...filter]
                filter.sort()
                filter.forEach((item, index)=>{
                    let exists = ((!!this.state.searchArray[filterType] && this.state.searchArray[filterType].indexOf(item) !== -1) === this.state.filteredSearch[filterType] || !this.state.filteredSearch[filterType])
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

        const t = this.props.useTranslation.t

        return (
            <Layout pathKey={this.props.path} propTitle={t("title")} propDescription={t("description")} navClass={this.state.navClass}>
                <Router>
                        <PropertyTemplate path={`${this.props.useI18next.routed ? "/:locale/properties/:id" : "/properties/:id"}`}
                        handlePathChange= {this.handlePathChange}/>
                        <Properties  path ={`${this.props.useI18next.routed ? "/:locale/properties" : "/properties" }`}
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

const PropertiesPage = (props) => {


    return (
        <PropertiesClass useI18next={useI18next()} useTranslation={useTranslation()} useLocation={useLocation()} path={props.location}/>
    )
}

export default PropertiesPage

export const pageQuery = graphql`
query PropertiesPage ($language: String!) {
    locales : allLocale(filter: {ns: {in: ["translation", "properties", "property" "sidebar", "calendar"]},language: {eq: $language}}) {
        edges {
          node {
            ns
            data
            language
          }
        }
    }
}`