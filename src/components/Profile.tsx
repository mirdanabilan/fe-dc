import React from 'react';
import { useState, useEffect } from 'react';
import "./css/profile.css"
import {getCurrentUser} from "../services/auth.service";
import {getTourist} from "../services/tourist.service";
import albedo from './albedo.jpg';
import {TouristDet} from './Tourist-det'
import Pagination from '@mui/material/Pagination';
import { setConstantValue } from 'typescript';

interface TouristAPI {
    data: any
    headers: Object
}

const Profile: React.FC = () => {
    const currentUser = getCurrentUser();
    const [touristList, setTouristList] = useState<TouristAPI>();
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        getTourist(page).then((value) => {
            console.log(value);
            setTouristList(value as TouristAPI);
        })
    }, []);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        console.log(value);
        getTourist(page).then((value) => {
            console.log(value);
            setTouristList(value as TouristAPI);
        })
      };
    
    return (
        <div>
            {console.log(touristList?.data.page)}
            <div className="profile-header">
                <div>
                    <img className="prof-pic" src={albedo}/>
                </div>
                <div style={{marginTop:20, marginLeft:25}}>
                    <header>
                        <h3>
                            {currentUser.Name}
                            <hr/>
                        </h3>
                    </header>
                    <p className="prof-detail">
                        <strong>Email: </strong> {currentUser.Email}
                        <br/>
                        <strong> Page: </strong> {touristList?.data.page}
                    </p>
                </div>
            </div>
            <div className="tourist-list">
                <h3>
                    Tourist List
                    <hr/>
                </h3>
                {console.log(touristList?.data)}
                {touristList?.data.data.map((x:any)=> {
                    return <TouristDet
                        key={x.key}
                        name={x.tourist_name}
                        location={x.tourist_location} 
                        email={x.tourist_email} 
                        profpic={x.tourist_profilepicture}
                    /> 
                }
                
                )}
                <Pagination 
                    className="tourist-pagination" 
                    count={touristList?.data.total_pages}
                    onChange={handleChange} 
                    shape="rounded" 
                    showFirstButton 
                    showLastButton/>
            </div>
        </div>
        
    );
}; export default Profile;