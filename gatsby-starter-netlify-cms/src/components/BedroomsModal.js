import React, { useEffect, useState } from 'react'
import { Modal} from 'react-bootstrap'
import {useTranslation} from 'gatsby-plugin-react-i18next';
import Loading from '../components/Loading'
import { MdOutlineKingBed } from "react-icons/md";
import { MdOutlineSingleBed } from "react-icons/md";
import { MdOutlineCrib } from "react-icons/md";
import { MdBed } from "react-icons/md";
import { FaCouch } from "@react-icons/all-files/fa/FaCouch";


const RoomComp = ({room}) => {
    const [empty, setEmpty] = useState(true)

    const {t} = useTranslation(['translation']);

    useEffect(()=>{
        Object.keys(room).map((roomKey)=>{
            if(roomKey!=="name" && roomKey!=="roomNumber" && room[roomKey] > 0){
                setEmpty(false)
            }
        })
    })

    const determineBedType = (bedType) =>{
        switch(bedType){
            case "cribCount":
                return <MdOutlineCrib/>
            case "futonBedCount":
                return <FaCouch/>
            case "kingBedCount":
                return <MdBed/>
            case "queenBedCount":
                return <MdOutlineKingBed/>
            case "sofaBedCount":
                return <FaCouch/>
            default:
                return <MdOutlineSingleBed />
        }
    }

    return(
        <>
            {!empty && 
            <div>
                <h4 className="lightOrangeText room-name" style={{fontWeight:"bold"}}>{room.name}</h4>
                    <div style={{display:"flex", flexWrap:"wrap"}}>
                    {Object.keys(room).map((roomKey, i)=>{
                        if(roomKey!=="name" && roomKey!=="roomNumber" && !roomKey.includes("Private") && room[roomKey] > 0){
                            return (
                                <div style={{}} className="bed-info-container" key={`room-${i}`}>
                                    <p className="bed-name">{roomKey.charAt(0).toUpperCase() + roomKey.slice(1).replace(/[A-Z]/g, ' $&').replace("Count", '').trim()}</p>
                                    <p className="bed-num" style={{fontWeight:"bold"}}>{room[roomKey]}{determineBedType(roomKey)}</p>
                                </div>
                            )
                        }
                    })}
                    {room.hasPrivateBathroom &&
                         <div style={{}} className="bed-info-container" style={{flex:"1 1 100%", marginTop: "10px"}}>
                            <p className="bed-name">{t("Has Private Bathroom")}</p>
                         </div>
                         }
                    </div>
                <hr />
            </div>
            }
        </>
    )

}

const BedroomsModal = (props) => {

    const {t} = useTranslation(['translation']);
    const [bedrooms, setBedrooms] = useState([])

    useEffect(()=> {
        if(bedrooms.length < 1){
            const getFireData = async (body) => {
                let data = []
                const uri = "https://us-central1-gatsby-test-286520.cloudfunctions.net/widgets/external"
                let res = await fetch(uri, 
                  {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                    })
                      .then(response => {
                          return response.text()
                      })
                      .then(res => {
                        let propsObj = JSON.parse(res)
                        Object.keys(propsObj).forEach(prop => {
                          data = propsObj[prop]
                        })
                        return data
                      })
        
                return res
              }
        
            const getSetBedrooms = async (id) => {
                let body = {
                  source: "db",
                  col:"Properties",
                  where:{
                    "field":"FieldPath.documentId()",
                    "op":"==",
                    "value":id
                  },
                  fields:"['bedroomData']",
                }
                let res = await getFireData(body)

                setBedrooms(res.bedroomData)
            }
            getSetBedrooms(props.propId)
        }
    }, [])


    return(
        <Modal show={props.show} onHide={props.handleClose} centered dialogClassName="modal-container always-top">
            <Modal.Header closeButton style={{background: "#3f3f3f"}}>
            <Modal.Title style={{display: "flex", flexWrap:"nowrap"}}>
              <div style={{
                height:"50px", 
                width:"50px", 
                borderRadius:"50%", 
                backgroundImage:`url('${props.img}')`, 
                backgroundPosition:"center", 
                backgroundSize:"cover",
                margin: "auto 20px auto auto",
                flex:"none"}}>
              </div>
              <div className="orangeText" style={{margin: "auto"}}>
                {t("Bedrooms")}
              </div>
              <div className="modal close modal-content modal-header enquiry-modal" style={{display: "none"}}>
              </div>
          </Modal.Title>
            </Modal.Header> 
            <Modal.Body className="scroll-modal">
                {bedrooms ? 
                <div>
                    {
                    bedrooms.map((room, index) => {
                        return <RoomComp room={room} key={`${room} + ${index}`}/>
                    })
                    }
                </div>
                :
                <Loading />}
            </Modal.Body>
        </Modal>
    )
}

export default BedroomsModal