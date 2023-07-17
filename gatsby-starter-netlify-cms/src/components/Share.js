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
    PinterestIcon,
    TwitterIcon,
    WhatsappIcon} from "react-share";
import {useTranslation} from 'gatsby-plugin-react-i18next';

const Share = (props) => {
    const {t} = useTranslation();

    return(

    
    <div className={`share-btn`} >
        <AiOutlineShareAlt />
        <div className="share expand-btn" >
            <EmailShareButton url={encodeURI(props.target)} seperator={' '}>
                <EmailIcon size={34} round={true}/>
            </EmailShareButton>
            <FacebookShareButton url={encodeURI(props.target)} title={String(props.propName)} quote={`Check out ${props.propName}`} hashtag={"#Smartavillas"} seperator={' '}>
                <FacebookIcon size={34} round={true}/>
            </FacebookShareButton>
            <PinterestShareButton url={encodeURI(props.target)} media={String(props.propImg)} description={`Loving ${props.propName} from Smartavillas`} seperator={' '}>
                <PinterestIcon size={34} round={true}/>
            </PinterestShareButton>
            <TwitterShareButton url={encodeURI(props.target)} title={`${t("Check out Smartavillas property")} ${String(props.propName)}`} hashtags={["Smartavillas", "Algarve", "Portugal"]} related={["https://twitter.com/smartavillas"]} seperator={' '}>
                <TwitterIcon size={34} round={true}/>
            </TwitterShareButton>
            <WhatsappShareButton url={encodeURI(props.target)} title={`${t("Check out Smartavillas property")} ${String(props.propName)}`} seperator={' '}>
                <WhatsappIcon size={34} round={true}/>
            </WhatsappShareButton>
        </div>
    </div>
)}

export default Share