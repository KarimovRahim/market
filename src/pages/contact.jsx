import React from 'react'
import { Link } from 'react-router-dom'

import icon_phone from '../assets/icon_phone.png'
import icon_mail from '../assets/icon_mail.png'

const Contact = () => {
  return (
    <div className="w-full m-auto flex flex-col items-center px-4 sm:px-6 md:px-8">
      {/* Breadcrumb */}
      <div className="w-full max-w-6xl mt-4 md:mt-8 lg:mt-12">
        <label className="font-medium text-sm md:text-base text-gray-600">
          <Link to="/Home" className="hover:text-red-600 transition-colors">Home / </Link>
          <span className="text-gray-800">Contact</span>
        </label>
      </div>

      {/* Contact Content */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row justify-between gap-8 md:gap-12 mt-6 md:mt-8 lg:mt-10 mb-8 md:mb-12 lg:mb-16">
        {/* Contact Info */}
        <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start">
          <div className="w-full max-w-sm md:max-w-md lg:max-w-xs">
            {/* Call To Us */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="flex items-center gap-3 md:gap-4">
                <img src={icon_phone} alt="Phone" className="w-8 h-8 md:w-10 md:h-10" />
                <label className="font-medium text-lg md:text-xl text-gray-900">Call To Us</label>
              </div>
              <div className="flex flex-col gap-2 md:gap-3 mt-4 md:mt-6">
                <label className="font-medium text-sm md:text-base text-gray-700">
                  We are available 24/7, 7 days a week
                </label>
                <label className="font-medium text-sm md:text-base text-gray-700">
                  Phone: +8801611112222
                </label>
              </div>
            </div>

            {/* Write To Us */}
            <div className="flex flex-col items-center lg:items-start mt-8 md:mt-12 lg:mt-16">
              <div className="flex items-center gap-3 md:gap-4">
                <img src={icon_mail} alt="Mail" className="w-8 h-8 md:w-10 md:h-10" />
                <label className="font-medium text-lg md:text-xl text-gray-900">Write To Us</label>
              </div>
              <div className="flex flex-col gap-2 md:gap-3 mt-4 md:mt-6">
                <label className="font-medium text-sm md:text-base text-gray-700">
                  Fill out our form and we will contact you within 24 hours.
                </label>
                <label className="font-medium text-sm md:text-base text-gray-700">
                  Emails: customer@exclusive.com
                </label>
                <label className="font-medium text-sm md:text-base text-gray-700">
                  Emails: support@exclusive.com
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-2/3 flex justify-center items-center">
          <div className="w-full max-w-2xl bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg">
            <div className="w-full flex flex-col gap-6 md:gap-8">
              {/* Input Fields */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <input 
                  type="text" 
                  placeholder='Name' 
                  className="w-full h-12 md:h-14 px-4 border border-gray-300 rounded-lg md:rounded-xl shadow-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                />
                <input 
                  type="email" 
                  placeholder='E-Mail' 
                  className="w-full h-12 md:h-14 px-4 border border-gray-300 rounded-lg md:rounded-xl shadow-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                />
                <input 
                  type="tel" 
                  placeholder='Phone' 
                  className="w-full h-12 md:h-14 px-4 border border-gray-300 rounded-lg md:rounded-xl shadow-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all sm:col-span-2 lg:col-span-1"
                />
              </div>

              {/* Textarea */}
              <textarea 
                placeholder='Your Message' 
                rows="5"
                className="w-full p-4 border border-gray-300 rounded-lg md:rounded-xl shadow-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none"
              />

              {/* Submit Button */}
              <div className="w-full flex justify-end">
                <button className="w-full sm:w-48 md:w-56 h-12 md:h-14 rounded-lg md:rounded-xl bg-red-600 hover:bg-red-700 font-medium text-white text-base md:text-lg transition-colors shadow-md hover:shadow-lg">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact