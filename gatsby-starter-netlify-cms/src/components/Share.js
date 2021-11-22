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
    <div className="share-btn">
        <AiOutlineShareAlt />
        <span className="share tooltiptext">
            <EmailShareButton url={props.location}>
                <EmailIcon size={32} round={true}/>
            </EmailShareButton>
            <FacebookShareButton url={props.location}>
                <FacebookIcon size={32} round={true}/>
            </FacebookShareButton>
            <PinterestShareButton url={props.location}>
                <PinterestIcon size={32} round={true}/>
            </PinterestShareButton>
        </span>
    </div>
)

export default Share