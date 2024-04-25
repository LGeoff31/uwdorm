import React from "react";
import Navbar from './components/Navbar'

function DormInfo(props){
    return(
        <div class="p-5">
            <h1>{props.name}</h1>
            <img src={props.image} alt={props.alt}/>
            <span>{props.description}</span>
        </div>
    )
}
/*images are 750 by 500 */

function dorms(){
    return(
        <div>
            <Navbar/>
            <DormInfo name="Village 1" image="" alt="Village 1" description="cozy place you are so cool"/>
            <DormInfo name="Village 1" image="" alt="Village 1" description="cozy place yay!"/>

        </div>
    );
}

export default dorms

