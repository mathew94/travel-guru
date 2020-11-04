import React from 'react';
import './Home.css';
import Header from '../Header/Header';
import cox from '../../images/Coxbazar.png';
import sajek from '../../images/Sajek.png';
import sundorbon from '../../images/sundorbon.png';
import srimongol from '../../images/Sreemongol.png';
import {Link} from "react-router-dom";

function Home() {
    return (
        <div className = 'home'>
            <div className= 'home-body'>
                <div className='image-container'>
                    <div>
                    <Link to = "/book">
                    <img className='image' src={cox} alt=""/>
                    </Link>
                        
                        <h1 className='text-1'>Cox's Bazar</h1>
                    </div>
                    <div>
                    <Link to = "/book">
                    <img className='image' src={sajek} alt=""/>
                    </Link>
                        
                        <h1 className='text-2'>Sajek</h1>
                    </div>
                    <div>
                    <Link to = "/book">
                    <img className='image' src={sundorbon} alt=""/>
                    </Link>
                        
                        <h1 className='text-3'>Sundarban</h1>
                    </div>
                    <div>
                        <Link to = "/book"><img className='image' src={srimongol} alt=""/></Link>
                        
                        <h1 className='text-4'>Sreemangal</h1>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Home;
