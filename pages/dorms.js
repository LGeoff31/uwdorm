import React from "react";

function dormInfo({residencename}){
    console.log(residencename);
    return(<h1>{residencename}</h1>)
}

function dorms(){
    return(
        <div>
            <dormInfo residencename="V1"/>
        </div>
    );
}

export default dorms

