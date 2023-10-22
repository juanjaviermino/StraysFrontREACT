import React from "react";
import video from "../assets/wlcVideo.mp4"


function WelcomePage (props) {
    return(
        <div className="welcome-page">
            <div className="overlay"/>
            <video className="background-video" autoPlay loop muted src={video} type="video/mp4">a</video>
            <div className="wlc-text">
                <h2>STRAYS</h2>
                <h3>Reencuentra la Felicidad</h3>
            </div>
        </div>
    );
}

export default WelcomePage;
