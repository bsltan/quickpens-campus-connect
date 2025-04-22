
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import RoleSelection from '../components/RoleSelection';
import FeatureCard from '../components/features/FeatureCard';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <RoleSelection />
        
        {/* How It Works Section */}
        <section className="py-16 bg-blue-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-quickpens-navy">How QuickPens Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform makes it easy to connect with writers from your college and get the help you need.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative">
                <FeatureCard 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-quickpens-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                  title="1. Post Your Assignment"
                  description="Share your assignment details, requirements, and deadline. Set your budget and wait for responses."
                  iconBgColor="bg-blue-100"
                />
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <FeatureCard 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-quickpens-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  }
                  title="2. Connect & Discuss"
                  description="Chat with qualified writers from your college to clarify details and negotiate terms."
                  iconBgColor="bg-blue-100"
                />
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
              
              <FeatureCard 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-quickpens-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="3. Get Quality Work"
                description="Receive your completed assignment on time. Only pay when you're satisfied with the work."
                iconBgColor="bg-blue-100"
              />
            </div>
          </div>
        </section>
        
        {/* Trust & Security Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-quickpens-navy">Built on Trust and Security</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We've created a safe environment where students can confidently connect with peers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <FeatureCard 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-quickpens-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
                title="Verified College Email"
                description="All users verify their college email to ensure you're working with peers from your school."
                iconBgColor="bg-green-100"
              />
              
              <FeatureCard 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-quickpens-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
                title="Secure Payments"
                description="Money is only released to writers after you approve the completed work."
                iconBgColor="bg-green-100"
              />
              
              <FeatureCard 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-quickpens-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                }
                title="Verified Reviews"
                description="Honest ratings and reviews from real students who have used the service."
                iconBgColor="bg-green-100"
              />
              
              <FeatureCard 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-quickpens-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
                title="24/7 Support"
                description="Our support team is always available to help with any questions or issues."
                iconBgColor="bg-green-100"
              />
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-blue-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-quickpens-navy">What Students Say</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hear from students who have found success on both sides of the QuickPens marketplace.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-white border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-quickpens-navy/20 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <span className="text-quickpens-navy font-bold text-lg">JD</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">James D.</h4>
                      <p className="text-sm text-gray-600">Engineering Major • Buyer</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600">
                    "QuickPens saved me during finals week. I found a writer who really understood my engineering assignment requirements and delivered great work on time."
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-quickpens-gold/20 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <span className="text-quickpens-dark font-bold text-lg">AS</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Amanda S.</h4>
                      <p className="text-sm text-gray-600">English Literature • Writer</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600">
                    "Being a writer on QuickPens has been a great way to earn extra money while helping fellow students. I can set my own hours and rates, and the platform makes payment simple."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-quickpens-navy text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of college students who are already using QuickPens to connect, collaborate, and succeed.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-quickpens-navy hover:bg-white/90 text-lg px-8">
                Sign Up Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
