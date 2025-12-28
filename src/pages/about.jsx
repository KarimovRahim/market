import React from 'react'
import { Link } from 'react-router-dom'

import hero1 from '../assets/hero1.png'
import icon1 from '../assets/icon1.png'
import icon2 from '../assets/icon2.png'
import icon3 from '../assets/icon3.png'
import icon4 from '../assets/icon4.png'
import icon5 from '../assets/icon5.png'
import icon6 from '../assets/icon6.png'
import icon7 from '../assets/icon7.png'
import person1 from '../assets/person1.png'
import person2 from '../assets/person2.png'
import person3 from '../assets/person3.png'
import soc from '../assets/soc.png'

const About = () => {
  return (
    <div className="w-full flex flex-col items-center px-4 py-8">
      {/* Breadcrumb */}
      <div className="w-full max-w-6xl mt-4 md:mt-8">
        <label className="font-medium text-sm md:text-base text-gray-600">
          <Link to="/Home" className="hover:text-red-600 transition-colors">Home / </Link>
          <span className="text-gray-800">About</span>
        </label>
      </div>

      {/* Our Story Section */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row justify-between items-center mt-6 md:mt-10 gap-8">
        <div className="w-full lg:w-1/2 flex flex-col">
          <label className="font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900">
            Our Story
          </label>
          <label className="font-medium text-base md:text-lg text-gray-700 mt-6 md:mt-8">
            Launced in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.
          </label>
          <label className="font-medium text-base md:text-lg text-gray-700 mt-4 md:mt-6">
            Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assortment in categories ranging from consumer.
          </label>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <img 
            src={hero1} 
            alt="Our Story" 
            className="w-full max-w-lg h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-10 md:mt-16">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md flex flex-col items-center hover:shadow-lg transition-shadow">
          <img src={icon4} alt="Sellers" className="w-16 h-16 md:w-20 md:h-20" />
          <label className="font-bold text-2xl md:text-3xl text-gray-900 mt-4 md:mt-6">10.5k</label>
          <label className="font-medium text-sm md:text-base text-gray-600 mt-2 md:mt-3">Sellers active our site</label>
        </div>
        
        <div className="bg-red-600 p-6 md:p-8 rounded-xl shadow-md flex flex-col items-center hover:shadow-lg transition-shadow">
          <img src={icon5} alt="Monthly Sales" className="w-16 h-16 md:w-20 md:h-20" />
          <label className="font-bold text-2xl md:text-3xl text-white mt-4 md:mt-6">33k</label>
          <label className="font-medium text-sm md:text-base text-red-100 mt-2 md:mt-3">Monthly Product Sale</label>
        </div>
        
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md flex flex-col items-center hover:shadow-lg transition-shadow">
          <img src={icon6} alt="Customers" className="w-16 h-16 md:w-20 md:h-20" />
          <label className="font-bold text-2xl md:text-3xl text-gray-900 mt-4 md:mt-6">45.5k</label>
          <label className="font-medium text-sm md:text-base text-gray-600 mt-2 md:mt-3">Customer active in our site</label>
        </div>
        
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md flex flex-col items-center hover:shadow-lg transition-shadow">
          <img src={icon7} alt="Annual Sales" className="w-16 h-16 md:w-20 md:h-20" />
          <label className="font-bold text-2xl md:text-3xl text-gray-900 mt-4 md:mt-6">25k</label>
          <label className="font-medium text-sm md:text-base text-gray-600 mt-2 md:mt-3">Annual gross sale in our site</label>
        </div>
      </div>

      {/* Team Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-10 md:mt-16">
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <img 
            src={person1} 
            alt="Tom Cruise" 
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="p-6">
            <label className="font-semibold text-xl md:text-2xl text-gray-900">Tom Cruise</label>
            <label className="font-normal text-sm md:text-base text-gray-600 mt-1">Founder & Chairman</label>
            <div className="mt-4">
              <img src={soc} alt="Social Media" className="w-24 h-5 md:w-28 md:h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <img 
            src={person2} 
            alt="Emma Watson" 
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="p-6">
            <label className="font-semibold text-xl md:text-2xl text-gray-900">Emma Watson</label>
            <label className="font-normal text-sm md:text-base text-gray-600 mt-1">Managing Director</label>
            <div className="mt-4">
              <img src={soc} alt="Social Media" className="w-24 h-5 md:w-28 md:h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <img 
            src={person3} 
            alt="Will Smith" 
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="p-6">
            <label className="font-semibold text-xl md:text-2xl text-gray-900">Will Smith</label>
            <label className="font-normal text-sm md:text-base text-gray-600 mt-1">Product Designer</label>
            <div className="mt-4">
              <img src={soc} alt="Social Media" className="w-24 h-5 md:w-28 md:h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-10 md:mt-16 mb-12 md:mb-20">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
          <img src={icon1} alt="Delivery" className="w-16 h-16 md:w-20 md:h-20" />
          <label className="font-semibold text-lg md:text-xl text-gray-900 mt-4 md:mt-6">
            FREE AND FAST DELIVERY
          </label>
          <label className="font-medium text-sm md:text-base text-gray-600 mt-2">
            Free delivery for all orders over $140
          </label>
        </div>
        
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
          <img src={icon2} alt="Customer Service" className="w-16 h-16 md:w-20 md:h-20" />
          <label className="font-semibold text-lg md:text-xl text-gray-900 mt-4 md:mt-6">
            24/7 CUSTOMER SERVICE
          </label>
          <label className="font-medium text-sm md:text-base text-gray-600 mt-2">
            Friendly 24/7 customer service
          </label>
        </div>
        
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
          <img src={icon3} alt="Money Back" className="w-16 h-16 md:w-20 md:h-20" />
          <label className="font-semibold text-lg md:text-xl text-gray-900 mt-4 md:mt-6">
            MONEY BACK GUARANTEE
          </label>
          <label className="font-medium text-sm md:text-base text-gray-600 mt-2">
            We return money within 30 days
          </label>
        </div>
      </div>
    </div>
  )
}

export default About