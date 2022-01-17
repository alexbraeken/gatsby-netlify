import React from 'react'
import { AiOutlineShareAlt } from "@react-icons/all-files/ai/AiOutlineShareAlt";
import {
    EmailShareButton,
    FacebookShareButton,
    PinterestShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    PinterestIcon,
    TwitterIcon,
    WhatsappIcon} from "react-share";

const Share = (props) => (
    <div className={`share-btn`} >
        <AiOutlineShareAlt />
        <div className="share expand-btn" >
            <EmailShareButton url={null}>
                <EmailIcon size={32} round={true}/>
            </EmailShareButton>
            <FacebookShareButton url={null} title={"Share Smartavillas.com"} quote={`Check out ${props.propName}`} hashtag={"#Smartavillas"}>
                <FacebookIcon size={32} round={true}/>
            </FacebookShareButton>
            <PinterestShareButton url={null} media={String(props.propImg)} description={`Loving ${props.propName} from Smartavillas`}>
                <PinterestIcon size={32} round={true}/>
            </PinterestShareButton>
            <TwitterShareButton url={null} title={String(props.propName)} hashtags={["Smartavillas", String(props.propName), "Algarve", "Portugal"]} related={["https://twitter.com/smartavillas"]}>
                <TwitterIcon size={32} round={true}/>
            </TwitterShareButton>
            <WhatsappShareButton url={null} title={String(props.propName)}>
                <WhatsappIcon size={32} round={true}/>
            </WhatsappShareButton>
        </div>
    </div>
)

export default Share