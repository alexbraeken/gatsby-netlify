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
    const [totalDays, setTotalDays] = useState(1)
    const [horizontalExpanded, setHorizontalExpanded] = useState(false)
    const [filterExpanded, setFilterExpanded] = useState(true)

    const container = useRef(null)
    const datePicker = useRef(null)
    /* useEffect(() => {
        const uri = "https://api.hostfully.com/v2/properties?tags=winter%20let&agencyUid=ab8e3660-1095-4951-bad9-c50e0dc23b6f"
        console.log("fetching")
        fetch(uri, {
        headers:{
        "X-HOSTFULLY-APIKEY": "PEpXtOzoOAZGrYC8"
        }
    })
            .then(response => {
                
                return response.text()
            })
            .then(data => {
            console.log(JSON.parse(data));
            setWinterLets(JSON.parse(data).propertiesUids)
            })
    return () => {
        setWinterLets([])
    }
    }, [])*/

    useEffect(() => {
        return () => {
        }
    }, [props.state.searchArray.from])

//Call hostfully api here if date search 
    useEffect(() => {
        if(props.state.searchArray.from && props.state.searchArray.to){
        const uri = `https://api.hostfully.com/v2/properties?checkInDate=${props.state.searchArray.from[0]}&checkOutDate=${props.state.searchArray.to[0]}&limit=100&agencyUid=ab8e3660-1095-4951-bad9-c50e0dc23b6f`
        
        fetch(uri, {
        headers:{
        "X-HOSTFULLY-APIKEY": "PEpXtOzoOAZGrYC8"
            }
        })
                .then(response => {
                    
                    return response.text()
                })
                .then(data => {
                setPropertyIds(JSON.parse(data).propertiesUids)
                })
        setTotalDays((new Date(props.state.searchArray.to[0])-(new Date(props.state.searchArray.from[0]))))
        return () => {
            setPropertyIds([])
        }
    }}, [])

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
        setTotalDays(total)
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
                            <DatePicker from={props.state.searchArray.from[0]} to={props.state.searchArray.to[0]} handleDateChange={props.handleDateChange} handleNewIds={handleNewIds} handleTotalDays={handleTotalDays}
                            className="top-date-picker" style={stickyStyle}
                            /> }
                            <Row>
                                <Col xs={12} md={horizontalExpanded? 6 : 3} id="filter-sidebar" style={{transition:"all 1s"}}>
                                <StickyBox>
                                    <Container fluid style={{
                                        display: "flex",
                                        justifyContent: "space-between"}}>
                                            <div style={{display:"flex", flexWrap:"nowrap"}}>
                                            <p style={{margin:"auto", paddingRight:"5px"}}>Sort By: </p> 
                                        <Form.Group style={{margin:"10px auto"}}>
                                            <Form.Control as="select" onChange={(e)=>handleSort(e.target.value)}>
                                                <option value="">Default</option>
                                                <option value="price-min">Daily Rate $ &#8594; $$$</option>
                                                <option value="price-max">Daily Rate $$$ &#8594; $</option>
                                                <option value="bedrooms-min">Bedrooms Increasing</option>
                                                <option value="bedrooms-max">Bedrooms Decreasing</option>
                                                <option value="a-z">A &#8594; Z</option>
                                                <option value="z-a">Z &#8594; A</option>
                                            </Form.Control>
                                        </Form.Group>
                                        </div>
                                        <div className="expandBtn" style={{float:"right", margin:"auto"}} onClick={handleSidebarModal}>  
                                                <p>Show Filters</p>
                                                <FontAwesomeIcon icon={faChevronRight} style={{margin:"auto 5px"}}/> 
                                        </div>
                                    </Container>
                                <GoogleMapComponent isMarkerShown="true" lat={37.150231} lng={-7.6457664} list={data.value} state={props.state} height={"95vh"}/>
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
                                <PropFeatures gridItems={data} state={props.state} handleGalleryClick={handleGalleryClick} sort={sort} winterLets={winterLets} propertyIds={propertyIds} totalDays={totalDays}/>
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
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.filterList = this.filterList.bind(this);
        this.handleSelectDeselectAll = this.handleSelectDeselectAll.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount(){
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

    filterList(props){

            let filterTypes = ["city", "type"]
            filterTypes.forEach(filterType => {
                let list = {}
                let filter = []
                props.map(prop=>{
                    filter.push(prop[filterType])
                })
                filter = [... new Set(filter)]

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


    handleSliderChange(array, type){
        this.setState({
            [`${type}`]: array
        })
    }


    render() {

        return (
            <Layout>
                <Router>
                        <Properties path ="/properties" 
                        state={this.state} 
                        handleChange={this.handleChange} 
                        filterList={this.filterList} 
                        filterSearch={this.state.amenities}
                        handleSliderChange={this.handleSliderChange}
                        handleSelectDeselectAll={this.handleSelectDeselectAll}
                        handleDateChange= {this.handleDateChange}/>
                        <PropertyTemplate path="/properties/:id" />
                </Router>       
            </Layout> 
          );
    }
}