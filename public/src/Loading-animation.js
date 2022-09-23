import React from "react";
import "./scss/loading-animation.scss";

const LoadingAnimation = ({ className }) => {

    return (
        <div id="loading-animation" className={className} >
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};


export default LoadingAnimation;