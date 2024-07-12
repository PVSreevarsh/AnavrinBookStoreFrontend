import React from 'react';
import Navbar from "../Navbar/Navbar";
import "./Header.css";

const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            <Navbar />
            <div className='header-content flex flex-c text-center text-white'>
                <h2 className='header-title text-capitalize'>onto your next read!</h2><br />
                <p>Click on Home to find your next read</p>
                {/* <SearchForm /> */}
            </div>
        </header>
    </div>
  )
}

export default Header