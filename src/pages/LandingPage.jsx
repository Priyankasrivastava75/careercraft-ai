import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductOverview from '../components/ProductOverview';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import FaqSection from '../components/FaqSection';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProductOverview />
        <Features />
        <HowItWorks />
        <FaqSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
