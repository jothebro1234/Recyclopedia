import React from 'react';
import Navbar from '../components/Navbar';
import './significance.css';
import bg1 from '../assets/backgroudone.jpg';
import bg2 from '../assets/backgroundtwo.jpg'; 
import videoBg from '../assets/ahvideo.mp4';

const Significance = () => {
    return (
        <div className='overall'>
            <Navbar />
            <video className='nonovideo' src={videoBg} autoPlay />
        </div>
    );
};

export default Significance;
