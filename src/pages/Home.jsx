import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import TrustedBy from '../components/home/TrustedBy';
import ProductCards from '../components/home/ProductCards';
import HowItWorks from '../components/home/HowItWorks';
import AIIntelligence from '../components/home/AIIntelligence';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TrustedBy />
      <ProductCards />
      <HowItWorks />
      <AIIntelligence />
      <Footer />
    </div>
  );
}