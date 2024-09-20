import React from 'react';
import Header from './Header';
import { Carousel } from 'react-responsive-carousel';
import { BrowserRouter , Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Footer from './Footer';
import Caurosel from './Caurosel';
import Features from './Features';
import AdvanceFeatures from './AdvanceFeatures';
import Consultation from './Consultation';

const Home = () => {
  return (
    <div>
      <Header />
      <Caurosel />
      <Features />
      <AdvanceFeatures />      
      <Consultation />
      <Footer />
    </div>
  );
};

export default Home;
