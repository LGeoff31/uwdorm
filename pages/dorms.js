import React from "react";
import Navbar from './components/Navbar'
import Village1 from '../public/images/Village1.png'

function DormInfo(props){
    return(
        <div class="p-8 border-2 rounded-2xl border-slate-300 ml-10 mr-10 mt-10">
            <h1 className="mb-5 text-xl">{props.name}</h1>
            <div className="flex">
                <img className="h-25 max-w-xl rounded-xl transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0" src={props.image} alt={props.alt}/>
                <span className="ml-5">{props.description}</span>
            </div>
            <h1 className="text-right text-xs italic font-light text-blue-300">Image source: {props.imagesrc}</h1>
        </div>
    )
}
/*images are 750 by 500 */

function dorms(){
    return(
        <div>
            <Navbar/>
            <DormInfo name="Village 1" image="https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-0083.jpg" 
             description="cozy place you are so cool" imagesrc="https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/campus_housing-220519-0083.jpg"/>
            <DormInfo name="Claudette Millar Hall" image="https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/newrezhero_0.jpg"
            description="cozy place you are so cool" imagesrc="https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/newrezhero_0.jpg"/>
            <DormInfo name="Claudette Millar Hall" image="https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/revmain_2.jpg"
            description="cozy place you are so cool" imagesrc="https://uwaterloo.ca/campus-housing/sites/default/files/uploads/images/revmain_2.jpg
            "/>
        </div>
    );
}

export default dorms

