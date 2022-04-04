import React from 'react';
import internal from 'stream';
import './css/tourist.css'

interface tourType {
    key: number;
    name: string;
    location: string;
    email: string;
    profpic: string;
}

export function TouristDet(props:tourType){
    return <div key={props.key}>
        <div className="tourist-component">
            <div>
                <img className="prof-pic" src={props.profpic}/>
            </div>
            <div className="tourist-det">
                <p className="tourist-name">{props.name}</p>
                <p className="tourist-location">{props.location}</p>
                <p className="tourist-email">{props.email}</p>
            </div>
        </div>
        <hr/>
    </div>
    
};