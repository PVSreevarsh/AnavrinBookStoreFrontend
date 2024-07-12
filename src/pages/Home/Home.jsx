import React from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { useGlobalContext } from '../../context.';

const Home = () => {
  const { setUserDetails} = useGlobalContext();
  setUserDetails(localStorage.getItem("user"));
  return (
    <main>
        <Header />
        <Outlet />
    </main>
  )
}

export default Home
