
import React from 'react';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16 md:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-quickpens-navy mb-6 leading-tight">
              Connect with Student Writers on Your Campus
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              QuickPens is the trusted marketplace where college students can find peers to help with assignments - all within your college community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-quickpens-navy text-white hover:bg-quickpens-navy/90 text-lg px-8">
                Post an Assignment
              </Button>
              <Button size="lg" variant="outline" className="border-quickpens-navy text-quickpens-navy hover:bg-quickpens-navy/10 text-lg px-8">
                Become a Writer
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white p-6 rounded-lg shadow-lg transform rotate-3 z-10">
              <div className="bg-gray-100 p-4 rounded mb-3">
                <div className="h-4 w-24 bg-quickpens-navy/20 rounded mb-2"></div>
                <div className="h-3 w-full bg-gray-300 rounded mb-2"></div>
                <div className="h-3 w-5/6 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 w-4/6 bg-gray-300 rounded"></div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div>
                  <div className="h-4 w-20 bg-quickpens-navy/20 rounded"></div>
                  <div className="h-3 w-16 bg-gray-300 rounded mt-1"></div>
                </div>
                <div className="bg-quickpens-gold text-quickpens-dark px-3 py-1 rounded text-sm font-medium">
                  $12/page
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg absolute top-12 left-12 transform -rotate-6 z-0">
              <div className="bg-gray-100 p-4 rounded mb-3">
                <div className="h-4 w-32 bg-quickpens-navy/20 rounded mb-2"></div>
                <div className="h-3 w-full bg-gray-300 rounded mb-2"></div>
                <div className="h-3 w-5/6 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div>
                  <div className="h-4 w-20 bg-quickpens-navy/20 rounded"></div>
                  <div className="h-3 w-16 bg-gray-300 rounded mt-1"></div>
                </div>
                <div className="bg-quickpens-gold text-quickpens-dark px-3 py-1 rounded text-sm font-medium">
                  $15/page
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
