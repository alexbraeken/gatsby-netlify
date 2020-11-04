import React, {useState, useEffect, Component} from 'react'
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
import PropertiesFilter from '../../components/PropertiesFilter'
import StickyBox from "react-sticky-box";
import { Col } from 'react-bootstrap';
import GoogleMapComponent from '../../components/GoogleMapComponent';
import ReactBnbGallery from 'react-bnb-gallery';
import { gsap } from "gsap";

gsap.registerPlugin(gsap);

const Properties = (props) => {

    const [show, setShow]=useState(false)
    const [photos, setPhotos] =useState([])
    const [sort, setSort] = useState("")
    const [data, setData] = useState(null);
    const [winterLets, setWinterLets] = useState([])


    const uri = "https://api.hostfully.com/v2/properties?tags=winter%20let&agencyUid=ab8e3660-1095-4951-bad9-c50e0dc23b6f"

useEffect(() => {
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
}, [])

    useEffect(() => {
        console.log(data)
        if(data){
            props.filterList(data);
        }
    }, [data])


    const handleGalleryClick = (photos) => {
        setShow(true);
        setPhotos(photos);
    }

    const handleClose = () => {
        setShow(false)
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleSort = (sort) => {
        setSort(sort)
    }

        return(
            <div>
                <FirestoreCollection path="/Properties/">
                    {data => {       
                        return data.isLoading ? <Loading /> : 
                        <>
                        {setData(data.value)}

                        <Container style={{width:"100vw", maxWidth:"none"}}> 
                            <Row>
                                <Col xs={12} md={3} id="filter-sidebar">
                                <StickyBox>
                                <PropertiesFilter 
                                data= {data} 
                                handleChange={props.handleChange} 
                                state={props.state}
                                handleSliderChange={props.handleSliderChange}
                                handleSort={handleSort}/>
                                <GoogleMapComponent isMarkerShown="true" lat={37.150231} lng={-7.6457664} list={data.value} state={props.state}/>
                                </StickyBox>
                                </Col>
                                <Col xs={12} md={9}>
                                <PropFeatures gridItems={data} state={props.state} handleGalleryClick={handleGalleryClick} sort={sort} winterLets={winterLets}/>
                                </Col>
                            </Row>
                            <ReactBnbGallery
                                show={show}
                                photos={photos.map((photo,index)=>{ console.log(photo.url); return(photo.url)})}
                                onClose={handleClose}
                                /> 
                        </Container>
                        </>
                    }}
                </FirestoreCollection>
            </div>
        )
}



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
            dataLength: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.filterList = this.filterList.bind(this);
    }

    componentDidMount(){
       const filterValues = queryString.parse(this.props.location.search);
       const keys = Object.keys(filterValues)
       keys.forEach(key =>{
           console.log(key)
           console.log(filterValues[key])
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
               console.log(this.state.searchArray)
           })
           
       })
       console.log("mounted prop page: " + this.state);
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
                console.log(this.state.filteredSearch[filterType])
                filter.forEach((item, index)=>{
                    let exists = ((!!this.state.searchArray[filterType] && this.state.searchArray[filterType].indexOf(item) !== -1) == this.state.filteredSearch[filterType] || !this.state.filteredSearch[filterType])
                    console.log(item + " exists " + exists)
                    list[item] = exists;
                })
                this.setState({
                    [filterType]: list
                },()=>{
                    console.log("filter list:")
                    console.log(this.state.city)
                    this.setState({dataLength : props.length})
                })   
            })   
    }


    handleChange (e, type){
        console.log(e.target.value)
        console.log(this.state[type][e.target.value])
        let target = e.target.value
        this.setState((prevState, currentProps) => ({
            ...prevState,
            [type] : {...prevState[type],
                [target]: !this.state[type][target] }
        }), ()=>{
            console.log(this.state[type])
        }
        )}

    handleSliderChange(array, type){
        console.log(array)
        this.setState({
            [`${type}`]: array
        })
        console.log(this.state)
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
                        handleSliderChange={this.handleSliderChange}/>
                        <PropertyTemplate path="/properties/:id" />
                </Router>       
            </Layout> 
          );
    }
}