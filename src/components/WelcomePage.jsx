import React from "react";
import video from "../assets/wlcVideo.mp4"


function WelcomePage (props) {
    return(
        <div className="welcome-page">
            <video autoPlay loop muted className="background-video">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="welcome-page-container">
                <h2 className="welcome-page-text">STRAYS</h2>
                <h3 className="welcome-page-text">Reencuentra la Felicidad</h3>
            </div>
        </div>
    );
}

export default WelcomePage;
