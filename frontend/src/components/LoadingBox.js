import React from 'react';
import '../loading.css';

function LoadingBox(props) {
    return (
        <div className="loading">
            {/* <i className="fa fa-spinner fa-spin"></i>Loading... */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default LoadingBox;