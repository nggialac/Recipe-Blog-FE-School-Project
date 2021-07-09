import React from 'react';
import NotFound from "./images/404.jpg";

function BlankPage() {
    return (
        <div className="container">
            <h1>Insert correct URL!</h1>
            <img src={NotFound} alt="notFound" style={{height:600}}/>
        </div>
    )
}

export default BlankPage
